import { Spotlight } from "@/components/ui/Spotlight";
import { aarkLmsPublicUrl } from "@/lib/site";

const items = [
  {
    title: "Video lessons",
    body: "Intended as LMS products. Not streaming on this marketing site.",
    state: "Planned",
  },
  {
    title: "Study resources",
    body: "SKH’s public companions are indexed here; digital files follow LMS commerce.",
    state: "Index live · files via LMS",
  },
  {
    title: "Structured revision",
    body: "Review volumes exist on the SKH index. Timed digital practice is not claimed as live.",
    state: "Planned",
  },
  {
    title: "Learner accounts",
    body: "Production access is Aark Academy Learn360. The /portal route is a development preview.",
    state: "LMS · not this site",
  },
];

export function DigitalEnvironment() {
  return (
    <section id="environment" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-reveal>
          <div>
            <p className="eyebrow eyebrow-accent">Digital environment</p>
            <h2 className="mt-4 font-heading text-h2 font-semibold text-fg max-w-[16ch]">
              What exists. What is still being wired.
            </h2>
          </div>
          <p className="max-w-sm text-soft leading-relaxed">
            Honest labels only.{" "}
            <a href={aarkLmsPublicUrl} className="link-u text-fg" target="_blank" rel="noopener noreferrer">
              Aark Academy LMS
            </a>{" "}
            is the intended classroom once the catalogue is connected.
          </p>
        </div>
        <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {items.map((item, i) => (
            <li key={item.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
              <Spotlight className="h-full" style={{ ["--spot-radius" as string]: "0" }}>
                <article className="card-glow h-full bg-bg p-8 lg:p-10">
                  <p className="eyebrow">{item.state}</p>
                  <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">{item.title}</h3>
                  <p className="mt-3 text-soft leading-relaxed">{item.body}</p>
                </article>
              </Spotlight>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
