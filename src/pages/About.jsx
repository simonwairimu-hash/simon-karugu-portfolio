import { motion } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  Boxes, 
  Terminal, 
  Code2, 
  Wrench, 
  BarChart3, 
  GitBranch, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import Achievements from '../components/Achievements';

const About = () => {
  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  // Skill sets with ratings
  const skills = [
    { name: 'Data Analysis (SQL & Excel)', level: 95 },
    { name: 'Python (Data Pipelines & Automation)', level: 88 },
    { name: 'React & Front-end Development', level: 80 },
    { name: 'ICT Systems & Network Administration', level: 85 },
    { name: 'Inventory & Warehouse Systems Control', level: 90 },
  ];

  // Competency Cards
  const competencies = [
    {
      title: "Data Analytics & SQL",
      desc: "Writing complex queries, schema design, and structuring analytical views to translate raw records into business decisions.",
      icon: <Database className="w-5 h-5 text-sky-400" />,
      color: "border-sky-500/20 bg-sky-500/5 hover:border-sky-400/50"
    },
    {
      title: "ICT & IT Support",
      desc: "Configuring hardware architectures, setting up local networking systems, managing server health, and user support.",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-400/50"
    },
    {
      title: "Inventory Systems",
      desc: "Optimizing warehouse tracking data flow, establishing inventory verification metrics, and reducing audit overhead.",
      icon: <Boxes className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/5 hover:border-purple-400/50"
    },
    {
      title: "Automation (Python & React)",
      desc: "Writing scripts to eliminate manual reports, building dashboards with React, and integrating multi-tier systems.",
      icon: <Terminal className="w-5 h-5 text-pink-400" />,
      color: "border-pink-500/20 bg-pink-500/5 hover:border-pink-400/50"
    }
  ];

  // Vertical Timeline Items
  const timeline = [
    {
      period: "Current Focus",
      title: "Full-Stack Data Analyst & System Automation",
      subtitle: "Python, SQL, React & Dashboard Integration",
      desc: "Combining technical ICT systems administration with custom software engineering. Specializing in Python automation scripts to streamline reporting workflows, React-based frontend portals to display business intelligence metrics, and deep SQL database queries to expose system inefficiencies.",
      tags: ["Python", "SQL", "React", "Data Viz", "API Integration"],
      icon: <Code2 className="w-5 h-5 text-portfolio-accent" />
    },
    {
      period: "System Specialization",
      title: "Inventory & Warehouse Database Analyst",
      subtitle: "Data Pipelines & Logistics Optimization",
      desc: "Managed data tracking structures for inventory warehousing. Spearheaded database cleanups, audited supply line discrepancies, and introduced customized Excel reporting models that replaced manual logs and saved hours of daily verification efforts.",
      tags: ["SQL", "Advanced Excel", "Warehouse Databases", "Data Audits"],
      icon: <Boxes className="w-5 h-5 text-purple-400" />
    },
    {
      period: "Career Foundation",
      title: "ICT Support Professional & System Admin",
      subtitle: "Infrastructure Management & IT Support",
      desc: "Established solid foundations in IT support and systems engineering. Managed network environments, hardware provisioning, software deployment, and server maintenance. Resolved complex user requests while maintaining optimal infrastructure uptime.",
      tags: ["Networking", "Hardware Support", "OS Config", "Server Admin", "Troubleshooting"],
      icon: <Wrench className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-40 left-[-15%] w-[600px] h-[600px] rounded-full bg-portfolio-accent/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-15%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        {/* Title Section */}
        <div className="text-left mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>My Professional Journey</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-portfolio-text"
          >
            About <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Simon Karugu</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 64 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full"
          />
        </div>

        {/* Narrative & Skills Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24"
        >
          {/* Storyteller column */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-portfolio-muted leading-relaxed text-base font-light">
            <motion.p variants={itemVariants} className="text-lg font-medium text-portfolio-text">
              I am an ICT Specialist and Data Analyst who bridges the gap between infrastructure stability and business intelligence. 
            </motion.p>
            <motion.p variants={itemVariants}>
              My journey began in the field of <span className="text-portfolio-text font-semibold">ICT Support and Systems Administration</span>, diagnosing hardware, managing server networks, and ensuring operational availability. This technical foundation gave me a deep understanding of how databases operate, how data routes across networks, and where system bottlenecks manifest.
            </motion.p>
            <motion.p variants={itemVariants}>
              Recognizing that businesses often collect vast amounts of data without deriving actionable insights, I transitioned into <span className="text-portfolio-text font-semibold">Data Analytics and Inventory Management</span>. I began auditing warehousing systems, structuring clean SQL tables, and building dashboard monitors that translate messy logistical spreadsheets into clear metrics.
            </motion.p>
            <motion.p variants={itemVariants}>
              My core passion lies in <span className="text-portfolio-text font-semibold">Automation and Reporting</span>. Rather than manually copying spreadsheets, I write Python data scripts and custom SQL routines to handle extraction and validation automatically. To empower non-technical stakeholders, I construct front-end widgets using React, packaging statistics into beautiful, interactive, and functional dashboards.
            </motion.p>

            {/* Signature Element: Custom handwritten scratchpad note block */}
            <motion.div 
              variants={itemVariants}
              className="handwritten-note p-6 font-sans text-xs rotate-[-1deg] hover:rotate-[0.5deg] hover:scale-[1.02] transition-all duration-300 mt-8 max-w-lg select-none"
            >
              <div className="flex items-center gap-2 mb-2 font-mono font-bold text-amber-900 text-[10px] uppercase">
                <span>📝 Simon's Scratchpad</span>
              </div>
              <p className="font-medium text-stone-900 leading-relaxed">
                <strong>Recent Struggle:</strong> Synchronizing UI states across React router paths while keeping database payloads lean. Figured out that rather than over-fetching from Supabase, caching client-side queries inside local context works best. It's a bit of an ongoing refactor but getting cleaner.
              </p>
            </motion.div>
          </div>

          {/* Technical Skills Meter column */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 lg:col-span-5 card-surface rounded-2xl p-6 shadow-xl"
          >
            <h3 className="font-display font-bold text-portfolio-text text-lg mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-portfolio-accent" />
              Technical Competencies
            </h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{skill.name}</span>
                    <span className="text-portfolio-accent">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800/40">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-portfolio-accent to-sky-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Competency Cards Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-portfolio-text">
              Primary Areas of Expertise
            </h2>
            <div className="h-1 w-14 bg-portfolio-accent mt-3 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group border rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${comp.color}`}
              >
                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 rounded-xl w-fit mb-5 transition-transform duration-300 group-hover:scale-110">
                  {comp.icon}
                </div>
                <h4 className="font-display font-bold text-portfolio-text mb-2 text-base group-hover:text-portfolio-accent transition-colors duration-200">
                  {comp.title}
                </h4>
                <p className="text-xs text-portfolio-muted leading-relaxed font-light">
                  {comp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Highlights (Achievements) Section */}
      <Achievements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        {/* Chronological Timeline Section */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-portfolio-text">
              Professional Timeline & Evolution
            </h2>
            <div className="h-1 w-14 bg-portfolio-accent mt-3 rounded-full mx-auto" />
          </div>

          {/* Timeline container */}
          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Central timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800/80 -translate-x-1/2 pointer-events-none" />

            {/* Timeline nodes */}
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Anchor point circle indicator */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center -translate-x-1/2 z-10 shadow-lg shadow-black/40 group-hover:border-portfolio-accent/60">
                    {item.icon}
                  </div>

                  {/* Empty balance block for desktop layouts */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Block */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="card-surface rounded-2xl p-6 shadow-xl hover:border-portfolio-accent/20 transition-colors duration-300 relative group">
                      
                      {/* Period Badge */}
                      <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-portfolio-accent bg-portfolio-accent/10 px-3 py-1 rounded-full mb-3">
                        {item.period}
                      </span>
                      
                      {/* Job Title / Stage */}
                      <h4 className="font-display font-bold text-portfolio-text text-lg leading-tight mb-1 group-hover:text-portfolio-accent transition-colors duration-200">
                        {item.title}
                      </h4>
                      
                      {/* Context */}
                      <span className="block text-xs font-semibold text-portfolio-muted mb-4 font-mono">
                        {item.subtitle}
                      </span>
                      
                      {/* Narrative */}
                      <p className="text-xs text-portfolio-muted leading-relaxed font-light mb-5">
                        {item.desc}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
