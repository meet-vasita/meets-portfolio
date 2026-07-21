import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { SiPython, SiPandas, SiNumpy, SiScikitlearn, SiGit, SiJupyter } from 'react-icons/si';
import { FaDatabase, FaChartArea } from 'react-icons/fa';
import RevealText from './RevealText';
import ScrambleText from './ScrambleText';

const skills = [
  { name: 'Python', category: 'Programming', note: 'Primary language for scripting and modelling', level: 5, Icon: SiPython, brand: '#3776AB' },
  { name: 'Pandas', category: 'Data Analysis', note: 'Cleaning, joining, reshaping tabular data', level: 5, Icon: SiPandas, brand: '#150458' },
  { name: 'NumPy', category: 'Data Analysis', note: 'Array operations and numerical computing', level: 4, Icon: SiNumpy, brand: '#4D77CF' },
  { name: 'Matplotlib', category: 'Visualization', note: 'Plotting distributions and model results', level: 4, Icon: FaChartArea, brand: '#11557C' },
  { name: 'scikit-learn', category: 'Machine Learning', note: 'Regression, classification, pipelines', level: 4, Icon: SiScikitlearn, brand: '#F7931E' },
  { name: 'SQL', category: 'Database', note: 'Querying and structuring relational data', level: 4, Icon: FaDatabase, brand: '#4479A1' },
  { name: 'Git', category: 'Tooling', note: 'Version control and collaboration', level: 4, Icon: SiGit, brand: '#F05032' },
  { name: 'Jupyter', category: 'Tooling', note: 'Exploratory analysis and reporting', level: 5, Icon: SiJupyter, brand: '#F37626' },
];

const categories = ['All', 'Programming', 'Data Analysis', 'Machine Learning', 'Tooling'];

function Meter({ level }) {
  return (
    <div className="flex items-end gap-[3px] shrink-0" aria-hidden>
      {[1, 2, 3, 4, 5].map((bar) => (
        <motion.span
          key={bar}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: bar * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: `${8 + bar * 3}px`, transformOrigin: 'bottom' }}
          className={`w-[3px] rounded-sm ${bar <= level ? 'bg-signal' : 'bg-line'}`}
        />
      ))}
    </div>
  );
}

/**
 * A row whose scale/opacity/blur track its own position in the viewport:
 * it comes into sharp focus as it nears the center of the screen and
 * softens again as it moves away — a scroll-driven "spotlight" pass.
 */
function SkillRow({ skill }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.15'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [4, 0, 0, 4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const Icon = skill.Icon;

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, filter }}
      whileHover={{ x: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative border-b border-line py-6 px-2 md:px-4 transition-colors duration-300 hover:bg-surface"
    >
      <div className="flex items-center gap-5 md:gap-8">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-line bg-surface flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:border-ink"
        >
          <Icon size={22} style={{ color: skill.brand }} />
        </motion.div>

        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-muted w-28 md:w-36 shrink-0">
          {skill.category}
        </span>

        <span className="font-display text-2xl md:text-4xl text-ink flex-1 truncate transition-all duration-300 group-hover:text-signal group-hover:translate-x-2">
          {skill.name}
        </span>

        <span className="hidden lg:block text-sm text-muted max-w-xs text-right opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          {skill.note}
        </span>

        <Meter level={skill.level} />
      </div>
    </motion.div>
  );
}

function Skills() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              <span className="sr-only">Skills</span>
              <ScrambleText text="Skills" />
            </div>
            <RevealText
              as="h2"
              text="The toolkit"
              className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
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
                    layoutId="skillsActivePill"
                    className="absolute inset-0 bg-ink -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-line">
          {filtered.map((skill) => (
            <SkillRow key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
