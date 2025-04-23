import { FormData } from "@/types/form";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
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
    toast.error("This contest is only open from April 23 - May 13.");
    return;
  }

  if (!form.email || !form.youtube) return;

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

  try {
    await addDoc(collection(db, "referrals"), {
      ...form,
      referredBy: referredBy ?? null,
      referralLink,
      createdAt: new Date(),
    });

    setRefLink(referralLink);
    setShowFollowStep(true);
    disableForm();
    navigator.clipboard.writeText(referralLink);
    toast.success("You're in! Link copied to clipboard.");
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    console.error("Error adding document: ", error);
  }
};
