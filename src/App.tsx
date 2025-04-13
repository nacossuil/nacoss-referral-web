import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import { Toaster } from "sonner";
import Leaderboard from "./components/Leaderboard";
import FAQ from "./components/FAQ";
import { PrizeBadge } from "./components/prize-badge";
import JoinForm from "./components/join-form";
import Dashboard from "./components/Dashboard";

function App() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) localStorage.setItem("referredBy", ref);

  return (
    <>
      <Toaster />
      <PrizeBadge />
      <main className="font-sans">
        <Hero />
        <HowItWorks />
        <JoinForm />
        <Dashboard />
        <Leaderboard />
        <FAQ />
      </main>
    </>
  );
}

export default App;
