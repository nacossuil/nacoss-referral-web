import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { FormData } from "@/types/form";

export const handleFinalConfirm = async (
  followConfirmed: boolean,
  form: FormData,
  referredBy: string | null,
  refLink: string | null,
  disableForm: () => void,
  setFinalConfirmed: (value: boolean) => void
) => {
  if (!followConfirmed) {
    toast.error("Please confirm that you've followed all accounts.");
    return;
  }

  try {
    await addDoc(collection(db, "referrals"), {
      ...form,
      referredBy: referredBy ?? null,
      referralLink: refLink,
      followConfirmed: true,
      createdAt: new Date(),
    });

    disableForm();
    navigator.clipboard.writeText(refLink!);
    toast.success("You're in! Link copied to clipboard.");
    setFinalConfirmed(true);
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    console.error("Error saving referral: ", error);
  }
};
