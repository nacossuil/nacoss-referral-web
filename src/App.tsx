import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import GleamEmbed from "./components/GleamEmbed";
import Leaderboard from "./components/Leaderboard";
import FAQ from "./components/FAQ";

function App() {
  return (
    <main className="font-sans">
      <Hero />
      <HowItWorks />
      <GleamEmbed />
      <Leaderboard />
      <FAQ />
    </main>
  );
}

export default App;
