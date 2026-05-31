import { API_BASE_URL } from '../response/responseconfig';
import { authFetch } from '../auth/auth';
import { ensureCurrentUserLoaded, getCurrentUser } from '../auth/session';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
}

function parseSSEEvent(eventBlock: string) {
  const lines = eventBlock.split(/\r?\n/);
  let event = 'message';
  let data = '';

  for (const line of lines) {
    if (!line) continue;
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
    } else if (line.startsWith('data:')) {
      data += line.slice(5).trim() + '\n';
    }
  }

  if (!data) return null;
  data = data.replace(/\n$/, '');

  try {
    return { event, data: JSON.parse(data) };
  } catch {
    return { event, data };
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

async function readFirstEventDataViaXHR(idLokasiMall: number) {
  await ensureCurrentUserLoaded();
  const currentUser = getCurrentUser();
  const token =
    currentUser &&
    typeof currentUser === 'object' &&
    'token' in currentUser &&
    typeof currentUser.token === 'string'
      ? currentUser.token
      : null;

  return new Promise<unknown>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let settled = false;

    const finish = (fn: (value: any) => void, value: any) => {
      if (settled) return;
      settled = true;
      try {
        xhr.abort();
      } catch {
        // no-op
      }
      fn(value);
    };

    const tryResolveFromResponseText = () => {
      const raw = xhr.responseText || '';
      if (!raw) return;

      const lfIdx = raw.indexOf('\n\n');
      const crlfIdx = raw.indexOf('\r\n\r\n');
      let eventEnd = -1;
      let separatorLength = 0;

      if (lfIdx >= 0 && (crlfIdx < 0 || lfIdx < crlfIdx)) {
        eventEnd = lfIdx;
        separatorLength = 2;
      } else if (crlfIdx >= 0) {
        eventEnd = crlfIdx;
        separatorLength = 4;
      }

      if (eventEnd < 0) return;

      const eventBlock = raw.slice(0, eventEnd + separatorLength);
      const parsed = parseSSEEvent(eventBlock);
      if (parsed) {
        finish(resolve, parsed.data ?? null);
      }
    };

    xhr.open('GET', `${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, true);
    xhr.setRequestHeader('Accept', 'text/event-stream');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    xhr.timeout = 12000;

    xhr.onprogress = () => {
      tryResolveFromResponseText();
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState >= 2 && xhr.status >= 400) {
        finish(reject, new Error(`SSE request failed with status ${xhr.status}`));
        return;
      }

      if (xhr.readyState === XMLHttpRequest.DONE && !settled) {
        tryResolveFromResponseText();
      }
    };

    xhr.onerror = () => {
      finish(reject, new Error('SSE request failed'));
    };

    xhr.ontimeout = () => {
      finish(reject, new Error('SSE request timed out'));
    };

    xhr.send();
  });
}

async function readFirstEventData(response: Response) {
  const body = response.body;
  if (!body) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const eventEnd = buffer.indexOf('\n\n');
      if (eventEnd >= 0) {
        const eventBlock = buffer.slice(0, eventEnd);
        const parsed = parseSSEEvent(eventBlock);
        await reader.cancel().catch(() => null);
        return parsed?.data ?? null;
      }
    }
  } catch (err) {
    await reader.cancel().catch(() => null);
    throw err;
  }

  return null;
}

export async function getTempatParkir(idLokasiMall: number) {
  try {
    const res = await withTimeout(
      authFetch(`${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/event-stream',
        },
      }),
      8000,
      'tempatparkir fetch'
    );

    const contentType = String(res.headers.get('content-type') || '').toLowerCase();
    let payload: unknown = null;

    if (contentType.includes('application/json')) {
      const text = await withTimeout(res.text(), 5000, 'tempatparkir json read');
      payload = text ? JSON.parse(text) : null;
    } else {
      // Endpoint utama tempat parkir mengirim SSE; ambil event update pertama untuk snapshot status awal.
      payload = await withTimeout(readFirstEventData(res), 6000, 'tempatparkir sse read');
    }

    if (!res.ok) throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));
    if (payload == null) throw new Error('empty tempatparkir payload');

    return payload;
  } catch (primaryError) {
    // Fallback untuk Expo Go/RN ketika streaming fetch tidak memberi event awal.
    const payload = await readFirstEventDataViaXHR(idLokasiMall);
    if (payload == null) {
      throw primaryError;
    }
    return payload;
  }
}

export async function subscribeTempatParkir(
  idLokasiMall: number,
  onUpdate: (payload: any) => void,
  onError?: (error: Error) => void
) {
  const controller = new AbortController();
  const res = await authFetch(`${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
    signal: controller.signal,
  });

  if (!res.ok) {
    const text = await res.text();
    const payload = text ? JSON.parse(text) : null;
    throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));
  }

  const body = res.body;
  if (!body) {
    throw new Error('No streaming body available');
  }

  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let closed = false;

  async function readLoop() {
    try {
      while (!closed) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let eventEnd = buffer.indexOf('\n\n');
        while (eventEnd >= 0) {
          const eventBlock = buffer.slice(0, eventEnd);
          buffer = buffer.slice(eventEnd + 2);
          const parsed = parseSSEEvent(eventBlock);
          if (parsed) {
            if (parsed.event === 'update') {
              onUpdate(parsed.data);
            } else if (parsed.event === 'error' && onError) {
              onError(new Error(typeof parsed.data === 'string' ? parsed.data : JSON.stringify(parsed.data)));
            }
          }
          eventEnd = buffer.indexOf('\n\n');
        }
      }
    } catch (err) {
      if (!closed && onError) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  }

  readLoop();

  return () => {
    closed = true;
    controller.abort();
    reader.cancel().catch(() => null);
  };
}
