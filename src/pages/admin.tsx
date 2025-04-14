import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useParticipantsQuery } from "@/hooks/useParticipantsQuery";
import { Button } from "@/components/ui/button";
import { FaLock } from "react-icons/fa6";
import { useState, useMemo } from "react";
import { exportParticipantsToCSV } from "@/lib/exportCSV";
import { ParticipantFilters } from "@/components/admin/participants-filter";
import { ParticipantTable } from "@/components/admin/participant-table";
import { PaginationControls } from "@/components/admin/pagination-controls";
import { useFilteredParticipants } from "@/hooks/useFilteredParticipants";

export default function AdminPage() {
  const { user, login, logout } = useAdminAuth();
  const { participants, handleToggle, handleNoteChange } =
    useParticipantsQuery(user);

  const [search, setSearch] = useState("");
  const [filterVerified, setFilterVerified] = useState<
    "all" | "verified" | "unverified"
  >("all");
  const [filterFollowed, setFilterFollowed] = useState<
    "all" | "followed" | "unfollowed"
  >("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useFilteredParticipants(
    participants,
    search,
    filterVerified,
    filterFollowed
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 mb-4">
            <FaLock /> Admin Login
          </h2>
          <Button onClick={login} className="bg-nacoss">
            Login with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white px-4 md:px-10 py-10">
      <div className="w-full mx-auto space-y-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            onClick={logout}
            className="text-red-500 hover:text-white hover:bg-red-500"
          >
            Logout
          </Button>
        </div>

        <ParticipantFilters
          search={search}
          setSearch={setSearch}
          filterVerified={filterVerified}
          setFilterVerified={setFilterVerified}
          filterFollowed={filterFollowed}
          setFilterFollowed={setFilterFollowed}
          onExport={() => exportParticipantsToCSV(filtered)}
        />
      </div>

      <ParticipantTable
        participants={paginated}
        handleToggle={handleToggle}
        handleNoteChange={handleNoteChange}
      />

      <PaginationControls
        page={page}
        total={filtered.length}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
}
