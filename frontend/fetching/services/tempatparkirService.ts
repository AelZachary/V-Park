import { API_BASE_URL } from '@/fetching/response/responseconfig';
import { authFetch } from '@/fetching/auth/auth';

function extractMessage(payload: unknown, fallback = 'request failed') {
  if (!payload || typeof payload !== 'object') return fallback;
  const p = payload as Record<string, unknown>;
  if (typeof p.ResponseMessage === 'string') return p.ResponseMessage;
  if (typeof p.message === 'string') return p.message;
  return fallback;
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
        const eventBlock = buffer.slice(0, eventEnd).split(/\r?\n/);
        const dataLines = eventBlock.filter((line) => line.startsWith('data:'));
        const rawData = dataLines.map((line) => line.replace(/^data:\s*/, '')).join('\n');
        await reader.cancel().catch(() => null);
        return rawData ? JSON.parse(rawData) : null;
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
  });

  const payload = await readFirstEventData(res);

  if (!res.ok) throw new Error(extractMessage(payload, 'fetching tempat parkir failed'));

  return payload;
}
