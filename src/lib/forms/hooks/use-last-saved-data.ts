import { useEffect, useState } from "react";

export interface LastSavedData
  extends Partial<ReturnType<typeof generateData>> {
  message: string;
}

export type UseLastSavedReturn = ReturnType<typeof useLastSavedData>;

export interface UseLastSavedProps {
  lastSaved?: number;
}

export const useLastSavedData = (lastSaved?: number) => {
  const [data, setData] = useState<LastSavedData>({
    message: "Not saved yet",
  });
  useEffect(() => {
    if (lastSaved) {
      const data = generateData(lastSaved);
      setData(data);
    }
    // Update data every 30 seconds
    const timer = setInterval(() => {
      if (lastSaved) {
        const data = generateData(lastSaved);
        setData(data);
      }
    }, 1000 * 30);

    return () => clearInterval(timer);
  }, [lastSaved]);

  return data;
};

function generateData(timestamp: number) {
  const now = Date.now();
  const millisecondsAgo = now - timestamp;
  const secondsAgo = Math.floor(millisecondsAgo / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  let message = "";
  if (secondsAgo < 60) {
    message = `Last saved a few seconds ago`;
  } else if (secondsAgo < 3600) {
    message = `Last saved ${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (secondsAgo < 86_400) {
    message = `Last saved ${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86_400);
    message = `Last saved ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  }
  return {
    message,
    millisecondsAgo,
    secondsAgo,
    minutesAgo,
    hoursAgo,
    daysAgo,
  };
}
