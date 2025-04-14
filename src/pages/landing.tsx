import { PrizeBadge } from "@/components/sections";
import Dashboard from "@/components/sections/dashboard";
import FAQ from "@/components/ui/faq";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import JoinForm from "@/components/sections/join-form";
import Leaderboard from "@/components/sections/leaderboard";


export default function LandingPage() {
  return (
    <>
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
