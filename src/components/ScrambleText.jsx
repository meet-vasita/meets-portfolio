import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Renders text that starts as scrambled characters and decodes into the
 * real word the first time it scrolls into view. The true text is kept
 * in an aria-label / visually-hidden node so screen readers get it clean.
 */
function ScrambleText({ text, className = '', duration = 550 }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return undefined;
    hasRun.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return undefined;
    }

    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealCount = Math.floor(progress * text.length);
      let out = '';
      for (let i = 0; i < text.length; i += 1) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += i < revealCount ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, duration]);

  return (
    <span ref={ref} className={className} aria-hidden="true">
      {display}
    </span>
  );
}

export default ScrambleText;
