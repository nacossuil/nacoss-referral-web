import { useReferralStore } from "@/store/useReferralStore";
import { FormData } from "@/types/form";

export const useFormFields = () => {
  const { form, setForm } = useReferralStore();

  const getPlaceholder = (field: keyof FormData): string => {
    const map: Record<keyof FormData, string> = {
      name: "Enter your full name",
      email: "Enter your email address",
      youtube: "@your_youtube_handle",
      instagram: "@your_instagram_username",
      x: "@your_x_username (Twitter)",
    };
    return map[field];
  };

  return { form, setForm, getPlaceholder };
};
