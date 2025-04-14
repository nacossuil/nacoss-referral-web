import { Dispatch, SetStateAction } from "react";

interface FiltersProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filterVerified: "all" | "verified" | "unverified";
  setFilterVerified: Dispatch<
    SetStateAction<"all" | "verified" | "unverified">
  >;
  filterFollowed: "all" | "followed" | "unfollowed";
  setFilterFollowed: Dispatch<
    SetStateAction<"all" | "followed" | "unfollowed">
  >;
  onExport: () => void;
}

export function ParticipantFilters({
  search,
  setSearch,
  filterVerified,
  setFilterVerified,
  filterFollowed,
  setFilterFollowed,
  onExport,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-between">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="bg-[#1e293b] px-4 py-2 rounded text-sm text-white w-full md:w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filterVerified}
        onChange={(e) =>
          setFilterVerified(e.target.value as "all" | "verified" | "unverified")
        }
        className="bg-[#1e293b] px-4 py-2 rounded text-sm text-white"
      >
        <option value="all">All</option>
        <option value="verified">Verified</option>
        <option value="unverified">Unverified</option>
      </select>

      <select
        value={filterFollowed}
        onChange={(e) =>
          setFilterFollowed(e.target.value as "all" | "followed" | "unfollowed")
        }
        className="bg-[#1e293b] px-4 py-2 rounded text-sm text-white"
      >
        <option value="all">All</option>
        <option value="followed">Followed</option>
        <option value="unfollowed">Unfollowed</option>
      </select>

      <button
        onClick={onExport}
        className="text-white border border-white hover:bg-white hover:text-black text-sm px-4 py-2 rounded"
      >
        Export CSV
      </button>
    </div>
  );
}
