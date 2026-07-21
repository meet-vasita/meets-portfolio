import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Replaces the native cursor with a small dot and a lagging ring, both
 * using mix-blend-mode: difference so they invert whatever they sit on.
 * Desktop pointer devices only; no-ops on touch.
 */
function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || prefersReduced) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => { if (e.target.closest?.('a, button, input, textarea, [data-cursor-hover]')) setHovering(true); };
    const out = (e) => { if (e.target.closest?.('a, button, input, textarea, [data-cursor-hover]')) setHovering(false); };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 60 : pressed ? 20 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-ink mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', width: 7, height: 7 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-ink mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: ringSize, height: ringSize, opacity: hovering ? 0.9 : 0.45 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </>
  );
}

export default Cursor;
