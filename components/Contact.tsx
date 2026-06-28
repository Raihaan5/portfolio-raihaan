import { Mail, MapPin, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contacto" className="contact-section site-section">
      <div className="contact-copy">
        <span>VAMOS TRABALHAR JUNTOS</span>
        <h2>Tem um projeto em <em>mente?</em></h2>
        <p>Estou disponível para novos projetos e parcerias. Entre em contacto comigo agora mesmo!</p>
        <div className="contact-list">
          <a href="https://wa.me/258876619175" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> +258 87 661 9175</a>
          <a href="mailto:raihaanabubacar@gmail.com"><Mail size={17} /> raihaanabubacar@gmail.com</a>
          <span><MapPin size={17} /> Beira, Moçambique</span>
        </div>
        <div className="footer-socials">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <form className="contact-form">
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
        <div className="form-row">
          <input name="name" placeholder="Seu nome" aria-label="Seu nome" required />
          <input name="email" type="email" placeholder="Seu email" aria-label="Seu email" required />
          <input name="subject" placeholder="Assunto" aria-label="Assunto" required />
        </div>
        <textarea name="message" placeholder="Sua mensagem" aria-label="Sua mensagem" required />
        <p className="form-status" role="status" aria-live="polite" />
        <button type="submit">Enviar Mensagem <Send size={16} /></button>
      </form>
      <div className="mail-art lower" aria-hidden="true"><Mail size={120} /></div>
    </section>
  );
}
