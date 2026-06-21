import { motion } from 'framer-motion';
import { 
  useExperiences, 
  useProjects, 
  useSkills, 
  useCertifications 
} from '../hooks/useSupabase';
import { 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  Award, 
  Terminal, 
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const Resume = () => {
  // Fetch dynamic data from Supabase
  const { data: experiences, loading: loadingExp } = useExperiences();
  const { data: projects, loading: loadingProj } = useProjects();
  const { data: skills, loading: loadingSkills } = useSkills();
  const { data: certifications, loading: loadingCerts } = useCertifications();

  const handlePrint = () => {
    window.print();
  };

  // Safe loading check
  const isLoading = loadingExp || loadingProj || loadingSkills || loadingCerts;

  // Fallback / Static education entry
  const education = [
    {
      degree: "Diploma in Information Communication Technology (ICT)",
      school: "Kiambu National Polytechnic",
      period: "2021 - 2024",
      location: "Kiambu, Kenya",
      details: "Specialized in Computer Networking, Database Management Systems, and IT Operations. Developed custom inventory tracking models as part of coursework projects."
    }
  ];

  // Professional summary
  const summaryText = "Result-oriented Data Analyst and ICT Professional with over 3 years of hands-on experience bridging systems hardware administration, networking, and business intelligence pipelines. Proven capability in database design, inventory auditing controls, and developing automated script solutions in Python and React. Passionate about transforming operational records into interactive data dashboard systems that facilitate strategic decision-making.";

  return (
    <div className="relative min-h-screen bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      
      {/* Dynamic CSS Print Styles Override */}
      <style>{`
        @media print {
          /* Hide everything except the resume paper block */
          nav, footer, .no-print, .glow-bg {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .resume-container {
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            max-width: 100% !important;
          }
          .resume-header {
            border-bottom: 2px solid #e2e8f0 !important;
            padding-bottom: 1.5rem !important;
          }
          .resume-section-title {
            color: #0f172a !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
          .badge-print {
            border: 1px solid #cbd5e1 !important;
            background: #f8fafc !important;
            color: #0f172a !important;
          }
          a {
            text-decoration: underline !important;
            color: #000000 !important;
          }
        }
      `}</style>

      {/* Decorative ambient gradients (no-print) */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-portfolio-accent/5 blur-[120px] pointer-events-none glow-bg" />
      <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none glow-bg" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full z-10 relative">
        
        {/* HEADER CONTROLS (no-print) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 no-print">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recruiter Portal</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-portfolio-text">
              Curriculum <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Vitae</span>
            </h1>
            <p className="text-xs text-portfolio-muted font-mono mt-1">
              ATS-friendly and optimized for PDF download/print.
            </p>
          </div>
          
          <button
            onClick={handlePrint}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-portfolio-accent text-portfolio-bg font-bold rounded-xl hover:shadow-lg hover:shadow-portfolio-accent/10 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4.5 h-4.5" />
            Download PDF / Print
          </button>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3 no-print">
            <div className="w-8 h-8 border-4 border-portfolio-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-portfolio-muted font-mono">Fetching latest profile data from Supabase...</p>
          </div>
        ) : (
          /* RESUME PAPER SHEET CONTAINER */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="resume-container card-surface p-8 sm:p-12 rounded-2xl shadow-2xl print:shadow-none print:border-none print:bg-white print:p-0 print:text-black transition-all"
          >
            {/* Header: Name & Contact Details */}
            <div className="resume-header flex flex-col md:flex-row justify-between items-start gap-6 border-b border-theme pb-8 mb-8 print:border-slate-300">
              <div className="space-y-3">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-portfolio-text print:text-slate-900">
                    Simon Karugu
                  </h2>
                  <p className="text-sm font-semibold text-portfolio-accent print:text-slate-700 tracking-wider uppercase font-mono mt-1">
                    Data Analyst | ICT Professional
                  </p>
                </div>

                {/* Grid contact detail links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-portfolio-muted print:text-slate-700 font-mono">
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-portfolio-accent print:text-slate-500" />
                    wairimusimon551@gmail.com
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-portfolio-accent print:text-slate-500" />
                    +254 700 000 000
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-portfolio-accent print:text-slate-500" />
                    Nairobi, Kenya
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-portfolio-accent print:text-slate-500" />
                    simonkarugu.com
                  </span>
                </div>
              </div>

              {/* Dynamic QR Code Section */}
              <div className="flex items-center gap-4 bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl print:border-slate-300 print:bg-slate-50 shrink-0">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=0F172A&data=${encodeURIComponent(window.location.origin)}`} 
                  alt="Portfolio Link" 
                  className="w-16 h-16 border border-slate-700/50 p-0.5 rounded bg-white print:border-slate-400"
                />
                <div className="space-y-1 font-mono text-[9px] text-portfolio-muted print:text-slate-600 max-w-[100px] leading-tight">
                  <p className="font-bold text-portfolio-accent print:text-slate-700">SCAN TO VISIT</p>
                  <p>View interactive dashboard and project codes.</p>
                </div>
              </div>
            </div>

            {/* Resume Body */}
            <div className="space-y-8">
              
              {/* 1. PROFESSIONAL SUMMARY */}
              <section className="space-y-3">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-portfolio-muted print:text-slate-800 leading-relaxed font-light">
                  {summaryText}
                </p>
              </section>

              {/* 2. TECHNICAL SKILLS */}
              <section className="space-y-3">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Key Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="badge-print text-[10px] font-mono px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md shadow-sm"
                    >
                      {skill.name} ({skill.level}%)
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <span className="text-xs text-portfolio-muted print:text-slate-500 font-light">No skills records found.</span>
                  )}
                </div>
              </section>

              {/* 3. EXPERIENCE SECTION */}
              <section className="space-y-4">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Professional Experience
                </h3>
                
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-portfolio-text print:text-slate-900">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 print:text-slate-700">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-portfolio-accent print:text-slate-600 sm:text-right font-semibold">
                          {exp.duration}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-portfolio-muted print:text-slate-800 leading-relaxed font-light">
                        {exp.description}
                      </p>

                      <ul className="space-y-1.5 pl-4 list-disc marker:text-portfolio-accent print:marker:text-slate-600">
                        {exp.highlights.map((bullet, idx) => (
                          <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 print:text-slate-800 leading-relaxed font-light font-sans">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {experiences.length === 0 && (
                    <p className="text-xs text-portfolio-muted print:text-slate-500 font-light">No experience records found.</p>
                  )}
                </div>
              </section>

              {/* 4. PROJECTS SECTION */}
              <section className="space-y-4">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Featured Projects
                </h3>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl print:border-slate-200 bg-slate-50/30 dark:bg-slate-900/10">
                      <h4 className="text-sm font-bold text-portfolio-text print:text-slate-900 flex items-center justify-between">
                        {proj.title}
                        <span className="text-[9px] font-mono uppercase tracking-wider text-portfolio-accent bg-portfolio-accent/10 px-2 py-0.5 rounded-full print:border print:border-slate-300 print:bg-white print:text-slate-700">
                          {proj.type}
                        </span>
                      </h4>
                      <p className="text-xs text-portfolio-muted print:text-slate-800 leading-relaxed font-light mt-2 mb-3">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[8px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded print:border-slate-200 print:text-slate-600 print:bg-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-xs text-portfolio-muted print:text-slate-500 font-light col-span-2">No projects found.</p>
                  )}
                </div>
              </section>

              {/* 5. EDUCATION SECTION */}
              <section className="space-y-3">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 text-xs">
                      <div>
                        <h4 className="text-sm font-bold text-portfolio-text print:text-slate-900">
                          {edu.degree}
                        </h4>
                        <p className="font-semibold text-slate-600 dark:text-slate-300 print:text-slate-700 mt-0.5">
                          {edu.school}
                        </p>
                        <p className="text-portfolio-muted print:text-slate-800 leading-relaxed font-light mt-1.5">
                          {edu.details}
                        </p>
                      </div>
                      <div className="sm:text-right font-mono text-portfolio-accent print:text-slate-600 font-semibold shrink-0">
                        <div>{edu.period}</div>
                        <div className="text-[10px] font-normal text-slate-600 dark:text-slate-400 mt-0.5">{edu.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. CERTIFICATIONS */}
              <section className="space-y-3">
                <h3 className="resume-section-title text-sm font-bold uppercase tracking-wider text-portfolio-accent print:text-slate-900 border-b border-theme pb-1.5 print:border-slate-300">
                  Certifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-3 text-xs leading-relaxed">
                      <Award className="w-4 h-4 text-portfolio-accent print:text-slate-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-portfolio-text print:text-slate-900 leading-tight">
                          {cert.title}
                        </h4>
                        <p className="text-[10px] text-portfolio-muted print:text-slate-700 mt-0.5">
                          {cert.issuer} • {cert.issue_date}
                        </p>
                        {cert.credential_id && (
                          <p className="text-[9px] font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                            ID: {cert.credential_id}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {certifications.length === 0 && (
                    <p className="text-xs text-portfolio-muted print:text-slate-500 font-light col-span-2">No certifications found.</p>
                  )}
                </div>
              </section>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resume;
