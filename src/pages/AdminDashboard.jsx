import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { 
  getExperiences, createExperience, updateExperience, deleteExperience,
  getProjects, createProject, updateProject, deleteProject,
  getCertifications, createCertification, updateCertification, deleteCertification,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial
} from '../services/supabaseService';
import { 
  LogOut, Plus, Edit2, Trash2, Database, Briefcase, Award, 
  Terminal, AlertCircle, CheckCircle2, X, RefreshCw, MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('experience'); // experience, projects, certifications
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // success, error

  // Main Data States
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = adding new item
  const [formErrors, setFormErrors] = useState({});

  // Individual Form Fields
  const [expForm, setExpForm] = useState({ role: '', company: '', duration: '', description: '', highlights: '', tags: '', icon_name: 'Briefcase', sort_order: 0 });
  const [projForm, setProjForm] = useState({ title: '', type: '', description: '', technologies: '', github_url: '#', demo_url: '#', sort_order: 0 });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issue_date: '', credential_id: '', credential_url: '#', sort_order: 0 });
  const [testiForm, setTestiForm] = useState({ name: '', position: '', company: '', text: '', rating: 5, sort_order: 0 });

  // Get active session
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  // Main Fetcher
  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [expData, projData, certData] = await Promise.all([
        getExperiences(),
        getProjects(),
        getCertifications()
      ]);
      setExperiences(expData);
      setProjects(projData);
      setCertifications(certData);
      
      try {
        const testiData = await getTestimonials();
        setTestimonials(testiData);
      } catch (testiErr) {
        console.error('Error fetching testimonials:', testiErr);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showToast('Failed to retrieve database records.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Helper to show brief toast warnings
  const showToast = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Sign out handler
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast(error.message, 'error');
    } else {
      navigate('/login', { replace: true });
    }
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormErrors({});
    
    // Reset inputs
    setExpForm({ role: '', company: '', duration: '', description: '', highlights: '', tags: '', icon_name: 'Briefcase', sort_order: experiences.length + 1 });
    setProjForm({ title: '', type: 'Software System', description: '', technologies: '', github_url: '#', demo_url: '#', sort_order: projects.length + 1 });
    setCertForm({ title: '', issuer: '', issue_date: '', credential_id: '', credential_url: '#', sort_order: certifications.length + 1 });
    setTestiForm({ name: '', position: '', company: '', text: '', rating: 5, sort_order: testimonials.length + 1 });
    
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormErrors({});

    if (activeTab === 'experience') {
      setExpForm({
        role: item.role,
        company: item.company,
        duration: item.duration,
        description: item.description,
        highlights: item.highlights.join('\n'), // newlines for text area
        tags: item.tags.join(', '), // comma separated
        icon_name: item.icon_name || 'Briefcase',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'projects') {
      setProjForm({
        title: item.title,
        type: item.type,
        description: item.description,
        technologies: item.technologies.join(', '),
        github_url: item.github_url || '#',
        demo_url: item.demo_url || '#',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'certifications') {
      setCertForm({
        title: item.title,
        issuer: item.issuer,
        issue_date: item.issue_date,
        credential_id: item.credential_id || '',
        credential_url: item.credential_url || '#',
        sort_order: item.sort_order || 0
      });
    } else if (activeTab === 'testimonials') {
      setTestiForm({
        name: item.name,
        position: item.position,
        company: item.company,
        text: item.text,
        rating: item.rating || 5,
        sort_order: item.sort_order || 0
      });
    }

    setIsModalOpen(true);
  };

  // Form Validation Handlers
  const validateForm = () => {
    const errors = {};

    if (activeTab === 'experience') {
      if (!expForm.role.trim()) errors.role = 'Role title is required';
      if (!expForm.company.trim()) errors.company = 'Company is required';
      if (!expForm.duration.trim()) errors.duration = 'Duration is required';
      if (!expForm.description.trim()) errors.description = 'Description is required';
    } else if (activeTab === 'projects') {
      if (!projForm.title.trim()) errors.title = 'Project title is required';
      if (!projForm.type.trim()) errors.type = 'Category type is required';
      if (!projForm.description.trim()) errors.description = 'Description is required';
    } else if (activeTab === 'certifications') {
      if (!certForm.title.trim()) errors.title = 'Certification title is required';
      if (!certForm.issuer.trim()) errors.issuer = 'Issuer is required';
      if (!certForm.issue_date.trim()) errors.issue_date = 'Issue date is required';
    } else if (activeTab === 'testimonials') {
      if (!testiForm.name.trim()) errors.name = 'Client name is required';
      if (!testiForm.position.trim()) errors.position = 'Position/Title is required';
      if (!testiForm.company.trim()) errors.company = 'Company is required';
      if (!testiForm.text.trim()) errors.text = 'Testimonial text is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      if (activeTab === 'experience') {
        const payload = {
          role: expForm.role.trim(),
          company: expForm.company.trim(),
          duration: expForm.duration.trim(),
          description: expForm.description.trim(),
          highlights: expForm.highlights.split('\n').map(h => h.trim()).filter(Boolean),
          tags: expForm.tags.split(',').map(t => t.trim()).filter(Boolean),
          icon_name: expForm.icon_name,
          sort_order: parseInt(expForm.sort_order) || 0
        };

        if (editingItem) {
          await updateExperience(editingItem.id, payload);
          showToast('Experience record updated successfully.');
        } else {
          await createExperience(payload);
          showToast('New experience record created successfully.');
        }
      } else if (activeTab === 'projects') {
        const payload = {
          title: projForm.title.trim(),
          type: projForm.type.trim(),
          description: projForm.description.trim(),
          technologies: projForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
          github_url: projForm.github_url.trim(),
          demo_url: projForm.demo_url.trim(),
          sort_order: parseInt(projForm.sort_order) || 0
        };

        if (editingItem) {
          await updateProject(editingItem.id, payload);
          showToast('Project record updated successfully.');
        } else {
          await createProject(payload);
          showToast('New project record created successfully.');
        }
      } else if (activeTab === 'certifications') {
        const payload = {
          title: certForm.title.trim(),
          issuer: certForm.issuer.trim(),
          issue_date: certForm.issue_date.trim(),
          credential_id: certForm.credential_id.trim() || null,
          credential_url: certForm.credential_url.trim(),
          sort_order: parseInt(certForm.sort_order) || 0
        };

        if (editingItem) {
          await updateCertification(editingItem.id, payload);
          showToast('Certification record updated successfully.');
        } else {
          await createCertification(payload);
          showToast('New certification record created successfully.');
        }
      } else if (activeTab === 'testimonials') {
        const payload = {
          name: testiForm.name.trim(),
          position: testiForm.position.trim(),
          company: testiForm.company.trim(),
          text: testiForm.text.trim(),
          rating: parseInt(testiForm.rating) || 5,
          sort_order: parseInt(testiForm.sort_order) || 0
        };

        if (editingItem) {
          await updateTestimonial(editingItem.id, payload);
          showToast('Testimonial record updated successfully.');
        } else {
          await createTestimonial(payload);
          showToast('New testimonial record created successfully.');
        }
      }

      setIsModalOpen(false);
      loadAllData();
    } catch (err) {
      console.error('CRUD submission failed:', err);
      showToast('Operation failed. Please verify configurations.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this item?')) return;

    setActionLoading(true);
    try {
      if (activeTab === 'experience') {
        await deleteExperience(id);
      } else if (activeTab === 'projects') {
        await deleteProject(id);
      } else if (activeTab === 'certifications') {
        await deleteCertification(id);
      } else if (activeTab === 'testimonials') {
        await deleteTestimonial(id);
      }
      showToast('Record deleted successfully.');
      loadAllData();
    } catch (err) {
      console.error('Deletion failed:', err);
      showToast('Failed to delete the selected record.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] bg-portfolio-bg py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/50 dark:from-zinc-950 via-portfolio-bg to-portfolio-bg pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto z-10 relative space-y-8">
        
        {/* HEADER PANEL */}
        <div className="bg-slate-800/20 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-extrabold text-portfolio-text">
              Admin Control Center
            </h1>
            <p className="text-xs text-portfolio-muted font-mono mt-1">
              Logged in as: <span className="text-portfolio-accent">{userEmail}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 text-slate-400 hover:text-portfolio-accent transition-colors"
              title="Refresh database records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-portfolio-text rounded-xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Status messages / Toast Alerts */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed ${
                message.type === 'error' 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
            >
              {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB CONTROLS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-1">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider font-display border-b-2 transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'border-portfolio-accent text-portfolio-accent'
                : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Experiences ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider font-display border-b-2 transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'border-portfolio-accent text-portfolio-accent'
                : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider font-display border-b-2 transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'certifications'
                ? 'border-portfolio-accent text-portfolio-accent'
                : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
            }`}
          >
            <Award className="w-4 h-4" />
            Certifications ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider font-display border-b-2 transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'testimonials'
                ? 'border-portfolio-accent text-portfolio-accent'
                : 'border-transparent text-portfolio-muted hover:text-portfolio-text'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Testimonials ({testimonials.length})
          </button>
        </div>

        {/* CREATE TRIGGER */}
        <div className="flex justify-end">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-3.5 bg-portfolio-accent text-portfolio-bg font-bold rounded-xl hover:shadow-lg hover:shadow-portfolio-accent/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>

        {/* MAIN PANEL CONTENT */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-portfolio-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-portfolio-muted font-mono">Loading data sets...</p>
          </div>
        ) : (
          <div className="bg-slate-800/20 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            
            {/* 1. EXPERIENCE TABLE VIEW */}
            {activeTab === 'experience' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800/60 text-left text-sm">
                  <thead className="bg-slate-900/60 font-mono text-xs text-portfolio-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Sort</th>
                      <th className="px-6 py-4">Role & Company</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Key Technologies</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {experiences.map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-800/10">
                        <td className="px-6 py-4 font-mono text-xs text-portfolio-accent">{exp.sort_order}</td>
                        <td className="px-6 py-4 font-semibold text-portfolio-text">
                          <div>{exp.role}</div>
                          <div className="text-xs text-portfolio-muted font-normal">{exp.company}</div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">{exp.duration}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {exp.tags.map(t => (
                              <span key={t} className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 text-slate-400 rounded">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(exp)}
                              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 rounded-xl transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-portfolio-text rounded-xl transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {experiences.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-portfolio-muted">No experience entries found in Supabase database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 2. PROJECTS TABLE VIEW */}
            {activeTab === 'projects' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800/60 text-left text-sm">
                  <thead className="bg-slate-900/60 font-mono text-xs text-portfolio-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Sort</th>
                      <th className="px-6 py-4">Title & Type</th>
                      <th className="px-6 py-4">Stack</th>
                      <th className="px-6 py-4">GitHub / Demo</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-slate-800/10">
                        <td className="px-6 py-4 font-mono text-xs text-portfolio-accent">{proj.sort_order}</td>
                        <td className="px-6 py-4 font-semibold text-portfolio-text">
                          <div>{proj.title}</div>
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-portfolio-accent bg-portfolio-accent/10 px-2 py-0.5 rounded-full">{proj.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {proj.technologies.map(t => (
                              <span key={t} className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 text-slate-400 rounded">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-400">
                          <div>GH: {proj.github_url}</div>
                          <div>Demo: {proj.demo_url}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(proj)}
                              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 rounded-xl transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(proj.id)}
                              className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-portfolio-text rounded-xl transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-portfolio-muted">No projects found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. CERTIFICATIONS TABLE VIEW */}
            {activeTab === 'certifications' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800/60 text-left text-sm">
                  <thead className="bg-slate-900/60 font-mono text-xs text-portfolio-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Sort</th>
                      <th className="px-6 py-4">Certification</th>
                      <th className="px-6 py-4">Issuer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {certifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-800/10">
                        <td className="px-6 py-4 font-mono text-xs text-portfolio-accent">{cert.sort_order}</td>
                        <td className="px-6 py-4 font-semibold text-portfolio-text">
                          <div>{cert.title}</div>
                          <div className="text-xs text-portfolio-muted font-normal font-mono">{cert.credential_id}</div>
                        </td>
                        <td className="px-6 py-4">{cert.issuer}</td>
                        <td className="px-6 py-4 font-mono text-xs">{cert.issue_date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(cert)}
                              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 rounded-xl transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(cert.id)}
                              className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-portfolio-text rounded-xl transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {certifications.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-portfolio-muted">No certifications found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. TESTIMONIALS TABLE VIEW */}
            {activeTab === 'testimonials' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800/60 text-left text-sm">
                  <thead className="bg-slate-900/60 font-mono text-xs text-portfolio-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Sort</th>
                      <th className="px-6 py-4">Client Name</th>
                      <th className="px-6 py-4">Position & Company</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {testimonials.map((testi) => (
                      <tr key={testi.id} className="hover:bg-slate-800/10">
                        <td className="px-6 py-4 font-mono text-xs text-portfolio-accent">{testi.sort_order}</td>
                        <td className="px-6 py-4 font-semibold text-portfolio-text">
                          {testi.name}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">
                          {testi.position} @ {testi.company}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-amber-400">
                          {testi.rating} ★
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(testi)}
                              className="p-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 rounded-xl transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(testi.id)}
                              className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-portfolio-text rounded-xl transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {testimonials.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-portfolio-muted">No testimonials found in database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>

      {/* CRUD DIALOG MODAL WINDOW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Form Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-6 space-y-6 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-portfolio-text bg-slate-800/40 rounded-lg"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div>
                <h3 className="text-lg font-display font-bold text-portfolio-text">
                  {editingItem ? 'Edit' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h3>
                <p className="text-xs text-portfolio-muted font-mono mt-0.5">
                  ID: {editingItem ? editingItem.id : 'New Record'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono text-slate-300">
                
                {/* 1. EXPERIENCE FIELD INPUTS */}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Role Title *</label>
                        <input
                          type="text"
                          value={expForm.role}
                          onChange={(e) => setExpForm({...expForm, role: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.role ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Logistics Manager"
                        />
                        {formErrors.role && <p className="text-[10px] text-rose-400">{formErrors.role}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Company Name *</label>
                        <input
                          type="text"
                          value={expForm.company}
                          onChange={(e) => setExpForm({...expForm, company: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.company ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Notos Kitchen"
                        />
                        {formErrors.company && <p className="text-[10px] text-rose-400">{formErrors.company}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Duration Range *</label>
                        <input
                          type="text"
                          value={expForm.duration}
                          onChange={(e) => setExpForm({...expForm, duration: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.duration ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="April 2026 - Present"
                        />
                        {formErrors.duration && <p className="text-[10px] text-rose-400">{formErrors.duration}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Icon Name</label>
                        <select
                          value={expForm.icon_name}
                          onChange={(e) => setExpForm({...expForm, icon_name: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        >
                          <option value="Briefcase">Briefcase</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Cpu">Cpu</option>
                          <option value="TrendingUp">TrendingUp</option>
                          <option value="Award">Award</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Sort Order</label>
                      <input
                        type="number"
                        value={expForm.sort_order}
                        onChange={(e) => setExpForm({...expForm, sort_order: e.target.value})}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Role Summary *</label>
                      <textarea
                        rows="3"
                        value={expForm.description}
                        onChange={(e) => setExpForm({...expForm, description: e.target.value})}
                        className={`w-full p-3 bg-slate-950 border ${formErrors.description ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                        placeholder="Provide a summary of this job role..."
                      />
                      {formErrors.description && <p className="text-[10px] text-rose-400">{formErrors.description}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Key Highlights / Accomplishments (One per line)</label>
                      <textarea
                        rows="4"
                        value={expForm.highlights}
                        onChange={(e) => setExpForm({...expForm, highlights: e.target.value})}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        placeholder="Integrated dynamic SQL database&#10;Saved 5 hours of manual checks"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Skills / Technologies (Comma-separated)</label>
                      <input
                        type="text"
                        value={expForm.tags}
                        onChange={(e) => setExpForm({...expForm, tags: e.target.value})}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        placeholder="SQL, React, advanced Excel"
                      />
                    </div>
                  </div>
                )}

                {/* 2. PROJECT FIELD INPUTS */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Project Title *</label>
                        <input
                          type="text"
                          value={projForm.title}
                          onChange={(e) => setProjForm({...projForm, title: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.title ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Inventory Portal"
                        />
                        {formErrors.title && <p className="text-[10px] text-rose-400">{formErrors.title}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Project Type *</label>
                        <input
                          type="text"
                          value={projForm.type}
                          onChange={(e) => setProjForm({...projForm, type: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.type ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Software System"
                        />
                        {formErrors.type && <p className="text-[10px] text-rose-400">{formErrors.type}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">GitHub Link</label>
                        <input
                          type="text"
                          value={projForm.github_url}
                          onChange={(e) => setProjForm({...projForm, github_url: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Live Demo Link</label>
                        <input
                          type="text"
                          value={projForm.demo_url}
                          onChange={(e) => setProjForm({...projForm, demo_url: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Technologies (Comma-separated)</label>
                        <input
                          type="text"
                          value={projForm.technologies}
                          onChange={(e) => setProjForm({...projForm, technologies: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                          placeholder="React.js, PostgreSQL, Power BI"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Sort Order</label>
                        <input
                          type="number"
                          value={projForm.sort_order}
                          onChange={(e) => setProjForm({...projForm, sort_order: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Project Description *</label>
                      <textarea
                        rows="4"
                        value={projForm.description}
                        onChange={(e) => setProjForm({...projForm, description: e.target.value})}
                        className={`w-full p-3 bg-slate-950 border ${formErrors.description ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                        placeholder="Provide details about the project scope..."
                      />
                      {formErrors.description && <p className="text-[10px] text-rose-400">{formErrors.description}</p>}
                    </div>
                  </div>
                )}

                {/* 3. CERTIFICATION FIELD INPUTS */}
                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Certification Name *</label>
                        <input
                          type="text"
                          value={certForm.title}
                          onChange={(e) => setCertForm({...certForm, title: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.title ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Google Data Analytics Professional"
                        />
                        {formErrors.title && <p className="text-[10px] text-rose-400">{formErrors.title}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Issuer Agency *</label>
                        <input
                          type="text"
                          value={certForm.issuer}
                          onChange={(e) => setCertForm({...certForm, issuer: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.issuer ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Google / Coursera"
                        />
                        {formErrors.issuer && <p className="text-[10px] text-rose-400">{formErrors.issuer}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Issue Date *</label>
                        <input
                          type="text"
                          value={certForm.issue_date}
                          onChange={(e) => setCertForm({...certForm, issue_date: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.issue_date ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="2025"
                        />
                        {formErrors.issue_date && <p className="text-[10px] text-rose-400">{formErrors.issue_date}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Credential ID</label>
                        <input
                          type="text"
                          value={certForm.credential_id}
                          onChange={(e) => setCertForm({...certForm, credential_id: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                          placeholder="GDA-123456"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Credential URL</label>
                        <input
                          type="text"
                          value={certForm.credential_url}
                          onChange={(e) => setCertForm({...certForm, credential_url: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Sort Order</label>
                        <input
                          type="number"
                          value={certForm.sort_order}
                          onChange={(e) => setCertForm({...certForm, sort_order: e.target.value})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. TESTIMONIAL FIELD INPUTS */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Client Name *</label>
                        <input
                          type="text"
                          value={testiForm.name}
                          onChange={(e) => setTestiForm({...testiForm, name: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.name ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Florence Mbugua"
                        />
                        {formErrors.name && <p className="text-[10px] text-rose-400">{formErrors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Position / Title *</label>
                        <input
                          type="text"
                          value={testiForm.position}
                          onChange={(e) => setTestiForm({...testiForm, position: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.position ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="Supervisor"
                        />
                        {formErrors.position && <p className="text-[10px] text-rose-400">{formErrors.position}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1 col-span-2">
                        <label className="font-semibold text-slate-400">Company Name *</label>
                        <input
                          type="text"
                          value={testiForm.company}
                          onChange={(e) => setTestiForm({...testiForm, company: e.target.value})}
                          className={`w-full p-3 bg-slate-950 border ${formErrors.company ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                          placeholder="NHIF Kenya"
                        />
                        {formErrors.company && <p className="text-[10px] text-rose-400">{formErrors.company}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-400">Rating (1-5)</label>
                        <select
                          value={testiForm.rating}
                          onChange={(e) => setTestiForm({...testiForm, rating: parseInt(e.target.value) || 5})}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Sort Order</label>
                      <input
                        type="number"
                        value={testiForm.sort_order}
                        onChange={(e) => setTestiForm({...testiForm, sort_order: e.target.value})}
                        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-portfolio-text focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-400">Testimonial Text *</label>
                      <textarea
                        rows="4"
                        value={testiForm.text}
                        onChange={(e) => setTestiForm({...testiForm, text: e.target.value})}
                        className={`w-full p-3 bg-slate-950 border ${formErrors.text ? 'border-rose-500' : 'border-slate-800'} rounded-xl text-portfolio-text focus:outline-none`}
                        placeholder="Type client review text..."
                      />
                      {formErrors.text && <p className="text-[10px] text-rose-400">{formErrors.text}</p>}
                    </div>
                  </div>
                )}

                {/* Submit controls */}
                <div className="pt-4 flex justify-end gap-3 font-sans">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3 bg-portfolio-accent text-portfolio-bg font-bold rounded-xl text-sm flex items-center gap-2"
                  >
                    {actionLoading ? (
                      <span className="w-4 h-4 border-2 border-portfolio-bg border-t-transparent rounded-full animate-spin" />
                    ) : editingItem ? 'Save Changes' : 'Create Record'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
