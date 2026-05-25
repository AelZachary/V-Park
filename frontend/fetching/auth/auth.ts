import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'vpark_token';

export async function setToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    // ignore
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export async function clearToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    // ignore
  }
}

export async function authHeaders(token?: string) {
  const t = token ?? (await getToken());
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function authFetch(input: RequestInfo, init?: RequestInit, token?: string) {
  const headers = (init && init.headers) ? { ...(init.headers as Record<string,string>) } : {};
  const auth = await authHeaders(token);
  const merged = { ...headers, ...auth };
  const mergedInit = { ...(init || {}), headers: merged };
  return fetch(input, mergedInit);
}
