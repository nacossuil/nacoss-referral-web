import { useState } from "react";

export const useFollowConfirmation = () => {
  const [showFollowStep, setShowFollowStep] = useState(false);
  const [followConfirmed, setFollowConfirmed] = useState(false);

  return {
    showFollowStep,
    setShowFollowStep,
    followConfirmed,
    setFollowConfirmed,
  };
};