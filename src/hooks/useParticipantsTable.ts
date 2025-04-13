import { useMemo, useState } from "react";
import { Participant } from "@/types/participant";

export function useParticipantTable(participants: Participant[], perPage = 10) {
  const [search, setSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState<"all" | "yes" | "no">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return participants.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.instagram.toLowerCase().includes(search.toLowerCase());

      const matchVerified =
        verifiedFilter === "all"
          ? true
          : verifiedFilter === "yes"
          ? p.verified
          : !p.verified;

      return matchSearch && matchVerified;
    });
  }, [participants, search, verifiedFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const resetPage = () => setPage(1);

  return {
    page,
    setPage,
    search,
    setSearch,
    verifiedFilter,
    setVerifiedFilter,
    filtered,
    paginated,
    resetPage,
    total: filtered.length,
  };
}
