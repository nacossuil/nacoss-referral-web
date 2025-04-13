import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getTopReferrersDuringCampaignWithHandles } from "@/lib/referralUtils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, login, logout } = useAdminAuth();
  const [referrers, setReferrers] = useState<
    { instagram: string; count: number }[]
  >([]);

  useEffect(() => {
    if (user) {
      getTopReferrersDuringCampaignWithHandles().then(setReferrers);
    }
  }, [user]);

  if (!user)
    return (
      <div className="text-center p-10 text-white">
        <h2 className="text-2xl mb-4 font-semibold">🔒 Admin Login</h2>
        <Button onClick={login}>Login with Google</Button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛠 Top Referrers (Admin View)</h2>
        <Button onClick={logout} variant="ghost" className="text-nacoss">
          Logout
        </Button>
      </div>

      <div className="space-y-3">
        {referrers.map((r, i) => (
          <div
            key={i}
            className="bg-[#0f172a] border border-nacoss p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{r.instagram}</p>
              <p className="text-muted-foreground text-sm">
                {r.count} referral{r.count > 1 ? "s" : ""}
              </p>
            </div>
            <Button variant="outline" className="text-xs">
              Mark as Verified
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
