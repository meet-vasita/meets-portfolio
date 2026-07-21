import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaDownload, FaGraduationCap, FaBriefcase, FaAward, FaCertificate, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Magnetic from './Magnetic';
import RevealText from './RevealText';
import ScrambleText from './ScrambleText';

function Resume() {
  const [activeTab, setActiveTab] = useState('timeline');
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.65'],
  });

  const educationData = [
    {
      id: 1,
      degree: "Bachelor's in Engineering, Information Technology",
      institution: 'Konkan Gyanpeeth College of Engineering',
      period: '2022 - 2025',
      location: 'Karjat',
      courses: ['Python', 'Machine Learning', 'Deep Learning', 'Data Structures', 'AI', 'Database Systems'],
      achievements: [],
    },
    {
      id: 2,
      degree: 'Diploma in Computer Engineering',
      institution: "Navjeevan Education Society's Polytechnic",
      period: '2019 - 2022',
      location: 'Bhandup, Mumbai',
      gpa: '80.17',
      courses: ['HTML', 'CSS', 'DBMS', 'OOPs', 'Java', 'Android'],
      achievements: ['Graduated with distinction (80.17%)', 'Final year project on Android development'],
    },
  ];

  const experienceData = [
    {
      id: 1,
      title: 'Python Developer Intern',
      company: 'Moryaa Infusion Pvt Ltd',
      period: 'Aug 2021 - Oct 2021',
      location: 'Kalyan',
      type: 'Internship',
      technologies: ['Python', 'Web Scraping', 'SQL'],
      responsibilities: [
        'Developed web scraping solutions using Python',
        'Worked with SQL databases for data storage and retrieval',
        'Collaborated with senior developers on various projects',
        'Gained hands-on experience in the software development lifecycle',
      ],
    },
  ];

  const certificationsData = [
    { id: 1, name: 'Data Science Job Simulation', issuer: 'Deloitte', date: 'Feb 2025', skills: ['Tableau', 'Data Engineering'] },
    { id: 2, name: 'Python For Data Science', issuer: 'IBM', date: 'May 2025', skills: ['Data Analysis', 'Data Science'] },
    { id: 3, name: 'Data Analysis With Python', issuer: 'IBM', date: 'May 2025', skills: ['Data Analysis'] },
    { id: 4, name: 'Python and Web Scraping', issuer: 'Moryaa Infusion Pvt Ltd', date: 'Aug 2021', skills: ['Python', 'SQL'] },
    { id: 5, name: 'SQL', issuer: 'IT Vedant', date: 'Feb 2025', skills: ['SQL'] },
  ];

  const achievementsData = [
    {
      id: 1,
      title: 'Open Source Contributor: python-binance',
      description: 'Contributed to the python-binance library, improving parts of the codebase.',
      year: 2025,
      link: 'https://github.com/sammchardy/python-binance',
    },
    {
      id: 2,
      title: 'Open Source Contributor: pip',
      description: "Made contributions to pip, Python's official package installer, enhancing documentation.",
      year: 2025,
      link: 'https://github.com/pypa/pip',
    },
    {
      id: 3,
      title: 'Open Source Contributor: pandas',
      description: 'Contributed to the pandas library, improving documentation.',
      year: 2025,
      link: 'https://github.com/pandas-dev/pandas',
    },
  ];

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: FaCalendarAlt },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'certifications', label: 'Certifications', icon: FaCertificate },
    { id: 'achievements', label: 'Achievements', icon: FaAward },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const Card = ({ children, className = '' }) => (
    <motion.div variants={itemVariants} whileHover={{ y: -3 }} className={`border border-line bg-surface p-6 transition-shadow duration-200 hover:shadow-[0_16px_40px_-24px_rgba(23,20,15,0.35)] ${className}`}>
      {children}
    </motion.div>
  );

  const Tag = ({ children }) => (
    <span className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide border border-line text-muted">
      {children}
    </span>
  );

  const renderTimeline = () => (
    <div className="relative" ref={timelineRef}>
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
      <motion.div
        className="absolute left-[7px] top-2 w-px bg-signal origin-top"
        style={{ scaleY: timelineProgress, height: 'calc(100% - 16px)' }}
      />
      <div className="space-y-8">
        {[...experienceData, ...educationData]
          .sort((a, b) => new Date(b.period.split(' - ')[0]) - new Date(a.period.split(' - ')[0]))
          .map((item) => (
            <motion.div key={`${item.id}-${item.company || item.institution}`} variants={itemVariants} className="relative flex items-start gap-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="relative z-10 w-[15px] h-[15px] rounded-full bg-signal border-4 border-paper mt-1.5"
              />
              <div className="flex-1 border border-line bg-surface p-6 hover:border-ink transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                  <h4 className="font-display text-xl text-ink">{item.title || item.degree}</h4>
                  <span className="font-mono text-xs text-signal">{item.period}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-muted mb-3">
                  <FaMapMarkerAlt className="text-amber" />
                  <span>{item.company || item.institution}</span>
                  {item.location && (<><span>&bull;</span><span>{item.location}</span></>)}
                </div>
                {item.gpa && <div className="text-sm text-muted mb-3">GPA: {item.gpa}</div>}
                {item.responsibilities && (
                  <ul className="text-muted text-sm space-y-1.5 mb-4">
                    {item.responsibilities.slice(0, 2).map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2"><span className="text-signal mt-1">&raquo;</span>{resp}</li>
                    ))}
                  </ul>
                )}
                {item.achievements?.length > 0 && (
                  <ul className="text-muted text-sm space-y-1.5 mb-4">
                    {item.achievements.slice(0, 2).map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2"><span className="text-amber mt-1">&#9733;</span>{a}</li>
                    ))}
                  </ul>
                )}
                {(item.technologies || item.courses) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(item.technologies || item.courses).map((t, idx) => <Tag key={idx}>{t}</Tag>)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="grid gap-6">
      {educationData.map((edu) => (
        <Card key={edu.id}>
          <div className="mb-5">
            <h3 className="font-display text-2xl text-ink mb-2">{edu.degree}</h3>
            <div className="flex items-center gap-2 text-muted mb-2">
              <FaGraduationCap className="text-signal" />
              <span>{edu.institution}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{edu.period}</span><span>&bull;</span><span>{edu.location}</span>
              {edu.gpa && (<><span>&bull;</span><span className="text-signal">GPA: {edu.gpa}</span></>)}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {edu.achievements.length > 0 && (
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Key achievements</h4>
                <ul className="space-y-2">
                  {edu.achievements.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-ink text-sm"><span className="text-amber mt-1">&#9733;</span>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Relevant courses</h4>
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((c, idx) => <Tag key={idx}>{c}</Tag>)}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {experienceData.map((exp) => (
        <Card key={exp.id}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-2">
            <div>
              <h3 className="font-display text-2xl text-ink mb-2">{exp.title}</h3>
              <div className="flex items-center gap-2 text-muted">
                <FaBriefcase className="text-signal" />
                <span>{exp.company}</span>
                <span className="px-2 py-0.5 font-mono text-[11px] border border-line">{exp.type}</span>
              </div>
            </div>
            <div className="text-sm text-muted">{exp.period} &bull; {exp.location}</div>
          </div>
          <div className="mb-6">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Key responsibilities</h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-ink"><span className="text-signal mt-1">&raquo;</span><span>{resp}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">Technologies used</h4>
            <div className="flex flex-wrap gap-2">{exp.technologies.map((t, idx) => <Tag key={idx}>{t}</Tag>)}</div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {certificationsData.map((cert) => (
        <Card key={cert.id}>
          <div className="mb-4">
            <FaCertificate className="text-2xl text-signal mb-3" />
            <h3 className="font-display text-lg text-ink mb-1">{cert.name}</h3>
            <p className="text-signal text-sm font-medium">{cert.issuer}</p>
          </div>
          <div className="text-sm text-muted mb-4">Issued {cert.date}</div>
          <div className="flex flex-wrap gap-2">{cert.skills.map((s, idx) => <Tag key={idx}>{s}</Tag>)}</div>
        </Card>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {achievementsData.map((a) => (
        <Card key={a.id} className="hover:border-ink transition-colors duration-200">
          <div className="flex items-start gap-5">
            <div className="w-11 h-11 border border-line flex items-center justify-center shrink-0">
              <FaAward className="text-signal text-lg" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                <h3 className="font-display text-xl text-ink">{a.title}</h3>
                <span className="font-mono text-xs text-signal">{a.year}</span>
              </div>
              <p className="text-muted">{a.description}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-signal hover:text-ink transition-colors">
                  View repository &rarr;
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline': return renderTimeline();
      case 'education': return renderEducation();
      case 'experience': return renderExperience();
      case 'certifications': return renderCertifications();
      case 'achievements': return renderAchievements();
      default: return renderTimeline();
    }
  };

  return (
    <section id="resume" className="py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              <span className="sr-only">Resume</span>
              <ScrambleText text="Resume" />
            </div>
            <RevealText
              as="h2"
              text="Professional journey"
              className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink"
            />
          </div>
          <Magnetic strength={0.3}>
            <a
              href="https://drive.google.com/file/d/1bt1uhKgaGpYF2sVy4RarR5Uqy_01y8dc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper font-medium hover:bg-signal transition-colors duration-200 w-fit"
            >
              <FaDownload /> Download resume
            </a>
          </Magnetic>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wide border transition-colors duration-200 ${
                activeTab === tab.id ? 'text-paper border-ink' : 'border-line text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="resumeActivePill"
                  className="absolute inset-0 bg-ink -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                />
              )}
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible" className="min-h-[400px]">
          {renderTabContent()}
        </motion.div>
      </div>
    </section>
  );
}

export default Resume;
