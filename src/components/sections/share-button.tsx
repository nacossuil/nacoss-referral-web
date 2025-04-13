import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  link: string;
}

export default function ShareButtons({ link }: ShareButtonsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm">
      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast.success("Link copied to clipboard!");
        }}
      >
        📋 Copy Link
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=Join+the+Nacoss+Referral+Contest+and+win+₦10,000!+Use+my+link:+${link}`,
            "_blank"
          )
        }
      >
        Share on X
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() =>
          window.open(`https://www.instagram.com/direct/new/`, "_blank")
        }
      >
        Share on Instagram
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() =>
          window.open(
            `https://wa.me/?text=Join+the+Nacoss+Referral+Contest+and+win+₦10,000!+Use+my+link:+${link}`,
            "_blank"
          )
        }
      >
        Share on WhatsApp
      </Button>
    </div>
  );
}
