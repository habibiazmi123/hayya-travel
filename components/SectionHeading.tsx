export function SectionHeading({ eyebrow, title, description, align = "center" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  const alignment = align === "left" ? "text-left" : "mx-auto text-center";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-bold tracking-[0.18em] text-[#A67C2E]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-bold leading-tight text-pine md:text-5xl">{title}</h2>
      {description ? <p className="mt-3 text-[15px] leading-relaxed text-sage">{description}</p> : null}
    </div>
  );
}
