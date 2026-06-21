import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  // Story-driven projects data matching Simon's portfolio narrative
  const projectList = [
    {
      title: "Inventory Management System",
      type: "Flagship Software System",
      description: "A custom warehousing portal designed to eliminate tracking discrepancies. Built with a responsive React interface and Postgres database logic.",
      technologies: ["React.js", "PostgreSQL", "Tailwind CSS", "Node.js", "Framer Motion"],
      githubUrl: "https://github.com/simonwairimu-hash",
      demoUrl: "#",
      story: {
        problem: "Local warehouses running physical inventory checkups on paper logs, leading to stock discrepancies over 10% and hours wasted daily on double-entry checks.",
        whatIDid: "Designed a lightweight React client communicating with a PostgreSQL database, utilizing automated alerts when stock levels cross minimum safety margins.",
        challenge: "Handling concurrent updates. If two staff updated quantities simultaneously, it resulted in database dirty writes. Solved this by setting up Postgres row-level locks (SELECT FOR UPDATE) and transaction scopes.",
        outcome: "Discrepancy rates dropped to less than 1% in two weeks, saving 3 hours of daily cross-referencing efforts."
      }
    },
    {
      title: "Power BI Sales Dashboard",
      type: "Business Intelligence",
      description: "An interactive management report to monitor supply chain fulfillment and sales conversions.",
      technologies: ["Power BI", "DAX", "Excel Modeling", "SQL Server"],
      githubUrl: "#",
      demoUrl: "#",
      story: {
        problem: "Sales pipelines and stock fulfillment routes tracked in isolated sheets, meaning managers had no real-time way to inspect performance across departments.",
        whatIDid: "Aggregated the data into a unified star-schema model, building dynamic filters with Power BI and writing advanced DAX metrics.",
        challenge: "Dealing with inconsistent date formats and trailing text fields from external CSV dumps. Resolved this by building cleaning operations using Power Query M-code.",
        outcome: "Integrated pipeline metrics into a unified dashboard, enabling directors to track company performance trends with one-click filters."
      }
    },
    {
      title: "SQL Data Analysis Project",
      type: "Database Analytics",
      description: "A comprehensive analysis of warehousing records to resolve operational bottlenecks.",
      technologies: ["PostgreSQL", "Database Design", "Data Wrangling", "CTEs"],
      githubUrl: "#",
      demoUrl: "#",
      story: {
        problem: "Supply chain logs showing unexplained overhead costs, but database logs were too large to query without causing server locks.",
        whatIDid: "Structured complex analytical SQL scripts utilizing CTEs, window functions, and multi-table joins to pinpoint routing bottlenecks.",
        challenge: "Initial scripts took minutes to run. Optimised them by adding composite indexes on foreign keys and refactoring nested subqueries into temporary staging tables.",
        outcome: "Identified high-cost redundant routes, exposing inefficiencies that cost the organization over 15% in supply chain leakages."
      }
    },
    {
      title: "Excel Reporting Automation",
      type: "Scripting & Automation",
      description: "Macro engine automating weekly logistical report generation from raw spreadsheets.",
      technologies: ["Excel VBA", "Power Query", "Automation", "Macros"],
      githubUrl: "#",
      demoUrl: "#",
      story: {
        problem: "Every Friday, logistics managers spent hours manually copying stock records, verifying rows, and compiling PDF sheets.",
        whatIDid: "Developed an Excel-based macro automation engine using VBA scripts and integrated Power Query scripts to fetch local logs.",
        challenge: "Different Excel versions across employee machines caused library referencing errors. Rebuilt the macro logic to run using late-bound object declarations.",
        outcome: "Replaced hours of repetitive manual typing with a single-button macro click that generates and emails reports instantly."
      }
    }
  ];

  return (
    <div className="relative min-h-screen bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      {/* Restrained background gradients */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-portfolio-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        {/* Title Header (Left Aligned for human-feel) */}
        <div className="text-left mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase of Work</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-portfolio-text"
          >
            Featured <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Projects</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 64 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full"
          />
        </div>

        {/* Asymmetrical Layout: Flagship project full-width, others in 2-column grid */}
        <div className="space-y-12">
          {/* Flagship Project (index 0) */}
          <div className="w-full">
            <ProjectCard project={projectList[0]} index={0} isFeatured={true} />
          </div>
          
          {/* Grid for other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectList.slice(1).map((project, idx) => (
              <ProjectCard key={idx + 1} project={project} index={idx + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
