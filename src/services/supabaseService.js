import { supabase } from '../lib/supabaseClient';

// ==========================================
// EXPERIENCE CRUD SERVICES
// ==========================================

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createExperience = async (experienceData) => {
  const { data, error } = await supabase
    .from('experience')
    .insert([experienceData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateExperience = async (id, experienceData) => {
  const { data, error } = await supabase
    .from('experience')
    .update(experienceData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from('experience')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// ==========================================
// PROJECTS CRUD SERVICES
// ==========================================

export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createProject = async (projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateProject = async (id, projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// ==========================================
// SKILLS CRUD SERVICES
// ==========================================

export const getSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createSkill = async (skillData) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([skillData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateSkill = async (id, skillData) => {
  const { data, error } = await supabase
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteSkill = async (id) => {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// ==========================================
// CERTIFICATIONS CRUD SERVICES
// ==========================================

export const getCertifications = async () => {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createCertification = async (certData) => {
  const { data, error } = await supabase
    .from('certifications')
    .insert([certData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateCertification = async (id, certData) => {
  const { data, error } = await supabase
    .from('certifications')
    .update(certData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteCertification = async (id) => {
  const { error } = await supabase
    .from('certifications')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};

// ==========================================
// TESTIMONIALS CRUD SERVICES
// ==========================================

export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createTestimonial = async (testiData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testiData])
    .select();
  if (error) throw error;
  return data[0];
};

export const updateTestimonial = async (id, testiData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testiData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

export const deleteTestimonial = async (id) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};
