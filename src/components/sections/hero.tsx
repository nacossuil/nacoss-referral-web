import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Countdown from "./countdown";


export default function Hero() {
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#0f172a] text-white px-6 space-y-6 text-center">
      <Badge className="bg-nacoss text-white text-base px-3 py-1 rounded-full">
        🎉 April 23, 2025 – May 13, 2025.
      </Badge>
      <motion.h1
        className="text-4xl md:text-5xl font-bold max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Win ₦10,000 in the Nacoss Unilorin Referral Contest!
      </motion.h1>
      <motion.p
        className="text-white/40 text-lg max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Refer your friends on YouTube, Instagram, and X. Rack up points. Climb
        the leaderboard.
      </motion.p>
      
      <Countdown />
      <Button
        onClick={scrollToHowItWorks}
        className="bg-nacoss hover:bg-nacoss/90 transition text-white text-base cursor-pointer px-6 py-2 mt-4"
      >
        Enter Contest
      </Button>
    </section>
  );
}
