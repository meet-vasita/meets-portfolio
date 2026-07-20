import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaArrowUp } from 'react-icons/fa';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/meet-vasita', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/meet-vasita-9260aa327/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:meetvasita85@gmail.com', label: 'Email' },
  { icon: FaInstagram, href: 'https://instagram.com/meet___vasita', label: 'Instagram' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <h3 className="font-display text-3xl font-semibold text-ink mb-4">
              Meet Vasita<span className="text-signal">.</span>
            </h3>
            <p className="text-muted max-w-sm leading-relaxed">
              Python developer and data scientist turning messy datasets into
              models that hold up outside the notebook.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
                  className="text-ink hover:text-signal transition-colors duration-200 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-11 h-11 border border-line flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors duration-200"
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-line flex items-center justify-center text-sm text-muted">
          <span className="font-mono text-xs uppercase tracking-widest">Built with React &amp; Framer Motion</span>
        </div>
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? 'auto' : 'none' }}
        transition={{ duration: 0.25 }}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 w-12 h-12 bg-ink text-paper flex items-center justify-center hover:bg-signal transition-colors duration-200 z-50"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}

export default Footer;
