import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight, FaCheck } from 'react-icons/fa';
import Magnetic from './Magnetic';
import RevealText from './RevealText';
import ScrambleText from './ScrambleText';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    { icon: FaEnvelope, label: 'Email', value: 'meetvasita85@gmail.com', href: 'mailto:meetvasita85@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+91 8767363535', href: 'tel:+918767363535' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Ulhasnagar, Maharashtra', href: '#' },
  ];

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/meet-vasita' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/meet-vasita-9260aa327/' },
    { icon: FaEnvelope, label: 'Email', href: 'mailto:meetvasita85@gmail.com' },
  ];

  const inputClass =
    'w-full bg-transparent border-0 border-b border-line py-3 text-ink placeholder-muted/60 focus:outline-none focus:border-signal transition-colors duration-200';

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 border-t border-line overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
      >
        <div className="w-full h-full rounded-full bg-signal/5" />
      </motion.div>

      <div className="relative max-w-content mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
            <span className="sr-only">Contact</span>
            <ScrambleText text="Contact" />
          </div>
          <RevealText
            as="h2"
            text="Let's work together"
            className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink max-w-xl"
          />
          <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            I&rsquo;m always interested in new opportunities and interesting problems.
            Send a message and I&rsquo;ll get back to you within a day or two.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 space-y-10"
          >
            <div className="space-y-1">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="group flex items-center gap-4 py-4 border-b border-line"
                >
                  <method.icon className="text-signal shrink-0" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{method.label}</div>
                    <div className="text-ink group-hover:text-signal transition-colors duration-200">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Elsewhere</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Magnetic key={social.label} strength={0.45}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 border border-line flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors duration-200"
                    >
                      <social.icon />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-4 border border-line">
              <motion.span
                className="w-2 h-2 bg-signal shrink-0"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-sm text-ink">Currently available for work</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="relative border border-line bg-surface p-8 md:p-10">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-surface flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="inline-flex w-12 h-12 items-center justify-center border border-signal text-signal mb-4"
                    >
                      <FaCheck />
                    </motion.div>
                    <h4 className="font-display text-xl text-ink mb-1">Message sent</h4>
                    <p className="text-muted text-sm">Thanks for reaching out. I&rsquo;ll reply soon.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-muted">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your full name" required />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-muted">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-muted">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="What's this about?" required />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-muted">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className={`${inputClass} resize-none`} placeholder="Tell me about your project..." required />
                </div>
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper font-medium hover:bg-signal transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : (<>Send message <FaArrowRight className="text-sm" /></>)}
                  </button>
                </Magnetic>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
