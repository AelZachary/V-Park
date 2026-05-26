export interface ParkingHistory {
  date: string;
  id: number;
  mall: string;
  area: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  total: string;
  plate?: string;
  status?: 'pending' | 'completed' | 'expired';
}