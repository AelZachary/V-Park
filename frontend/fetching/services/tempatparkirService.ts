import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '../auth/auth';

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
  const res = await authFetch(`${API_BASE_URL}/api/tempatparkir?idlokasimall=${idLokasiMall}`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
  });

  const payload = await readFirstEventData(res);

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));

  return payload;
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
