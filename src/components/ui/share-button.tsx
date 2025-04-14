import { Button } from "@/components/ui/button";
import {
  FaClipboard,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { toast } from "sonner";

interface ShareButtonsProps {
  link: string;
}

export function ShareButtons({ link }: ShareButtonsProps) {
  const message = encodeURIComponent(
    `Kindly follow Nacoss Unilorin on YouTube, IG and X. Use my link to join the referral contest and win ₦10,000: ${link}`
  );

  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm">
      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() => {
          navigator.clipboard.writeText(
            `Kindly follow Nacoss Unilorin on YouTube, IG and X. Use my link to join the referral contest and win ₦10,000: ${link}`
          );
          toast.success("Message copied to clipboard!");
        }}
      >
        <FaClipboard /> Copy Link
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${message}`,
            "_blank"
          )
        }
      >
        Share on X <FaXTwitter />
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() =>
          window.open(`https://www.instagram.com/direct/new/`, "_blank")
        }
      >
        Share on Instagram <FaInstagram />
      </Button>

      <Button
        variant="ghost"
        className="text-nacoss border border-nacoss"
        onClick={() => window.open(`https://wa.me/?text=${message}`, "_blank")}
      >
        Share on WhatsApp <FaWhatsapp />
      </Button>
    </div>
  );
}
