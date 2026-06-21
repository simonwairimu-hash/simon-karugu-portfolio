import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Database, 
  Cpu, 
  Boxes, 
  Mail, 
  FileText, 
  Terminal, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Layers,
  LineChart
} from 'lucide-react';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [activeTab, setActiveTab] = useState('sql'); // sql, dashboard, metrics

  // Animation variants for staggered fade-ins
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const dashboardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.3 },
    },
  };

  // 4 Statistics Cards
  const stats = [
    {
      id: 1,
      title: "3+ Years Experience",
      desc: "Delivering data-driven results & professional IT support.",
      icon: <Award className="w-6 h-6 text-amber-400" />,
      glowColor: "group-hover:border-amber-400/40",
      iconBg: "bg-amber-400/10",
    },
    {
      id: 2,
      title: "Excel & SQL Specialist",
      desc: "Structuring queries & building complex analytical pipelines.",
      icon: <Database className="w-6 h-6 text-sky-400" />,
      glowColor: "group-hover:border-sky-400/40",
      iconBg: "bg-sky-400/10",
    },
    {
      id: 3,
      title: "ICT Professional",
      desc: "Managing network environments, hardware, & system integrations.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      glowColor: "group-hover:border-emerald-400/40",
      iconBg: "bg-emerald-400/10",
    },
    {
      id: 4,
      title: "Inventory Systems Expert",
      desc: "Optimizing supply chain visibility & data tracking databases.",
      icon: <Boxes className="w-6 h-6 text-purple-400" />,
      glowColor: "group-hover:border-purple-400/40",
      iconBg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex flex-col justify-between overflow-hidden bg-portfolio-bg py-10 lg:py-16">
      
      {/* Restrained Backdrop Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/50 dark:from-zinc-900 via-portfolio-bg to-portfolio-bg pointer-events-none" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* HERO LEFT: Text & Branding */}
          <div className="col-span-1 lg:col-span-7 flex flex-col text-left items-start">


            {/* Name */}
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-portfolio-text mb-4 leading-none"
            >
              Simon <span className="bg-gradient-to-r from-portfolio-accent via-sky-400 to-[#0ea5e9] bg-clip-text text-transparent drop-shadow-sm">Karugu</span>
            </motion.h1>

            {/* Title / Role */}
            <motion.h2 
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-600 dark:text-slate-300 mb-5 tracking-wide text-left"
            >
              Logistics & Control Manager <span className="text-portfolio-accent font-light">|</span> Data & ICT Professional
            </motion.h2>

            {/* Headline / Elevator Pitch */}
            <motion.div 
              variants={itemVariants}
              className="text-sm sm:text-base text-portfolio-muted leading-relaxed mb-8 max-w-2xl font-light text-left space-y-4"
            >
              <p>
                I work at the intersection of logistics, data, and technology—tracking inventory flow, fixing reporting gaps, and keeping operational systems running reliably.
              </p>
              <p>
                My background in ICT helps me bridge the gap between operations and technology, whether that's troubleshooting infrastructure, improving processes, or supporting business systems.
              </p>
              <p>
                I also use SQL, data analysis, and React to turn operational data into practical tools and insights that help teams make better decisions.
              </p>
              <p className="font-semibold text-portfolio-text">
                When the systems don't exist, I build small ones myself.
              </p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-4 items-start justify-start w-full sm:w-auto"
            >
              <Link
                to="/resume"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-portfolio-bg rounded-xl overflow-hidden shadow-lg shadow-portfolio-accent/15 hover:shadow-portfolio-accent/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-accent to-[#0ea5e9] transition-all duration-300" />
                <span className="relative flex items-center gap-2.5 z-10">
                  <FileText className="w-4.5 h-4.5" />
                  View Resume
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-portfolio-text bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="w-4.5 h-4.5 text-portfolio-accent group-hover:scale-110 transition-transform duration-300" />
                  Contact Me
                </span>
              </Link>
            </motion.div>
          </div>

          {/* HERO RIGHT: Interactive Professional Profile Section (Data Analyst Visual Mockup) */}
          <motion.div 
            variants={dashboardVariants}
            className="col-span-1 lg:col-span-5 w-full relative"
          >
            {/* Outer Box Glow decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-portfolio-accent/20 to-indigo-500/20 rounded-2xl blur-xl opacity-40 -z-10" />

            {/* Interactive Dashboard Container */}
            <div className="panel-surface rounded-2xl shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="panel-header-surface px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-portfolio-muted font-mono tracking-tight flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-portfolio-accent" />
                  simon-analyst.db
                </div>
                <div className="w-8" /> {/* Spacer */}
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-100/50 dark:bg-slate-900/30 border-b border-theme px-3">
                <button 
                  onClick={() => setActiveTab('sql')}
                  className={`px-4 py-2.5 text-xs font-semibold font-mono border-b-2 transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === 'sql' 
                      ? 'border-portfolio-accent text-portfolio-accent' 
                      : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  query.sql
                </button>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2.5 text-xs font-semibold font-mono border-b-2 transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === 'dashboard' 
                      ? 'border-portfolio-accent text-portfolio-accent' 
                      : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
                  }`}
                >
                  <LineChart className="w-3.5 h-3.5" />
                  dashboard.py
                </button>
                <button 
                  onClick={() => setActiveTab('metrics')}
                  className={`px-4 py-2.5 text-xs font-semibold font-mono border-b-2 transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === 'metrics' 
                      ? 'border-portfolio-accent text-portfolio-accent' 
                      : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  sys_health.log
                </button>
              </div>

              {/* Console Body Content */}
              <div className="p-6 h-64 font-mono text-xs overflow-y-auto console-surface">
                {activeTab === 'sql' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-pink-600 dark:text-pink-400">SELECT</span> <span className="text-slate-800 dark:text-slate-200">item_name,</span> <span className="text-sky-650 dark:text-sky-400">SUM</span><span className="text-slate-800 dark:text-slate-200">(stock_qty)</span> <span className="text-pink-600 dark:text-pink-400">AS</span> <span className="text-emerald-600 dark:text-emerald-400">total_stock,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-600 dark:text-pink-400">CASE WHEN</span> <span className="text-sky-650 dark:text-sky-400">SUM</span><span className="text-slate-800 dark:text-slate-200">(stock_qty) &lt; 50</span> <span className="text-pink-600 dark:text-pink-400">THEN</span> <span className="text-orange-650 dark:text-orange-400">'Reorder'</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-600 dark:text-pink-400">ELSE</span> <span className="text-orange-650 dark:text-orange-400">'Optimal'</span> <span className="text-pink-600 dark:text-pink-400">END AS</span> <span className="text-emerald-600 dark:text-emerald-400">status</span>
                    </div>
                    <div>
                      <span className="text-pink-600 dark:text-pink-400">FROM</span> <span className="text-violet-600 dark:text-violet-400">inventory_db.warehouse_records</span>
                    </div>
                    <div>
                      <span className="text-pink-600 dark:text-pink-400">GROUP BY</span> <span className="text-slate-800 dark:text-slate-200">item_name</span>
                    </div>
                    <div>
                      <span className="text-pink-600 dark:text-pink-400">ORDER BY</span> <span className="text-slate-800 dark:text-slate-200">total_stock</span> <span className="text-pink-600 dark:text-pink-400">DESC</span>;
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-portfolio-accent flex items-center gap-1">
                      <span className="animate-pulse">❯</span>
                      <span className="text-slate-600 dark:text-slate-400">Query executed: 200 records parsed. (0.04s)</span>
                    </div>
                  </div>
                )}

                {activeTab === 'dashboard' && (
                  <div className="space-y-4 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Real-time Data Inventory Pipeline</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Live
                      </span>
                    </div>
                    
                    {/* SVG Animated Chart representation */}
                    <div className="w-full flex-grow flex items-end justify-between h-28 pt-4">
                      <div className="w-full h-full relative">
                        <svg className="w-full h-full" viewBox="0 0 300 100">
                          {/* Grid Lines */}
                          <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="80" x2="300" y2="80" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                          
                          {/* Data Path Line */}
                          <path
                            d="M 10 80 Q 50 65, 90 70 T 170 30 T 250 45 T 290 15"
                            fill="none"
                            stroke="#0284C7"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            className="dark:stroke-[#38bdf8] drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)]"
                          />
                          
                          {/* Graph Markers */}
                          <circle cx="170" cy="30" r="4.5" fill="currentColor" className="text-[#0284C7] dark:text-[#38bdf8] animate-ping" />
                          <circle cx="170" cy="30" r="3" fill="currentColor" className="text-white dark:text-slate-900" />
                          <circle cx="290" cy="15" r="3" fill="currentColor" className="text-[#0284C7] dark:text-[#38bdf8]" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="bg-slate-100 dark:bg-slate-800/40 p-2 rounded border border-slate-200 dark:border-slate-700/20">
                        <div className="text-slate-650 dark:text-slate-400 font-medium">Query Rate</div>
                        <div className="text-portfolio-accent font-bold mt-0.5">14.8/s</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800/40 p-2 rounded border border-slate-200 dark:border-slate-700/20">
                        <div className="text-slate-650 dark:text-slate-400 font-medium">Integrations</div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">Excel, SQL</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800/40 p-2 rounded border border-slate-200 dark:border-slate-700/20">
                        <div className="text-slate-650 dark:text-slate-400 font-medium">Accuracy</div>
                        <div className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">99.98%</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'metrics' && (
                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">// SYSTEM DIAGNOSTICS & HARDWARE STATUS</div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Network Host:</span>
                      <span className="text-slate-800 dark:text-slate-200">192.168.10.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Active Database Server:</span>
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">PostgreSQL (Cloud Hosted)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Excel Macro Engines:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Optimized VBScript/M-Code</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">System Availability:</span>
                      <span className="text-slate-800 dark:text-slate-200">99.9% Uptime SLA</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-slate-600 dark:text-slate-400">All local ICT routing systems operating normally.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Overlapping small info widget to add visual depth */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="absolute bottom-[-20px] right-[-15px] hidden sm:flex items-center gap-3 card-surface px-4 py-3 rounded-xl shadow-xl"
            >
              <div className="p-2 bg-portfolio-accent/15 rounded-lg">
                <TrendingUp className="w-5 h-5 text-portfolio-accent" />
              </div>
              <div>
                <div className="text-[10px] text-portfolio-muted font-semibold tracking-wider uppercase">Data insights</div>
                <div className="text-xs font-bold text-portfolio-text font-display">Dashboard Automated</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* STATISTICS CARDS SECTION */}
        <div className="mt-20 lg:mt-24">
          <div className="flex flex-col items-center text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-portfolio-text">
              Core Technical Strengths
            </h3>
            <div className="h-1 w-14 bg-portfolio-accent mt-3 rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="group relative card-surface rounded-2xl p-6 shadow-xl hover:shadow-portfolio-accent/5 hover:border-portfolio-accent/30 transition-all duration-300"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-portfolio-accent/0 group-hover:bg-portfolio-accent/[0.02] rounded-2xl transition-colors duration-300" />
                
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${stat.iconBg} p-3 rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                      {stat.icon}
                    </div>
                    <h4 className="font-display font-bold text-portfolio-text text-sm sm:text-base tracking-tight leading-tight group-hover:text-portfolio-accent transition-colors duration-200">
                      {stat.title}
                    </h4>
                  </div>
                  <p className="text-xs text-portfolio-muted leading-relaxed font-light">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Client Testimonials Carousel */}
      <Testimonials />
    </div>
  );
};

export default Home;
