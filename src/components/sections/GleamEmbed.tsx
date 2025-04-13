export default function GleamEmbed() {
  return (
    <div
      id="gleam-form"
      className="min-h-screenn w-full py-20 px-6 flex flex-col justify-center items-center bg-lightBg"
    >
      <h2 className="text-3xl font-bold mb-12">Referral</h2>
      <iframe
        src="https://gleam.io/GkssF/nacoss-referral-contest"
        // width="100%"
        // height="1050"
        className="h-[600px] w-full border-none"
        frameBorder="0"
        title="Referral Contest"
      ></iframe>
    </div>
  );
}
