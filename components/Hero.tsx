import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import { socialLinks } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="hero-section site-section">
      <div className="hero-copy">
        <span className="hello">👋 Olá, eu sou</span>
        <h1>Raihaan<br /><span>Abubacar</span></h1>
        <h2>Desenvolvedor Web & Sistemas</h2>
        <p>Construo experiências digitais modernas, rápidas e escaláveis que ajudam negócios a crescerem no mundo digital.</p>
        <div className="hero-buttons">
          <a href="#projetos" className="primary-btn">Ver Projetos <ArrowUpRight size={16} /></a>
          <a href="#contacto" className="ghost-btn">Falar Comigo <Send size={15} /></a>
        </div>
        <div className="social-row">
          <span>Siga-me</span>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="orbit orbit-c" />
        <div className="space-shape triangle-one" />
        <div className="space-shape triangle-two" />
        <div className="planet">
          <div className="continent c1" />
          <div className="continent c2" />
          <div className="continent c3" />
        </div>
        <div className="planet-base" />
        <div className="small-dot dot-one" />
        <div className="small-dot dot-two" />
      </div>

      <div className="scroll-cue"><span /><ArrowDown size={14} /></div>
      <div className="side-dots"><b /><i /><i /><i /><i /><i /></div>
    </section>
  );
}
