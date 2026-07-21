/**
 * A faint, flickering grain texture over the whole page for tactile,
 * printed-paper feel — purely decorative and pointer-events: none.
 */
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] opacity-[0.05] mix-blend-multiply grain-anim"
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}

export default GrainOverlay;
