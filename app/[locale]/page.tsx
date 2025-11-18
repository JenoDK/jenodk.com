import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import StravaStats from '@/components/StravaStats';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <StravaStats />
      <Contact />
    </>
  );
}

