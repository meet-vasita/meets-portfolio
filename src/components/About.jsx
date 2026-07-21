import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from './RevealText';
import ScrollColorText from './ScrollColorText';
import ScrambleText from './ScrambleText';

const stack = [
  { label: 'Core language', value: 'Python' },
  { label: 'Analysis', value: 'Pandas, NumPy' },
  { label: 'Modelling', value: 'scikit-learn' },
  { label: 'Status', value: 'Open to opportunities' },
];

function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.3'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={sectionRef} className="py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-signal mb-6"
        >
          <span className="sr-only">About</span>
          <ScrambleText text="About" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 relative pl-6">
            <motion.div
              className="absolute left-0 top-1 bottom-1 w-px bg-signal origin-top"
              style={{ scaleY: lineScale }}
            />

            <p className="font-display text-3xl md:text-4xl leading-[1.25] tracking-tight text-ink">
              <RevealText
                text="An Information Technology graduate who got hooked on the moment a spreadsheet of numbers turned into a model that actually"
              />{' '}
              <RevealText text="predicts something." wordClassName="text-signal" delay={0.1} />{' '}
              <RevealText text="Since then I've been building that skill on purpose." delay={0.15} />
            </p>

            <div className="mt-10 space-y-5 text-muted text-lg leading-relaxed max-w-2xl">
              <ScrollColorText
                text="During my B.E. I found a real interest in using data to solve practical problems: not just running notebooks, but shipping things that work end to end. I spend most of my time inside Pandas, NumPy, and scikit-learn, moving from a messy CSV to a model I can actually trust."
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                Outside of coursework, I like poking at new tools, running
                small ML experiments on my own datasets, and talking to
                other people who nerd out about data the way I do.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="border border-line divide-y divide-line">
              {stack.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between px-6 py-5 transition-colors duration-200 hover:bg-surface"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {row.label}
                  </span>
                  <span className="font-display text-lg text-ink text-right">
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
