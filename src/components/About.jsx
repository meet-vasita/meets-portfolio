import { motion } from 'framer-motion';

const stack = [
  { label: 'Core language', value: 'Python' },
  { label: 'Analysis', value: 'Pandas, NumPy' },
  { label: 'Modelling', value: 'scikit-learn' },
  { label: 'Status', value: 'Open to opportunities' },
];

function About() {
  return (
    <section id="about" className="py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-signal mb-6"
        >
          About
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <p className="font-display text-3xl md:text-4xl leading-[1.25] tracking-tight text-ink">
              An Information Technology graduate who got hooked on the moment
              a spreadsheet of numbers turned into a model that actually{' '}
              <span className="text-signal">predicts something.</span> Since
              then I&rsquo;ve been building that skill on purpose.
            </p>

            <div className="mt-10 space-y-5 text-muted text-lg leading-relaxed max-w-2xl">
              <p>
                During my B.E. I found a real interest in using data to solve
                practical problems: not just running notebooks, but
                shipping things that work end to end. I spend most of my time
                inside Pandas, NumPy, and scikit-learn, moving from a messy
                CSV to a model I can actually trust.
              </p>
              <p>
                Outside of coursework, I like poking at new tools, running
                small ML experiments on my own datasets, and talking to
                other people who nerd out about data the way I do.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="border border-line divide-y divide-line">
              {stack.map((row) => (
                <div key={row.label} className="flex items-center justify-between px-6 py-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {row.label}
                  </span>
                  <span className="font-display text-lg text-ink text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
