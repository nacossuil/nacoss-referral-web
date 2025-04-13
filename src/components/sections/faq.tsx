import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "How do I prove I followed the accounts?",
    answer:
      "Simply enter your YouTube, Instagram, and X handles in the form. We'll manually verify the winner's follow status using the provided usernames — no screenshots needed.",
  },
  {
    question: "How are winners selected?",
    answer:
      "The winner is the person with the highest number of confirmed referrals before the contest ends. Only one winner — no runner-ups.",
  },
  {
    question: "Do I have to follow all three platforms?",
    answer:
      "Yes. To qualify, you must follow our YouTube, Instagram, and X accounts. We'll check that the winner follows all three.",
  },
  {
    question: "How do referrals get tracked?",
    answer:
      "Once you submit the form, you'll get a unique referral link. Every time someone joins through that link, it counts as a referral — tracked automatically.",
  },
  {
    question: "Can someone use my link multiple times?",
    answer:
      "No. Each person can only sign up once per referral. Multiple sign-ups with the same email won’t count.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 px-6 bg-[#0f172a] text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">FAQ</h2>

      <div className="max-w-2xl mx-auto">
        <Accordion type="multiple" className="space-y-4">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`q${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 text-sm leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
