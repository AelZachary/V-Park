import AsyncStorage from '@react-native-async-storage/async-storage';

export const PENDING_BOOKING_KEY = '@pending_parking_booking';

export type PendingBooking = {
  id: number;
  mall: string;
  area: string;
  slot: string;
  customerName: string;
  customerPhone: string;
  vehicleType: string;
  plateNumber: string;
  createdAt: number;
  expiresAt: number;
};

export async function savePendingBooking(booking: PendingBooking) {
  try {
    await AsyncStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(booking));
  } catch (error) {
    console.warn('Failed to save pending booking', error);
  }
}

export async function loadPendingBooking(): Promise<PendingBooking | null> {
  try {
    const raw = await AsyncStorage.getItem(PENDING_BOOKING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingBooking;
  } catch (error) {
    console.warn('Failed to load pending booking', error);
    return null;
  }
}

export async function clearPendingBooking() {
  try {
    await AsyncStorage.removeItem(PENDING_BOOKING_KEY);
  } catch (error) {
    console.warn('Failed to clear pending booking', error);
  }
}
