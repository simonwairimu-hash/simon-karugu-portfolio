import { motion } from 'framer-motion';
import { Boxes, Cpu, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import ExperienceCard from '../components/ExperienceCard';

const Experience = () => {
  // Experience roles details matching Simon's narrative
  const experiences = [
    {
      role: "Logistics Manager",
      company: "Notos Kitchen",
      duration: "April 2026 - Present",
      description: "Directing inventory systems and end-to-end supply chain logistics. Accountable for streamlining ingredient distribution, auditing stock discrepancies, and managing supplier communications.",
      highlights: [
        "Implemented database audits and SQL warehouse trackers, reducing inventory discrepancy rate by 22%.",
        "Designed real-time Excel spreadsheets and automated dashboards to track supply runs, stock counts, and daily expenses.",
        "Managed warehouse logistics and coordinate daily team actions, optimizing shipping efficiency."
      ],
      tags: ["Inventory Systems", "SQL Trackers", "Logistics Flow", "Supply Chain Control", "Advanced Excel"],
      icon: <Boxes className="w-5 h-5" />
    },
    {
      role: "Sales Executive",
      company: "SoftTech Web Development",
      duration: "March 2025 - December 2025",
      description: "Led B2B client acquisition and sales cycles for customized digital platforms. Translated complex technical product specs (React sites, inventory portals, databases) to help business clients resolve infrastructure bottlenecks.",
      highlights: [
        "Exceeded sales targets by 115% through customized product demos demonstrating automated dashboard analytics.",
        "Collaborated with dev teams to scoping web solutions, databases, and client requirements.",
        "Constructed lead tracking systems in Excel using advanced formulas to organize sales funnels."
      ],
      tags: ["B2B Sales", "React Platforms", "SaaS Scoping", "Client Relations", "Sales Dashboards"],
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      role: "IT Support Intern",
      company: "NHIF Kenya",
      duration: "August 2024 - December 2024",
      description: "Provided core hardware maintenance, operating system deployment, and networking support for internal environments. Monitored hardware setups and managed local software routing.",
      highlights: [
        "Resolved up to 20 helpdesk queries daily related to hardware support, printer setups, and LAN configurations.",
        "Managed clean installations of operating systems and application software suite setups.",
        "Performed system backups, user account setup, and physical hardware auditing."
      ],
      tags: ["IT Support", "Hardware Setup", "Network Troubleshoot", "Windows Server", "Helpdesk Support"],
      icon: <Cpu className="w-5 h-5" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-portfolio-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full z-10 relative">
        {/* Title Header */}
        <div className="text-center md:text-left mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-portfolio-text"
          >
            Work <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Experience</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 64 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full mx-auto md:mx-0"
          />
        </div>

        {/* Timeline Path Structure */}
        <div className="relative pl-6 sm:pl-10">
          {/* Vertical Track Line */}
          <div className="absolute left-[13px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800/80 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Connecting Dot with Pulse effect on active index */}
                <div className="absolute left-[-24px] sm:left-[-32px] top-6 w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center -translate-x-1/2 z-10 transition-colors duration-300 group-hover:border-portfolio-accent/50 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-portfolio-accent group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Experience Card */}
                <ExperienceCard experience={exp} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center border-t border-slate-200 dark:border-slate-800/80 pt-10"
        >
          <p className="text-sm text-portfolio-muted mb-4 font-light">
            Want to learn more about my skills or schedule a conversation?
          </p>
          <motion.a 
            href="/contact"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-portfolio-accent hover:text-sky-600 dark:hover:text-sky-300 transition-colors duration-200"
          >
            Get in touch with me
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
