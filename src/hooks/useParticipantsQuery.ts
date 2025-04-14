import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Participant } from "@/types/participant";
import { toast } from "sonner";

type AdminUser = { name: string; email: string } | null;

export function useParticipantsQuery(user: AdminUser) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "referrals"));
    const data: Participant[] = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        ...(d as Omit<Participant, "id">),
      };
    });

    setParticipants(
      data.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.()?.getTime?.() ?? 0;
        const bTime = b.createdAt?.toDate?.()?.getTime?.() ?? 0;
        return bTime - aTime;
      })
    );

    setLoading(false);
  };

  const handleToggle = async (id: string, current: boolean) => {
    const ref = doc(db, "referrals", id);
    await updateDoc(ref, { verified: !current });
    toast.success("Verification status updated");
    await fetchData();
  };

  const handleNoteChange = async (id: string, value: string) => {
    const ref = doc(db, "referrals", id);
    await updateDoc(ref, { adminNote: value });
    toast.success("Note saved");
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  return {
    participants,
    loading,
    refresh: fetchData,
    handleToggle,
    handleNoteChange,
  };
}
