import { useState } from "react";

export const useFollowClicks = () => {
  const [clicked, setClicked] = useState({
    youtube: false,
    instagram: false,
    x: false,
  });

  const markClicked = (platform: keyof typeof clicked) => {
    setClicked((prev) => ({ ...prev, [platform]: true }));
  };

  const allClicked = Object.values(clicked).every(Boolean);

  return { clicked, markClicked, allClicked };
};
