import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function exportReferralsAsCSV() {
  const snap = await getDocs(collection(db, "referrals"));
  const rows = snap.docs.map((doc) => doc.data());

  const headers = [
    "name",
    "email",
    "youtube",
    "instagram",
    "x",
    "referredBy",
    "referralLink",
    "createdAt",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((h) => `"${(row[h] ?? "").toString().replace(/"/g, "'")}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `referrals_${Date.now()}.csv`;
  link.click();
}
