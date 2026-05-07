import { useState } from 'react';

export type CancelledBooking = {
  mall: string;
  area: string;
  date: string;
};

export const useActivityCancelledVM = () => {

  const [cancelledData, setCancelledData] = useState<CancelledBooking[]>([
    {
      mall: 'Trans Studio Mall Makassar',
      area: 'Parkiran Luar',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Mall Panakukang',
      area: 'Lantai 3',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Nipah Mall',
      area: 'Lantai 2',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Phinisi Point',
      area: 'Parkiran Luar',
      date: '15 Apr 2024, 09:10',
    },
  ]);
  
  const addCancelledBooking = (newBooking: CancelledBooking) => {

    setCancelledData(prev => [
      newBooking,
      ...prev,
    ]);

  };

  return {
    cancelledData,
    addCancelledBooking,
  };
};