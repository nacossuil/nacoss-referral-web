import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ProofGuidelines() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-nacoss underline text-xs mt-2"
        >
          View Proof Guidelines
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0f172a] text-white border border-nacoss max-w-md">
        <h3 className="text-lg font-bold mb-2">📸 Proof Guidelines</h3>
        <p className="text-sm text-white/70 mb-2">
          If you're among the top referrers, we may contact you to confirm
          you’ve followed our social media accounts.
        </p>
        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          <li>Send a screenshot showing you're following us</li>
          <li>Or show a screen recording of your following list</li>
          <li>Respond within 24 hours or risk disqualification</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Don’t worry — if you’re contacted, we’ll guide you.
        </p>
      </DialogContent>
    </Dialog>
  );
}
