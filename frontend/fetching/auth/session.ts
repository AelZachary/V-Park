import type {
  PengunjungLoginResult,
  PetugasLoginResult,
} from '@/fetching/services/loginservices';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SessionUser =
  | PengunjungLoginResult['User']
  | PetugasLoginResult['User'];

export type CurrentUser =
  | {
      user: SessionUser;
      token: string;
    }
  | SessionUser
  | null;

const STORAGE_KEY = 'VPARK_CURRENT_USER';
let currentUser: CurrentUser = null;
let loadPromise: Promise<void> | null = null;
let isHydrated = false;
type UserChangeListener = (user: CurrentUser) => void;
const userChangeListeners: UserChangeListener[] = [];

async function hydrateFromStorage() {
  if (isHydrated) {
    return;
  }

  if (loadPromise) {
    await loadPromise;
    return;
  }

  loadPromise = (async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) {
        currentUser = null;
        return;
      }

      currentUser = JSON.parse(raw) as CurrentUser;
    } catch {
      currentUser = null;
      await AsyncStorage.removeItem(STORAGE_KEY).catch(() => null);
    } finally {
      isHydrated = true;
      loadPromise = null;
    }
  })();

  await loadPromise;
}

function saveToStorage(user: CurrentUser) {
  if (!user) {
    void AsyncStorage.removeItem(STORAGE_KEY).catch(() => null);
    return;
  }

  void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user)).catch(() => null);
}

export function onCurrentUserChanged(cb: UserChangeListener) {
  userChangeListeners.push(cb);
  return () => {
    const idx = userChangeListeners.indexOf(cb);
    if (idx >= 0) userChangeListeners.splice(idx, 1);
  };
}

function isSessionWrapper(value: CurrentUser): value is { user: SessionUser; token: string } {
  return (
    !!value &&
    typeof value === 'object' &&
    'user' in value &&
    'token' in value &&
    typeof (value as { token?: unknown }).token === 'string'
  );
}

function isSessionUser(value: unknown): value is SessionUser {
  return (
    !!value &&
    typeof value === 'object' &&
    'IDUser' in value &&
    'Username' in value
  );
}

export function setCurrentUser(user: CurrentUser) {
  currentUser = user;
  saveToStorage(user);
  try {
    userChangeListeners.forEach((cb) => {
      try { cb(user); } catch { /* ignore listener errors */ }
    });
  } catch {
    // ignore
  }
}

export async function ensureCurrentUserLoaded() {
  await hydrateFromStorage();
}

export function getCurrentUser(): CurrentUser {
  return currentUser;
}

export function getCurrentSessionToken(): string | null {
  if (isSessionWrapper(currentUser)) {
    return currentUser.token;
  }

  return null;
}

export function getCurrentSessionUser(): SessionUser | null {
  if (isSessionWrapper(currentUser)) {
    return currentUser.user;
  }

  if (isSessionUser(currentUser)) {
    return currentUser;
  }

  return null;
}

void hydrateFromStorage();
