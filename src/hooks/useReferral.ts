import { useEffect, useState } from "react";
import { isValidReferrer } from "@/lib/referralUtils";

export function useReferral() {
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("ref");
    const saved = localStorage.getItem("referredBy");

    if (param) {
      isValidReferrer(param).then((valid) => {
        if (valid) {
          localStorage.setItem("referredBy", param);
          setReferrer(param);
        } else {
          console.warn("Invalid referral link — not saved.");
        }
      });
    } else if (saved) {
      setReferrer(saved);
    }
  }, []);

  return referrer;
}
