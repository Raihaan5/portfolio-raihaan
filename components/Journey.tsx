import { BriefcaseBusiness, Code2, Rocket, Workflow } from "lucide-react";
import { timeline } from "@/data/profile";

export default function Journey() {
  return (
    <section id="experiencia" className="journey-section site-section">
      <span>MINHA JORNADA</span>
      <h2>Experiência & Evolução</h2>
      <div className="timeline">
        {timeline.map(([year, text], index) => (
          <div className="timeline-item" key={year}>
            <div className="timeline-icon">
              {index === 0 ? <Code2 size={22} /> : index === 1 ? <BriefcaseBusiness size={22} /> : index === 2 ? <Rocket size={22} /> : <Workflow size={22} />}
            </div>
            <strong>{year}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
