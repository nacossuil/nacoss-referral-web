import { useEffect } from "react";
import { hasUserAlreadyReferred } from "@/lib/referralUtils";
import { useReferralStore } from "@/store/useReferralStore";

export function useSyncWithDatabase() {
  const { form, formDisabled, reset } = useReferralStore();

  useEffect(() => {
    const checkSubmission = async () => {
      if (formDisabled && form.email) {
        const exists = await hasUserAlreadyReferred(form.email, "");
        if (!exists) {
          reset();
        }
      }
    };

    checkSubmission();
  }, [formDisabled, form.email, reset]);
}
