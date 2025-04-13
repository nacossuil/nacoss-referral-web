import { useAdminAuth } from "@/hooks/useAdminAuth";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FaLock } from "react-icons/fa6";
import { useParticipantsQuery } from "@/hooks/useParticipantsQuery";

export default function AdminPage() {
  const { user, login, logout } = useAdminAuth();
  const { participants, loading, handleToggle, handleNoteChange } =
    useParticipantsQuery(user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-center px-6">
        <div>
          <div className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
            <FaLock /> <h2>Admin Login</h2>
          </div>
          <Button
            onClick={login}
            className="bg-nacoss text-base hover:bg-nacoss/90"
          >
            Login with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white px-4 md:px-10 py-10">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        <div className="overflow-auto bg-[#1e293b] rounded-xl shadow-lg text-sm">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-9 gap-4 p-4 border-b border-nacoss font-semibold text-nacoss sticky top-0 bg-[#1e293b] z-10">
              <div>Name</div>
              <div>Email</div>
              <div>YouTube</div>
              <div>Instagram</div>
              <div>X</div>
              <div>Referrer</div>
              <div>Submitted</div>
              <div>Verified</div>
              <div>Note</div>
            </div>

            {loading ? (
              <div className="p-6 text-center text-white/70">Loading...</div>
            ) : participants.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No participants found.
              </div>
            ) : (
              participants.map((participant) => (
                <div
                  key={participant.id}
                  className="grid grid-cols-9 gap-4 p-4 border-b border-white/10 items-center"
                >
                  <div className="break-words">{participant.name}</div>
                  <div className="break-words">{participant.email}</div>
                  <div>{participant.youtube}</div>
                  <div>{participant.instagram}</div>
                  <div>{participant.x}</div>
                  <div>{participant.referredBy || "—"}</div>
                  <div className="text-muted-foreground text-xs">
                    {participant.createdAt?.toDate?.()?.toLocaleString?.() ||
                      "—"}
                  </div>
                  <div>
                    <Switch
                      checked={participant.verified}
                      onCheckedChange={() =>
                        handleToggle(
                          participant.id,
                          participant.verified ?? false
                        )
                      }
                    />
                  </div>
                  <div>
                    <Textarea
                      className="text-sm bg-[#0f172a] border border-nacoss"
                      defaultValue={participant.adminNote}
                      onBlur={(e) =>
                        handleNoteChange(participant.id, e.target.value)
                      }
                      placeholder="Note..."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
