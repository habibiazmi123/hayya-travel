export function TrustCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#eee8dc] bg-white p-6 shadow-[0_8px_24px_rgba(20,45,36,0.05)]">
      <h3 className="font-display text-2xl font-bold text-pine">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-sage">{text}</p>
    </div>
  );
}
