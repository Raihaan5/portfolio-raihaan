import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const projectSlotCount = projects.length > 3 ? 3 : projects.length;
  const visibleProjectSlots = projects.slice(0, projectSlotCount);
  const showDesktopProjectControls = projects.length > 3;
  const showMobileProjectControls = projects.length > 1;
  const showProjectPagination = projects.length > 1;

  return (
    <section id="projetos" className="projects-section site-section">
      <div className="section-title-row">
        <div>
          <span>MEUS TRABALHOS</span>
          <h2>Projetos em <em>destaque</em></h2>
        </div>
        <a href="#contacto" className="outline-btn">Ver todos os projetos <ArrowUpRight size={16} /></a>
      </div>
      <div
        className={`project-carousel count-${projectSlotCount}${showDesktopProjectControls ? " show-desktop-controls" : ""}${showMobileProjectControls ? " show-mobile-controls" : ""}`}
      >
        {showProjectPagination && (
          <button aria-label="Projeto anterior" className="carousel-arrow left" type="button">‹</button>
        )}
        {visibleProjectSlots.map((project) => (
          <article className="project-card" key={project.title}>
            <div className={`project-shot ${project.variant}`}>
              <span>{project.tag}</span>
              {project.image ? (
                <img className="project-image" src={project.image} alt={project.title} />
              ) : (
                <img className="project-image" src="" alt="" hidden />
              )}
              <div className="fake-ui" hidden={Boolean(project.image)} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <div className="chips">{project.tech.map((item) => <b key={item}>{item}</b>)}</div>
            <a
              aria-label={`Abrir ${project.title}`}
              className="project-open-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight size={18} />
            </a>
          </article>
        ))}
        {showProjectPagination && (
          <button aria-label="Próximo projeto" className="carousel-arrow right" type="button">›</button>
        )}
      </div>
      {showProjectPagination && (
        <div className={`pagination${showDesktopProjectControls ? " show-desktop-controls" : ""}${showMobileProjectControls ? " show-mobile-controls" : ""}`}>
          {projects.map((project, index) => (
            <button
              aria-label={`Mostrar projeto ${index + 1}`}
              aria-current={index === 0}
              key={project.title}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
}
