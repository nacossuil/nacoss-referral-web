import { saveAs } from "file-saver";
import { Participant } from "@/types/participant";

export function exportParticipantsToCSV(participants: Participant[]) {
  if (!participants.length) return;

  const rows = participants.map(({ id, createdAt, ...rest }) => ({
    id,
    ...rest,
    createdAt: createdAt?.toDate?.().toLocaleString?.() ?? "",
  }));

  const csv = [
    Object.keys(rows[0]).join(","),
    ...rows.map((row) => Object.values(row).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "referral_participants.csv");
}
