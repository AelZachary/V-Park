export let currentUsername: string | null = null;

export function setCurrentUsername(username: string) {
  currentUsername = username;
}

export function clearCurrentUsername() {
  currentUsername = null;
}
