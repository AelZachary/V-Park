import type {
  PengunjungLoginResult,
  PetugasLoginResult,
} from '@/fetching/services/loginservices';

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

function loadFromStorage(): CurrentUser {
  if (currentUser !== null) {
    return currentUser;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    currentUser = JSON.parse(raw) as CurrentUser;
    return currentUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function saveToStorage(user: CurrentUser) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function setCurrentUser(user: CurrentUser) {
  currentUser = user;
  saveToStorage(user);
}

export function getCurrentUser(): CurrentUser {
  return loadFromStorage();
}
