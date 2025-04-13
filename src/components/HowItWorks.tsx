import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    text: "Follow Nacoss Unilorin on YouTube, Instagram, and X to qualify for the contest.",
  },
  {
    icon: <FaUserPlus className="text-nacoss text-2xl" />,
    title: "Submit Your Handles",
    text: "Fill the form with your name, email, and your social handles to join.",
  },
  {
    icon: <FaShareAlt className="text-nacoss text-2xl" />,
    title: "Share Your Link",
    text: "You’ll receive a custom referral link after signing up — send it to your friends.",
  },
  {
    icon: <FaChartLine className="text-nacoss text-2xl" />,
    title: "Track Referrals",
    text: "As your friends sign up through your link, your referral count increases.",
  },
  {
    icon: <FaTrophy className="text-nacoss text-2xl" />,
    title: "Win ₦10,000",
    text: "The top referrer at the end of the contest wins ₦10,000 — simple!",
  },
];

export default function HowItWorks() {
  const [totalReferrals, setTotalReferrals] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      const snap = await getCountFromServer(collection(db, "referrals"));
      setTotalReferrals(snap.data().count);
    };
    fetchTotal();
  }, []);
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 bg-[#011749] text-white text-center"
    >
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      {totalReferrals !== null && (
        <p className="text-nacoss mb-6 text-sm italic">
          {totalReferrals.toLocaleString()} people have joined the contest!
        </p>
      )}

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
          href="#join-form"
          className="inline-block text-nacoss border border-nacoss px-6 py-2 rounded-md hover:bg-nacoss hover:text-white transition"
        >
          Enter Now
        </a>
      </motion.div>
    </section>
  );
}
