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

export function setCurrentUser(user: CurrentUser) {
  currentUser = user;
  saveToStorage(user);
}

export async function ensureCurrentUserLoaded() {
  await hydrateFromStorage();
}

export function getCurrentUser(): CurrentUser {
  return currentUser;
}

void hydrateFromStorage();
