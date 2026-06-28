import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import MotionLayer from "@/components/MotionLayer";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="portfolio-shell">
      <MotionLayer />
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Services />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
