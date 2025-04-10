import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaUserPlus,
  FaShareAlt,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const steps = [
  {
    icon: (
      <div className="flex gap-2">
        <FaYoutube className="text-nacoss text-xl" />
        <FaInstagram className="text-nacoss text-xl" />
        <FaXTwitter className="text-nacoss text-xl" />
      </div>
    ),
    title: "Follow Us",
    text: "You must follow our YouTube, Instagram, and X accounts through the Gleam contest box.",
  },
  {
    icon: <FaUserPlus className="text-nacoss text-2xl" />,
    title: "Sign Up",
    text: "Submit your YouTube, IG, and X handles through the form.",
  },
  {
    icon: <FaShareAlt className="text-nacoss text-2xl" />,
    title: "Share Your Link",
    text: "Get your unique referral link and invite your friends to join.",
  },
  {
    icon: <FaChartLine className="text-nacoss text-2xl" />,
    title: "Track Your Rank",
    text: "See your referral count on the live leaderboard.",
  },
  {
    icon: <FaTrophy className="text-nacoss text-2xl" />,
    title: "Win ₦10,000",
    text: "Top referrer wins it all — no runner-up prizes!",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 bg-[#011749] text-white text-center"
    >
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#0f172a] border border-nacoss text-left h-full shadow-md hover:shadow-nacoss hover:scale-[1.02] transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3 text-lg">
                  {step.icon} {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">{step.text}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="#gleam-form"
          className="inline-block text-nacoss border border-nacoss px-6 py-2 rounded-md hover:bg-nacoss hover:text-white transition"
        >
          Enter Now
        </a>
      </motion.div>
    </section>
  );
}
