import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const CAMPAIGN_START = new Date("2024-04-13T00:00:00");
const CAMPAIGN_END = new Date("2024-04-28T23:59:59");

export async function isValidReferrer(username: string) {
  const q = query(
    collection(db, "referrals"),
    where("youtube", "==", username)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

export async function isEmailUsed(email: string) {
  const q = query(collection(db, "referrals"), where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
}

export function isInCampaignWindow(): boolean {
  const now = new Date();
  return now >= CAMPAIGN_START && now <= CAMPAIGN_END;
// return true;
}

// Count referrals for a username
export async function getReferralStats(username: string) {
  const q = query(
    collection(db, "referrals"),
    where("referredBy", "==", username)
  );
  const snap = await getDocs(q);
  return snap.size;
}

// Count top referrers
export async function getTopReferrers() {
  const snapshot = await getDocs(collection(db, "referrals"));
  const counts: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const ref = doc.data().referredBy;
    if (ref) counts[ref] = (counts[ref] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

// Get all valid referrals within campaign window
export async function getTopReferrersDuringCampaignWithHandles() {
  const snapshot = await getDocs(collection(db, "referrals"));

  const refMap: Record<string, { count: number; instagram: string }> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const ref = data.referredBy;
    const createdAt = data.createdAt?.toDate?.();

    if (
      ref &&
      createdAt &&
      createdAt >= CAMPAIGN_START &&
      createdAt <= CAMPAIGN_END
    ) {
      if (!refMap[ref]) {
        refMap[ref] = { count: 0, instagram: "" };
      }
      refMap[ref].count++;
    }
  });

  // Enrich with Instagram handles
  const full = await getDocs(collection(db, "referrals"));
  full.forEach((doc) => {
    const data = doc.data();
    const yt = data.youtube;
    const ig = data.instagram;
    if (refMap[yt] && ig) {
      refMap[yt].instagram = ig;
    }
  });

  return Object.values(refMap)
    .sort((a, b) => b.count - a.count)
    .map(({ instagram, count }) => ({ instagram, count }));
}

// Get referral stats by platform
export async function getReferralBreakdown(username: string) {
  const snapshot = await getDocs(
    query(collection(db, "referrals"), where("referredBy", "==", username))
  );

  let youtube = 0;
  let instagram = 0;
  let x = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.youtube) youtube++;
    if (data.instagram) instagram++;
    if (data.x) x++;
  });

  return { total: snapshot.size, youtube, instagram, x };
}

export async function hasUserAlreadyReferred(email: string, referrer: string) {
  const q = query(
    collection(db, "referrals"),
    where("email", "==", email),
    where("referredBy", "==", referrer)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}
