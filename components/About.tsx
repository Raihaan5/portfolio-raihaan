import { aboutFacts } from "@/data/profile";

export default function About() {
  return (
    <section id="sobre" className="about-section site-section">
      <div className="about-art" aria-hidden="true">
        <div className="code-badge">&lt;/&gt;</div>
        <div className="crystal main-crystal" />
        <div className="crystal crystal-small crystal-left" />
        <div className="crystal crystal-small crystal-right" />
        <div className="laptop">
          <div className="code-lines" />
        </div>
        <div className="mug">R.</div>
        <div className="floating-rock rock-one" />
        <div className="floating-rock rock-two" />
        <div className="rock-floor" />
      </div>
      <div className="section-heading">
        <span>SOBRE MIM</span>
        <h2>Transformo ideias em<br /><em>soluções digitais incríveis.</em></h2>
        <p>Sou estudante do 4º ano do curso de Tecnologias de Informação na Universidade Católica de Moçambique, Faculdade de Economia e Gestão. Trabalho com desenvolvimento de sites, sistemas e aplicações web usando tecnologias modernas e as melhores práticas do mercado.</p>
        <div className="fact-row">
          {aboutFacts.map(([label, value]) => (
            <div className="fact-card" key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </div>
    </section>
  );
}
