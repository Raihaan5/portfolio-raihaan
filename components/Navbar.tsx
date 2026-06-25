import { Download, Moon, Sun } from "lucide-react";
import { navItems } from "@/data/profile";

export default function Navbar() {
  return (
    <nav className="topbar">
      <a href="#home" className="brand">Raihaan<span>.</span></a>
      <div className="navlinks">
        {navItems.map((item, index) => (
          <a key={item.label} href={item.href} className={index === 0 ? "active" : ""}>
            {item.label}
          </a>
        ))}
      </div>
      <div className="top-actions">
        <a href="/raihaan-abubacar-cv.html" className="download" download="Raihaan-Abubacar-CV.html">
          Download CV <Download size={14} />
        </a>
        <button aria-label="Alternar tema" className="theme-toggle" type="button">
          <Sun size={16} />
          <Moon size={15} />
        </button>
      </div>
    </nav>
  );
}
