import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ProofGuidelines() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-nacoss underline text-xs mt-2">
          View Proof Guidelines
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0f172a] text-white border border-nacoss max-w-md">
        <h3 className="text-lg font-bold mb-2">Proof Guidelines</h3>
        <p className="text-sm text-white/70 mb-3">
          To ensure fairness, all top referrers will be required to verify that
          they and the people they referred actually followed our social pages.
        </p>

        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          <li>
            We track if users clicked the social buttons (YouTube, Instagram,
            X).
          </li>
          <li>
            You must also check the box confirming you followed all accounts
            before your referral link is activated.
          </li>
          <li>
            If you’re among the top referrers, we may request visual proof —
            such as screenshots or screen recordings.
          </li>
        </ul>

        <p className="text-xs text-muted-foreground mt-4">
          If you're contacted for verification, you’ll need to respond within 24
          hours. Failure to do so may result in disqualification.
        </p>
      </DialogContent>
    </Dialog>
  );
}
