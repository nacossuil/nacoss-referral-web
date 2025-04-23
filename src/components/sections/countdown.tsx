import { useEffect, useState } from "react";

const deadline = new Date(2025, 4, 13, 9, 0, 0).getTime();

function getTimeLeft() {
  const now = new Date();

  const diff = deadline - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center bg-[#1e293b] p-6 rounded-lg max-w-xl mx-auto mt-10 text-white">
      <h3 className="text-xl font-bold mb-2">⏳ Contest Ends In</h3>
      <div className="text-2xl font-mono">
        {String(time.days).padStart(2, "0")}d{" "}
        {String(time.hours).padStart(2, "0")}h{" "}
        {String(time.minutes).padStart(2, "0")}m{" "}
        {String(time.seconds).padStart(2, "0")}s
      </div>
    </div>
  );
}
