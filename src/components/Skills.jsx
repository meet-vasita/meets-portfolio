import { motion } from 'framer-motion';
import { useState } from 'react';
import { SiPython, SiPandas, SiNumpy, SiScikitlearn, SiGit, SiJupyter } from 'react-icons/si';
import { FaDatabase, FaChartArea } from 'react-icons/fa';

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
        <span
          key={bar}
          className={`w-[3px] rounded-sm transition-colors duration-300 ${
            bar <= level ? 'bg-signal' : 'bg-line'
          }`}
          style={{ height: `${8 + bar * 3}px` }}
        />
      ))}
    </div>
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
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Skills</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              The toolkit
            </h2>
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
                className={`px-4 py-2 text-sm font-mono uppercase tracking-wide border transition-colors duration-200 ${
                  active === cat
                    ? 'bg-ink text-paper border-ink'
                    : 'border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="border-t border-line"
        >
          {filtered.map((skill) => {
            const Icon = skill.Icon;
            return (
              <motion.div
                key={skill.name}
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                className="group relative border-b border-line py-6 px-2 md:px-4 transition-colors duration-300 hover:bg-surface"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-line bg-surface flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:border-ink"
                  >
                    <Icon size={22} style={{ color: skill.brand }} />
                  </div>

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
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
