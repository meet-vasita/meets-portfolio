import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

/** Smoothly scrolls to an element, a selector, or a Y offset (number). */
export function scrollToTarget(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : -84,
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      ...options,
    });
    return;
  }
  // Fallback if Lenis hasn't mounted yet (or reduced-motion disabled it)
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView?.({ behavior: 'smooth' });
  }
}

/**
 * Mounts a buttery, inertia-based smooth scroll across the whole page.
 * Renders nothing — it just wires up the RAF loop for its lifetime.
 * Respects prefers-reduced-motion by not engaging at all.
 */
function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });
    lenisInstance = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

export default SmoothScroll;
