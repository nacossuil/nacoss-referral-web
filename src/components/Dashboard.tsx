import { useEffect, useState } from "react";
import { useReferral } from "@/hooks/useReferral";
import { getReferralBreakdown } from "@/lib/referralUtils";

export default function Dashboard() {
  const username = useReferral();
  const [stats, setStats] = useState<{
    total: number;
    youtube: number;
    instagram: number;
    x: number;
  } | null>(null);

  useEffect(() => {
    if (username) {
      getReferralBreakdown(username).then(setStats);
    }
  }, [username]);

  if (!username || !stats) return null;

  return (
    <section className="text-center py-12 px-6 bg-[#1e293b] text-white max-w-xl mx-auto mt-10 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">📊 Your Referral Stats</h3>
      <p className="text-muted-foreground mb-4">
        Referrals from your link ({username})
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-[#0f172a] p-4 rounded">
          YouTube: <span className="font-bold text-nacoss">{stats.youtube}</span>
        </div>
        <div className="bg-[#0f172a] p-4 rounded">
          Instagram: <span className="font-bold text-nacoss">{stats.instagram}</span>
        </div>
        <div className="bg-[#0f172a] p-4 rounded col-span-2">
          X (Twitter): <span className="font-bold text-nacoss">{stats.x}</span>
        </div>
        <div className="bg-nacoss/20 p-4 rounded col-span-2">
          Total: <span className="font-bold text-nacoss">{stats.total}</span>
        </div>
      </div>
    </section>
  );
}
