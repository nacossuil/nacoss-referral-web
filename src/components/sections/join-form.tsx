import { useState } from "react";
import { useReferral } from "@/hooks/useReferral";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  hasUserAlreadyReferred,
  isInCampaignWindow,
} from "@/lib/referralUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useReferralStore } from "@/store/useReferralStore";
import ProofGuidelines from "./proof-guidelines";
import ShareButtons from "./share-button";

interface FormData {
  name: string;
  email: string;
  youtube: string;
  instagram: string;
  x: string;
}

export default function JoinForm() {
  const referredBy = useReferral();
  const {
    form,
    setForm,
    refLink,
    setRefLink,
    formDisabled,
    disableForm,
    reset,
  } = useReferralStore();
  const [loading, setLoading] = useState(false);

  const getPlaceholder = (field: keyof FormData): string => {
    switch (field) {
      case "name":
        return "Enter your full name";
      case "email":
        return "Enter your email address";
      case "youtube":
        return "@your_youtube_handle";
      case "instagram":
        return "@your_instagram_username";
      case "x":
        return "@your_x_username (Twitter)";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isInCampaignWindow()) {
      toast.error("This contest is only open from April 14–28.");
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
      setLoading(true);
      await addDoc(collection(db, "referrals"), {
        ...form,
        referredBy: referredBy ?? null,
        referralLink,
        createdAt: new Date(),
      });

      setRefLink(referralLink);
      disableForm();
      navigator.clipboard.writeText(referralLink);
      toast.success("You're in! Link copied to clipboard.");

      setForm({
        name: "",
        email: "",
        youtube: "",
        instagram: "",
        x: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="join-form"
      className="w-full bg-[#021a3c] flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6">
          Join the Referral Contest
        </h3>

        {/* ⚠️ FOLLOW WARNING ABOVE FORM */}
        <div className="bg-yellow-400 text-black text-sm p-3 rounded mb-6 text-center font-medium">
          ⚠️ Make sure to follow us on YouTube, Instagram, and X before
          submitting — we may request proof from top referrers.
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0f172a] text-white p-6 md:p-8 rounded-lg space-y-4"
        >
          {(Object.keys(form) as (keyof FormData)[]).map((field) => (
            <Input
              key={field}
              required
              disabled={formDisabled}
              type={field === "email" ? "email" : "text"}
              placeholder={getPlaceholder(field)}
              value={form[field]}
              onChange={(e) => {
                setForm({ ...form, [field]: e.target.value });
              }}
              className="bg-[#1e293b] border border-gray-700 text-white disabled:opacity-50"
            />
          ))}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-nacoss hover:bg-nacoss/80"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>

        {/* 🎉 Referral link + share section */}
        {refLink && (
          <div className="mt-6 text-sm bg-[#1e293b] p-4 rounded text-center space-y-3">
            🎉 You're in! Your referral link (copied):
            <p className="text-nacoss mt-2 font-mono break-all">{refLink}</p>
            <Button
              variant="ghost"
              className="text-nacoss underline text-xs"
              onClick={reset}
            >
              Submit another entry
            </Button>
            {/* 🧾 Proof Guidelines */}
            <ProofGuidelines />
            {/* 🔗 Share Buttons */}
            <ShareButtons link={refLink} />
          </div>
        )}
      </div>
    </section>
  );
}
