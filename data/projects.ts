export interface PortfolioProject {
  tag: string;
  title: string;
  text: string;
  tech: string[];
  link: string;
  image?: string;
  variant: "dashboard" | "business" | "landing";
}

export const projects: PortfolioProject[] = [
  {
    tag: "Landing Page",
    title: "Landing Page de Produto",
    text: "Página de vendas responsiva com foco em conversão e apresentação profissional.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://criatividadebeira.netlify.app/landing.html",
    image: "/projects/criatividade.png",// Coloque a imagem em public/projects e use, por exemplo: image: "/projects/landing.png",
    variant: "landing",
  },
  {
    tag: "Landing Page",
    title: "Landing Page",
    text: "Página de apresentação responsiva com foco em apresentação profissional.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://ratixpay.co.mz/",
    image: "/projects/ratix.png",
    variant: "landing",
  },
  {
    tag: "Sistema",
    title: "MozPay",
    text: "Plataforma de pagamentos",
    tech: ["Next.js"],
    link: "#",
    image: "/projects/mozpay.png",
    variant: "business",
  },
];
