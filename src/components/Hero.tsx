// src/components/Hero.tsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center py-16 px-4">
      <motion.div
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 Win ₦10,000 in the Nacoss Unilorin YouTube Referral Contest!
      </motion.div>
      <motion.p
        className="text-lg text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Invite your friends. Get the most referrals. Claim the bag. 💰
      </motion.p>
      <motion.p
        className="text-sm text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Contest lasts 7 days – stay tuned for start date!
      </motion.p>
    </section>
  );
}
