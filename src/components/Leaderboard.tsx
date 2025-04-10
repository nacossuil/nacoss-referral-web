// src/components/Leaderboard.tsx
const topReferrers = [
    { name: "Adewale", count: 17 },
    { name: "Fatima", count: 15 },
    { name: "Cee", count: 13 },
  ];
  
  export default function Leaderboard() {
    return (
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">🏆 Top Referrers</h2>
        <div className="space-y-3">
          {topReferrers.map((user, idx) => (
            <p key={idx} className="text-muted-foreground">
              {idx + 1}. {user.name} – {user.count} referrals
            </p>
          ))}
        </div>
      </section>
    );
  }
  