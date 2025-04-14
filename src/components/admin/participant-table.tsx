import { Participant } from "@/types/participant";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  participants: Participant[];
  handleToggle: (id: string, current: boolean) => void;
  handleNoteChange: (id: string, note: string) => void;
}

export function ParticipantTable({
  participants,
  handleToggle,
  handleNoteChange,
}: Props) {
  return (
    <div className="overflow-auto rounded-xl shadow-lg text-sm border border-white/20">
      <div className="min-w-[1000px]">
        {/* Table Head */}
        <div className="grid grid-cols-10 gap-4 p-3 bg-[#1e293b] border-b border-white/20 font-semibold text-nacoss sticky top-0 z-10">
          <div className="border-r border-white/10">Name</div>
          <div className="border-r border-white/10">Email</div>
          <div className="border-r border-white/10">YouTube</div>
          <div className="border-r border-white/10">Instagram</div>
          <div className="border-r border-white/10">X</div>
          <div className="border-r border-white/10">Referrer</div>
          <div className="border-r border-white/10">Submitted</div>
          <div className="border-r border-white/10">Followed?</div>
          <div className="border-r border-white/10">Verified</div>
          <div>Note</div>
        </div>

        {/* Table Rows */}
        {participants.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-10 gap-4 p-3 border-b border-white/10 items-start"
          >
            <div className="break-words">{p.name}</div>
            <div className="break-words">{p.email}</div>
            <div className="break-words">{p.youtube}</div>
            <div className="break-words">{p.instagram}</div>
            <div className="break-words">{p.x}</div>
            <div className="break-words">{p.referredBy || "—"}</div>
            <div className="text-muted-foreground text-xs break-words">
              {p.createdAt?.toDate()?.toLocaleString()}
            </div>
            <div className="text-center">{p.followConfirmed ? "✅" : "❌"}</div>
            <div>
              <Switch
                checked={p.verified}
                onCheckedChange={() => handleToggle(p.id, p.verified ?? false)}
              />
            </div>
            <div>
              <Textarea
                className="text-sm bg-[#0f172a] border border-nacoss"
                defaultValue={p.adminNote}
                onBlur={(e) => handleNoteChange(p.id, e.target.value)}
                placeholder="Note..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
