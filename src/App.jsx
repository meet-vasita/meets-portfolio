import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const { scrollYProgress } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Scroll progress signature */}
      <motion.div
        className="scroll-indicator fixed top-0 left-0 right-0 h-[2px] bg-signal z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="max-w-content mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); goTo('hero'); }}
            className="font-display text-xl font-semibold tracking-tight text-ink"
          >
            Meet Vasita
            <span className="text-signal">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); goTo(item.id); }}
                className="group relative text-sm font-mono uppercase tracking-wide text-ink/70 hover:text-ink transition-colors duration-200"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-signal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); goTo('contact'); }}
              className="text-sm font-medium px-5 py-2.5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
            >
              Let&rsquo;s talk
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-[6px]"
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-px bg-ink block"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3.5 : 0 }}
            />
            <motion.span
              className="w-6 h-px bg-ink block"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3.5 : 0 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-paper pt-20 md:hidden"
        >
          <nav className="flex flex-col px-8 pt-10 gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); goTo(item.id); }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="py-4 border-b border-line font-display text-3xl font-medium text-ink"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
