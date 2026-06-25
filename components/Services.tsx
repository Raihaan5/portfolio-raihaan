import { services } from "@/data/profile";

export default function Services() {
  return (
    <section id="servicos" className="services-section site-section">
      <span>O QUE EU FAÇO</span>
      <h2>Serviços que ofereço</h2>
      <div className="services-grid">
        {services.map(({ icon: Icon, title, text }, index) => (
          <article className={index === 0 ? "service-card feature" : "service-card"} key={`${title}-${index}`}>
            <Icon size={38} />
            <div><h3>{title}</h3><p>{text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
