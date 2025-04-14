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
    <div className="overflow-auto bg-[#1e293b] rounded-xl shadow-lg text-sm">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-10 gap-4 p-4 border-b border-nacoss text-nacoss font-semibold sticky top-0 bg-[#1e293b] z-10">
          <div>Name</div>
          <div>Email</div>
          <div>YouTube</div>
          <div>Instagram</div>
          <div>X</div>
          <div>Referrer</div>
          <div>Submitted</div>
          <div>Followed?</div>
          <div>Verified</div>
          <div>Note</div>
        </div>

        {participants.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-10 gap-4 p-4 border-b border-white/10 items-center"
          >
            <div>{p.name}</div>
            <div>{p.email}</div>
            <div>{p.youtube}</div>
            <div>{p.instagram}</div>
            <div>{p.x}</div>
            <div>{p.referredBy || "—"}</div>
            <div className="text-muted-foreground text-xs">
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
