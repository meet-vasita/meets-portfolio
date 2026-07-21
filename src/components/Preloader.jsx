import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Brief loading sequence shown once per page load: a counter ticks to
 * 100 then the whole overlay wipes away via a clip-path curtain.
 * Skips itself entirely for reduced-motion users.
 */
function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      onDone?.();
      return undefined;
    }

    const start = performance.now();
    const duration = 1200;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: 'inset(0 0 0% 0)' }}
          className="fixed inset-0 z-[200] bg-paper flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink mb-7"
          >
            Meet Vasita<span className="text-signal">.</span>
          </motion.div>
          <div className="w-52 h-px bg-line relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-signal"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-xs text-muted tracking-widest tabular-nums">
            {String(progress).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
