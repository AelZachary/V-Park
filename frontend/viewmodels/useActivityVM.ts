// viewmodels/useActivityVM.ts

import { useEffect, useState } from 'react';

export const useActivityVM = () => {

  // STATUS ARRIVAL
  const [isArrived, setIsArrived] = useState(false);

  // TIMER 30 MENIT
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {

    if (timeLeft <= 0 || isArrived) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, isArrived]);

  // FORMAT TIMER
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    isArrived,
    setIsArrived,
    formattedTime,
  };
};