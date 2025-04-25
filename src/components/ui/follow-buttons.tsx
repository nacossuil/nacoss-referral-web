import { Button } from "@/components/ui/button";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useFollowClicks } from "@/hooks/useFollowClicks";

export function FollowUsButtons({
  onAllClickedChange,
}: {
  onAllClickedChange?: (ready: boolean) => void;
}) {
  const { markClicked, allClicked } = useFollowClicks();

  if (onAllClickedChange) onAllClickedChange(allClicked);

  return (
    <div className="mt-4 space-y-2 text-center">
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="ghost"
          className="text-red-500 border border-red-500"
          onClick={() => {
            markClicked("youtube");
            window.open(
              "https://www.youtube.com/@NacossUnilorin-d3d",
              "_blank"
            );
          }}
        >
          <FaYoutube className="mr-2" /> Follow on YouTube
        </Button>

        <Button
          variant="ghost"
          className="text-pink-500 border border-pink-500"
          onClick={() => {
            markClicked("instagram");
            window.open("https://instagram.com/nacoss.unilorin", "_blank");
          }}
        >
          <FaInstagram className="mr-2" /> Follow on Instagram
        </Button>

        <Button
          variant="ghost"
          className="text-blue-400 border border-blue-400"
          onClick={() => {
            markClicked("x");
            window.open("https://x.com/NACOSS_UIL", "_blank");
          }}
        >
          <FaXTwitter className="mr-2" /> Follow on X
        </Button>
      </div>
    </div>
  );
}
