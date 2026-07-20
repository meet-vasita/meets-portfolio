import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import projects from '../data/projects';

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

function Projects() {
  const [active, setActive] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);
  const filtered = projects.filter((p) => matchesCategory(p, active));

  return (
    <section id="projects" className="py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Selected Work</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              A few things I&rsquo;ve built
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setOpenIndex(0); }}
                className={`px-4 py-2 text-sm font-mono uppercase tracking-wide border transition-colors duration-200 ${
                  active === cat
                    ? 'bg-ink text-paper border-ink'
                    : 'border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line">
          {filtered.map((project, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border-b border-line"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center gap-6 py-8 text-left group"
                >
                  <span className="font-mono text-sm text-muted w-10 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl md:text-3xl text-ink flex-1 group-hover:text-signal transition-colors duration-200">
                    {project.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl text-ink shrink-0"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-12 gap-8 pb-10 pl-16">
                    <div className="md:col-span-5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 object-cover border border-line"
                      />
                    </div>
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <p className="text-muted leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 font-mono text-xs uppercase tracking-wide border border-line text-muted"
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
                            className="inline-flex items-center gap-2 font-medium text-ink hover:text-signal transition-colors duration-200"
                          >
                            <FaGithub /> View source <FaArrowRight className="text-sm" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/meet-vasita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors duration-200"
          >
            <FaGithub /> View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
