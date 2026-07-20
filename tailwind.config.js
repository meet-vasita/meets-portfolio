/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F1EEE6',
        surface: '#FAF8F3',
        ink: '#17140F',
        muted: '#5B5648',
        line: 'rgba(23,20,15,0.13)',
        signal: '#1B5E46',
        'signal-deep': '#123F30',
        amber: '#C58A2E',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        content: '1240px',
      },
    },
  },
  plugins: [],
}
