import { FormData } from "@/types/form";
import { toast } from "sonner";
import {
  hasUserAlreadyReferred,
  isInCampaignWindow,
} from "@/lib/referralUtils";

export const handleSubmit = async (
  e: React.FormEvent,
  form: FormData,
  referredBy: string | null,
  setRefLink: (val: string) => void,
  setShowFollowStep: (val: boolean) => void,
  disableForm: () => void
) => {
  e.preventDefault();

  if (!isInCampaignWindow()) {
    toast.error("This contest is only open from April 14–28.");
    return;
  }

  if (!form.email || !form.youtube) {
    toast.error("Email and YouTube handle are required.");
    return;
  }

  const alreadyUsed = await hasUserAlreadyReferred(
    form.email,
    referredBy ?? ""
  );

  if (alreadyUsed) {
    toast.error("You’ve already used this referral link.");
    return;
  }

  const username = form.youtube || form.name.replace(/\s+/g, "_");
  const referralLink = `${window.location.origin}?ref=${username}`;

  setRefLink(referralLink);
  setShowFollowStep(true);
  disableForm();
};
