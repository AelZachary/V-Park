import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParkingHistory } from '@/models/ParkingHistory';

export const PENDING_BOOKING_KEY = '@pending_parking_booking';
export const HISTORY_BOOKING_KEY = '@parking_booking_history';

export type PendingBooking = {
  id: number;
  mall: string;
  area: string;
  slot: string;
  customerName: string;
  customerPhone: string;
  vehicleType: string;
  plateNumber: string;
  status: 'pending' | 'active';
  startAt?: number;
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

export async function loadBookingHistory(): Promise<ParkingHistory[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_BOOKING_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ParkingHistory[];
  } catch (error) {
    console.warn('Failed to load booking history', error);
    return [];
  }
}

export async function appendBookingHistory(historyItem: ParkingHistory) {
  try {
    const existing = await loadBookingHistory();
    await AsyncStorage.setItem(
      HISTORY_BOOKING_KEY,
      JSON.stringify([historyItem, ...existing]),
    );
  } catch (error) {
    console.warn('Failed to append booking history', error);
  }
}
