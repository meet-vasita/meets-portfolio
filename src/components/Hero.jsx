import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { SiPython } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import profileImg from '../assets/Profile1.png';
import Magnetic from './Magnetic';
import ScrambleText from './ScrambleText';

const skills = ['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Statistics', 'SQL'];
const tickerItems = [...skills, ...skills];

const headline = ['Turning raw', 'data into', 'decisions.'];

function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer-driven 3D tilt on the portrait
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  const handlePortraitMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(relX * 18);
    rawRotateX.set(relY * -18);
  };
  const handlePortraitLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <section id="hero" ref={sectionRef} className="relative pt-40 pb-24 overflow-hidden">
      <motion.div className="absolute inset-0 grid-texture" style={{ y: bgY }} aria-hidden />

      {/* drifting gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(27,94,70,0.55) 0%, transparent 70%)' }}
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-10 right-[-10%] w-[460px] h-[460px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(197,138,46,0.5) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative max-w-content mx-auto px-6 lg:px-10"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Eyebrow + headline */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <motion.span
                className="w-1.5 h-1.5 bg-signal"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="sr-only">Available for new opportunities</span>
              <ScrambleText text="Available for new opportunities" />
            </motion.div>

            <h1 className="font-display font-semibold text-[13vw] sm:text-7xl lg:text-8xl leading-[0.95] tracking-tightest text-ink">
              {headline.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${i === 2 ? 'text-signal' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 max-w-lg text-lg text-muted leading-relaxed"
            >
              I&rsquo;m Meet Vasita, a Python developer and data scientist who builds
              models and tools that make sense of messy, real-world data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.4}>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper font-medium hover:bg-signal transition-colors duration-200"
                >
                  View my work
                  <motion.span
                    aria-hidden
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    &rarr;
                  </motion.span>
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink/30 text-ink font-medium hover:border-ink transition-colors duration-200"
                >
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Portrait with floating elements + pointer tilt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={handlePortraitLeave}
              style={{ perspective: 800 }}
              className="relative mx-auto flex items-center justify-center w-full max-w-[320px] aspect-square"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* faint ring behind the portrait */}
                <motion.div
                  className="absolute w-[86%] h-[86%] rounded-full border border-line"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  aria-hidden
                />
                <div className="absolute w-full h-full rounded-full border border-line/50 grid-texture" aria-hidden />

                <motion.img
                  src={profileImg}
                  alt="Meet Vasita"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transform: 'translateZ(40px)' }}
                  className="relative z-10 w-[68%] h-[68%] rounded-full object-cover border-4 border-paper shadow-[0_25px_60px_-20px_rgba(23,20,15,0.4)]"
                />

                {/* floating chip: language */}
                <motion.div
                  style={{ transform: 'translateZ(60px)' }}
                  className="absolute top-2 left-0 md:-left-4 z-20 flex items-center gap-2 bg-surface border border-line px-3.5 py-2 shadow-[0_8px_24px_-8px_rgba(23,20,15,0.25)]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.9 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
                  }}
                >
                  <SiPython className="text-signal" size={14} />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-ink">Python</span>
                </motion.div>

                {/* floating chip: accuracy readout */}
                <motion.div
                  style={{ transform: 'translateZ(50px)' }}
                  className="absolute bottom-6 right-0 md:-right-6 z-20 bg-surface border border-line px-4 py-2.5 shadow-[0_8px_24px_-8px_rgba(23,20,15,0.25)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, 8, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 1.1 },
                    y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
                  }}
                >
                  <div className="font-display text-lg font-semibold text-ink leading-none">Data Scientist</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted mt-1"></div>
                </motion.div>

                {/* floating chip: github */}
                <motion.div
                  style={{ transform: 'translateZ(70px)' }}
                  className="absolute top-10 right-2 md:-right-3 z-20 w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(23,20,15,0.35)]"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.3 },
                    scale: { duration: 0.5, delay: 1.3 },
                    y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.3 },
                  }}
                >
                  <FaGithub size={15} />
                </motion.div>

                {/* floating chip: available */}
                <motion.div
                  style={{ transform: 'translateZ(45px)' }}
                  className="absolute bottom-2 left-0 md:-left-6 z-20 flex items-center gap-2 bg-ink text-paper px-3.5 py-2 shadow-[0_8px_24px_-8px_rgba(23,20,15,0.35)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, 7, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 1.0 },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.0 },
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Open to work</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker */}
      <div className="relative mt-20 border-y border-line py-4 overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              {item}
              <span className="text-amber">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
