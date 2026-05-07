import { ParkingHistory } from "@/models/ParkingHistory";

export function useActivityHistoryVM() {

  const historyData: ParkingHistory[] = [
    {
      id: 1,
      date: '10 Mei 2024',
      mall: 'Trans Studio Mall Makassar',
      area: 'Basement',
      checkIn: '10:15',
      checkOut: '14:05',
      duration: '3 Jam 50 Menit',
      total: 'Rp 20.000',
    },
    {
      id: 2,
      date: '11 Mei 2024',
      mall: 'Mall Ratu Indah',
      area: 'Basement',
      checkIn: '10:30',
      checkOut: '14:10',
      duration: '3 Jam 40 Menit',
      total: 'Rp 20.000',
    },
    {
      id: 3,
      date: '12 Mei 2024',
      mall: 'Panakukang Square',
      area: 'Basement',
      checkIn: '18:20',
      checkOut: '21:10',
      duration: '2 Jam 40 Menit',
      total: 'Rp 20.000',
    },
    {
      id: 4,
      date: '13 Mei 2024',
      mall: 'Phinisi Point Mall',
      area: 'Basement',
      checkIn: '16:00',
      checkOut: '19:20',
      duration: '3 Jam 20 Menit',
      total: 'Rp 20.000',
    },
  ];

  return {
    historyData,
  };
}