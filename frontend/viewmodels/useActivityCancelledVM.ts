import { useState } from 'react';

export type CancelledBooking = {
  mall: string;
  area: string;
  date: string;
};

export const useActivityCancelledVM = () => {

  const [cancelledData, setCancelledData] = useState<CancelledBooking[]>([
    {
      mall: 'Mall Ratu Indah',
      area: 'Lantai P2',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Mall Ratu Indah',
      area: 'Lantai P5',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Mall Ratu Indah',
      area: 'Lantai P3 - Area A',
      date: '15 Apr 2024, 09:10',
    },
    {
      mall: 'Mall Ratu Indah',
      area: 'Lantai P1 - Area A',
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