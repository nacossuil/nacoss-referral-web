import { useEffect, useState } from "react";

const targetDate = new Date(2024, 3, 28, 23, 59, 59); // April is month 3 (0-indexed)

function calculateTimeLeft() {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { d: 0, h: 0, m: 0, s: 0 };
  }

  return {
    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
    m: Math.floor((difference / (1000 * 60)) % 60),
    s: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calculateTimeLeft);

  useEffect(() => {
    const tick = () => {
      setTime(calculateTimeLeft());
    };

    tick(); // initial call
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval); // cleanup on remount
  }, []);

  return (
    <div className="text-center bg-[#1e293b] p-6 rounded-lg max-w-xl mx-auto text-white">
      <h3 className="text-xl font-bold mb-2">⏳ Contest Ends In</h3>
      <div className="text-2xl font-mono">
        {String(time.d).padStart(2, "0")}d {String(time.h).padStart(2, "0")}h{" "}
        {String(time.m).padStart(2, "0")}m {String(time.s).padStart(2, "0")}s
      </div>
    </div>
  );
}
