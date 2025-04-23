import { useEffect, useState } from "react";
import { getTopReferrersDuringCampaignWithHandles } from "@/lib/referralUtils";

export default function Leaderboard() {
  const [referrers, setReferrers] = useState<
    { instagram: string; count: number }[]
  >([]);
  const now = new Date();
  const showWinner = now > new Date("2025-05-13T09:00:00");

  useEffect(() => {
    getTopReferrersDuringCampaignWithHandles().then(setReferrers);
  }, []);

  return (
    <section className=" w-full bg-[#011749] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-[#1e293b] p-6 sm:p-8 rounded-lg text-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top Referrers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {referrers.length > 0 ? (
            referrers.map((r, i) => (
              <div
                key={i}
                className={`p-4 border rounded-lg bg-[#0f172a] ${
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
            <div className="col-span-full text-center text-muted-foreground">
              No referrals yet.
            </div>
          )}
        </div>

        {showWinner && referrers[0] ? (
          <div className="text-center mt-6 bg-yellow-400 text-black p-4 rounded shadow">
            🎉 The winner is <strong>{referrers[0].instagram}</strong> with{" "}
            {referrers[0].count} referral{referrers[0].count > 1 ? "s" : ""}!
          </div>
        ) : (
          <p className="text-muted-foreground mt-6 text-center italic">
            Winner will be announced after May 13th.
          </p>
        )}
      </div>
    </section>
  );
}
