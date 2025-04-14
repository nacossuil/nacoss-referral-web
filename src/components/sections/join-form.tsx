import { useEffect, useState } from "react";
import { useReferral } from "@/hooks/useReferral";
import { useReferralStore } from "@/store/useReferralStore";
import { useFollowConfirmation } from "@/hooks/useFollowConfirmation";
import { useFormFields } from "@/hooks/useFormFields";
import { handleSubmit } from "@/handlers/handleSubmit";
import { handleFinalConfirm } from "@/handlers/handleFinalConfirm";
import { hasUserAlreadyReferred } from "@/lib/referralUtils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareButtons } from "../ui/share-button";
import { FollowUsButtons } from "../ui/follow-buttons";
import { ProofGuidelines } from "./proof-guidelines";

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

  const {
    showFollowStep,
    setShowFollowStep,
    followConfirmed,
    setFollowConfirmed,
  } = useFollowConfirmation();

  const { getPlaceholder } = useFormFields();
  const [checkboxAllowed, setCheckboxAllowed] = useState(false);
  const [finalConfirmed, setFinalConfirmed] = useState(false);

  // 👇 Fix for stale persisted state when Firestore is wiped
  useEffect(() => {
    const checkMismatch = async () => {
      if (formDisabled && form.email) {
        const exists = await hasUserAlreadyReferred(
          form.email,
          referredBy ?? ""
        );
        if (!exists) {
          toast.info(
            "Your previous submission couldn’t be found. You can submit again."
          );
          reset();
        }
      }
    };

    checkMismatch();
  }, [formDisabled, form.email, referredBy, reset]);

  return (
    <section
      id="join-form"
      className="w-full bg-[#021a3c] flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6">
          Join the Referral Contest
        </h3>

        <div className="bg-yellow-400 text-black text-sm p-3 rounded mb-6 text-center font-medium">
          ⚠️ Make sure to follow us on YouTube, Instagram, and X before
          submitting — we may request proof from top referrers.
        </div>

        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              form,
              referredBy,
              setRefLink,
              setShowFollowStep,
              disableForm
            )
          }
          className="bg-[#0f172a] text-white p-6 md:p-8 rounded-lg space-y-4"
        >
          {(Object.keys(form) as (keyof typeof form)[]).map((field) => (
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
            disabled={formDisabled}
            className="w-full bg-nacoss hover:bg-nacoss/80"
          >
            Submit
          </Button>
        </form>

        {refLink && showFollowStep && (
          <div className="mt-6 text-sm bg-[#1e293b] p-4 rounded text-center space-y-4">
            <p className="font-medium text-white">
              🎉 You're almost done! Follow our pages below to activate your
              link:
            </p>

            <FollowUsButtons onAllClickedChange={setCheckboxAllowed} />
            <ProofGuidelines />

            <label className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <input
                type="checkbox"
                checked={followConfirmed}
                disabled={!checkboxAllowed}
                onChange={(e) => setFollowConfirmed(e.target.checked)}
                className="w-4 h-4"
              />
              I’ve followed all three accounts
            </label>

            <Button
              disabled={!followConfirmed}
              onClick={() =>
                handleFinalConfirm(
                  followConfirmed,
                  form,
                  referredBy,
                  refLink,
                  disableForm,
                  setFinalConfirmed
                )
              }
              className="w-full max-w-fit bg-nacoss mt-2 hover:bg-nacoss/80 disabled:opacity-50"
            >
              Confirm and Get Referral Link
            </Button>

            {finalConfirmed && (
              <>
                <p className="text-white/80 text-xs mt-4">
                  Here’s your referral link:
                </p>
                <p className="text-nacoss font-mono break-all">{refLink}</p>
                <ShareButtons link={refLink} />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
