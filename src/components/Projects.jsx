import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaArrowRight, FaUpRightFromSquare } from 'react-icons/fa6';
import projects from '../data/projects';
import Magnetic from './Magnetic';
import RevealText from './RevealText';
import ScrambleText from './ScrambleText';

const categories = ['All', 'Machine Learning', 'Web Development', 'Data Analysis'];

function matchesCategory(project, category) {
  if (category === 'All') return true;
  const tech = project.technologies.map((t) => t.toLowerCase());
  if (category === 'Machine Learning') {
    return tech.some((t) => ['deep learning', 'xgboost', 'scikit-learn'].includes(t));
  }
  if (category === 'Web Development') {
    return tech.some((t) => ['react', 'nodejs', 'solidity'].includes(t));
  }
  if (category === 'Data Analysis') {
    return tech.some((t) => ['numpy', 'pandas'].includes(t));
  }
  return true;
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group shrink-0 w-[82vw] sm:w-[56vw] md:w-[38vw] lg:w-[30vw] border border-line bg-surface flex flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-[4/3] border-b border-line">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
        />
        <span className="absolute top-4 left-4 font-mono text-xs text-paper bg-ink/80 px-2 py-1">
          {String(index + 1).padStart(2, '0')}
        </span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-paper text-ink flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(23,20,15,0.4)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaUpRightFromSquare />
          </a>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide border border-line text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-signal transition-colors duration-200"
            >
              <FaGithub /> View source <FaArrowRight className="text-xs" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const [active, setActive] = useState('All');
  const filtered = projects.filter((p) => matchesCategory(p, active));

  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setDistance(Math.max(trackWidth - viewportWidth, 0));
      }
    }
    measure();
    const id = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measure);
    };
  }, [filtered.length]);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const pinHeight = Math.max(filtered.length * 65, 140);

  return (
    <section id="projects" className="border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10 pt-28 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              <span className="sr-only">Selected Work</span>
              <ScrambleText text="Selected Work" />
            </div>
            <RevealText
              as="h2"
              text="A few things I've built"
              className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink"
            />
            <p className="mt-4 text-sm text-muted font-mono uppercase tracking-wide hidden md:block">
              Scroll to explore &rarr;
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-4 py-2 text-sm font-mono uppercase tracking-wide border transition-colors duration-200 ${
                  active === cat
                    ? 'text-paper border-ink'
                    : 'border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="projectsActivePill"
                    className="absolute inset-0 bg-ink -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned horizontal-scroll gallery */}
      <div ref={pinRef} style={{ height: `${pinHeight}vh` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-6 lg:pl-10 pr-[15vw]"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-10 pt-10 pb-28 text-center">
        <Magnetic strength={0.3}>
          <a
            href="https://github.com/meet-vasita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors duration-200"
          >
            <FaGithub /> View all projects on GitHub
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

export default Projects;
