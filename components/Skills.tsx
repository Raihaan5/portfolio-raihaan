import { stats, technologies } from "@/data/profile";

export default function Skills() {
  return (
    <section className="stats-panel">
      <div className="stat-grid">
        {stats.map(({ icon: Icon, value, label }) => (
          <div className="stat-card" key={value}>
            <Icon size={28} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="tech-panel" id="skills">
        <p>Principais Tecnologias</p>
        <div className="tech-icons">
          {technologies.map(({ icon: Icon, label, className }) => (
            <div className="tech-tile" key={label}><Icon className={className} /></div>
          ))}
        </div>
        <div className="neon-line" />
      </div>
    </section>
  );
}
