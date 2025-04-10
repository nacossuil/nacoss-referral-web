import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-20 px-6 bg-[#0f172a] text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl mx-auto">
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-left text-lg">
              How do I prove I followed the accounts?
            </AccordionTrigger>
            <AccordionContent className="text-white/70 text-sm">
              You must follow our YouTube, Instagram, and X accounts directly
              through the Gleam form. It will automatically track your
              subscriptions — no screenshots needed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger className="text-left text-lg">
              How are winners selected?
            </AccordionTrigger>
            <AccordionContent className="text-white/70 text-sm">
              The winner is the person with the highest number of valid
              referrals at the end of the contest. Only one person will win the
              ₦10,000 prize.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger className="text-left text-lg">
              Do I have to follow all three platforms?
            </AccordionTrigger>
            <AccordionContent className="text-white/70 text-sm">
              Yes. You must follow our YouTube, Instagram, and X pages to
              qualify. These actions are required inside the Gleam contest box.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
