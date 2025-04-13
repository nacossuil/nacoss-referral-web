import { useEffect, useState } from "react";
import { getTopReferrersDuringCampaignWithHandles } from "@/lib/referralUtils";

export default function Leaderboard() {
  const [referrers, setReferrers] = useState<
    { instagram: string; count: number }[]
  >([]);
  const now = new Date();
  const showWinner = now > new Date("2024-04-28T23:59:59");

  useEffect(() => {
    getTopReferrersDuringCampaignWithHandles().then(setReferrers);
  }, []);

  return (
    <section className="py-12 px-4 text-center max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🏆 Top Referrers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
        {referrers.length > 0 ? (
          referrers.map((r, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg bg-[#1e293b] ${
                i === 0 ? "border-yellow-400" : "border-nacoss"
              }`}
            >
              <p className="text-lg font-semibold">
                {i + 1}. {r.instagram || "Anonymous"}
                {i === 0 && <span className="ml-2 text-yellow-400">🥇</span>}
              </p>
              <p className="text-sm text-muted-foreground">
                {r.count} referral{r.count > 1 ? "s" : ""}
              </p>
            </div>
          ))
        ) : (
          <div className="flex w-full justify-center items-center"><p className="text-muted-foreground text-center">No referrals yet.</p></div>
        )}
      </div>
      {showWinner && referrers[0] ? (
        <div className="text-center mt-6 bg-yellow-400 text-black p-4 rounded shadow">
          🎉 The winner is <strong>{referrers[0].instagram}</strong> with{" "}
          {referrers[0].count} referral{referrers[0].count > 1 ? "s" : ""}!
        </div>
      ) : (
        <p className="text-muted-foreground mt-4 italic">
          Winner will be announced after April 28th.
        </p>
      )}
    </section>
  );
}
