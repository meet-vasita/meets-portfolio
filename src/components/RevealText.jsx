import { motion } from 'framer-motion';

/**
 * Reveals text word by word with a left-to-right clip-path wipe plus a
 * focus-pull blur, rather than a simple fade/slide — reads as a curtain
 * opening on each word instead of the word sliding up.
 */
function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05,
  once = true,
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-[filter,clip-path] ${wordClassName}`}
          initial={{ opacity: 0, filter: 'blur(9px)', clipPath: 'inset(0 0 0 100%)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0%)' }}
          viewport={{ once, margin: '-80px' }}
          transition={{ duration: 0.65, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}

export default RevealText;
