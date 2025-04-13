import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormData {
  name: string;
  email: string;
  youtube: string;
  instagram: string;
  x: string;
}

interface ReferralStore {
  form: FormData;
  refLink: string | null;
  formDisabled: boolean;
  setForm: (form: FormData) => void;
  setRefLink: (link: string) => void;
  disableForm: () => void;
  reset: () => void;
}

export const useReferralStore = create<ReferralStore>()(
  persist(
    (set) => ({
      form: {
        name: "",
        email: "",
        youtube: "",
        instagram: "",
        x: "",
      },
      refLink: null,
      formDisabled: false,
      setForm: (form) => set({ form }),
      setRefLink: (link) => set({ refLink: link }),
      disableForm: () => set({ formDisabled: true }),
      reset: () =>
        set({
          form: {
            name: "",
            email: "",
            youtube: "",
            instagram: "",
            x: "",
          },
          refLink: null,
          formDisabled: false,
        }),
    }),
    {
      name: "referral-data", // localStorage key
    }
  )
);
