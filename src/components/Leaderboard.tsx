import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Referrer {
  name: string;
  count: number;
}

export default function Leaderboard() {
  const [referrers, setReferrers] = useState<Referrer[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      const q = query(
        collection(db, "referrals"),
        orderBy("count", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data() as Referrer);
      setReferrers(data);
    };

    fetchReferrals();
  }, []);

  return (
    <section className="py-12 px-4 text-center bg-lightBg">
      <h2 className="text-3xl font-bold mb-12">Top Referrers</h2>
      {/* <div className="space-y-3"> */}
      <ScrollArea className="h-60 w-full rounded-md border border-nacoss p-4 bg-[#0f172a]">
        {referrers ? (
          referrers.map((user, idx) => (
            <div key={idx} className="text-white mb-2">
              <strong>{idx + 1}.</strong> {user.name} —{" "}
              <span className="text-nacoss">{user.count} referrals</span>
            </div>
          ))
        ) : (
          <p>No referrers yet.</p>
        )}
      </ScrollArea>
      {/* </div> */}
    </section>
  );
}
