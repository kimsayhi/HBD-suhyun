import dayjs from "dayjs";
import { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function useTimeLeft() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isDDay, setIsDDay] = useState(false);
  useEffect(() => {
    const targetDate = dayjs()
      .month(10)
      .date(12)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const initialDuration = dayjs.duration(targetDate.diff(dayjs()));
    setTimeLeft(initialDuration);
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft.subtract(1, "second");
        if (newTimeLeft.asSeconds() <= 0) {
          setIsDDay(true);
          clearInterval(intervalId);
          return dayjs.duration(0);
        }
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { timeLeft, isDDay };
}
