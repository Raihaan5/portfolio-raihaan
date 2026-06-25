import {
  BriefcaseBusiness,
  Code2,
  Headphones,
  Rocket,
  Users,
  Workflow,
} from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhp,
  FaPython,
  FaReact,
  FaWhatsapp,
} from "react-icons/fa";
import { SiJavascript, SiNextdotjs, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

export const navItems = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raihaan-abubacar",
    icon: FaLinkedinIn,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/258876619175",
    icon: FaWhatsapp,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/raihaan_abubacar",
    icon: FaInstagram,
  },
];

export const stats = [
  { icon: BriefcaseBusiness, value: "20+", label: "Projetos\nConcluídos" },
  { icon: Code2, value: "10+", label: "Tecnologias\nDominadas" },
  { icon: Users, value: "15+", label: "Clientes\nSatisfeitos" },
  { icon: Rocket, value: "24/7", label: "Dedicação &\nSuporte" },
];

export const technologies = [
  { label: "React", icon: FaReact, className: "text-cyan-300" },
  { label: "Next", icon: SiNextdotjs, className: "next-tech-icon" },
  { label: "TS", icon: SiTypescript, className: "text-sky-400" },
  { label: "JS", icon: SiJavascript, className: "text-yellow-300" },
  { label: "PHP", icon: FaPhp, className: "text-indigo-300" },
  { label: "Python", icon: FaPython, className: "text-yellow-300" },
  { label: "C#", icon: TbBrandCSharp, className: "text-violet-300" },
];

export const aboutFacts = [
  ["Formação", "4º Ano TI"],
  ["Localização", "Beira, Moçambique"],
  ["Disponibilidade", "Freelancer"],
  ["Email", "raihaanabubacar@gmail.com"],
];

export const services = [
  { icon: Workflow, title: "Sistemas Web", text: "Sistemas personalizados para gestão, vendas, pedidos, reservas e dashboards." },
  { icon: Rocket, title: "Landing Pages", text: "Páginas de vendas e captura de leads com foco em conversão." },
  { icon: Headphones, title: "Manutenção", text: "Correção de erros, melhorias, atualizações e suporte técnico contínuo." },
];

export const timeline = [
  ["2023", "Início no desenvolvimento web com HTML, CSS e JavaScript."],
  ["2024", "Criação de sites e projetos acadêmicos com PHP, Java e MySQL."],
  ["2025", "Desenvolvimento de aplicações com React, Next.js e Python."],
  ["2026", "Finalista em Tecnologias de Informação e desenvolvimento de sistemas completos."],
];
