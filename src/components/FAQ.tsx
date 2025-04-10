export default function FAQ() {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">❓ FAQ</h2>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">How do I prove I subscribed?</h4>
          <p className="text-muted-foreground">
            Enter your YouTube username in the Gleam form. We’ll contact top
            winners for screenshots if needed.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">How are winners selected?</h4>
          <p className="text-muted-foreground">
            Top referrers are ranked on the leaderboard. The more you refer, the
            higher your chances.
          </p>
        </div>
      </div>
    </section>
  );
}
