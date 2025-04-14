import { useMemo } from "react";
import { Participant } from "@/types/participant";

type FilterStatus = "all" | "verified" | "unverified";
type FollowStatus = "all" | "followed" | "unfollowed";

export function useFilteredParticipants(
  participants: Participant[],
  search: string,
  filterVerified: FilterStatus,
  filterFollowed: FollowStatus
) {
  return useMemo(() => {
    return participants.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase());

      const matchVerified =
        filterVerified === "all" ||
        (filterVerified === "verified" && p.verified) ||
        (filterVerified === "unverified" && !p.verified);

      const matchFollowed =
        filterFollowed === "all" ||
        (filterFollowed === "followed" && p.followConfirmed) ||
        (filterFollowed === "unfollowed" && !p.followConfirmed);

      return matchSearch && matchVerified && matchFollowed;
    });
  }, [participants, search, filterVerified, filterFollowed]);
}
