import { useState, useEffect, useCallback } from 'react';
import { 
  getExperiences, 
  getProjects, 
  getSkills, 
  getCertifications,
  getTestimonials
} from '../services/supabaseService';

// ==========================================
// 1. Hook to load EXPERIENCE Data
// ==========================================
export const useExperiences = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getExperiences();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return { data, loading, error, refetch: fetchExperiences };
};

// ==========================================
// 2. Hook to load PROJECTS Data
// ==========================================
export const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { data, loading, error, refetch: fetchProjects };
};

// ==========================================
// 3. Hook to load SKILLS Data
// ==========================================
export const useSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSkills();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { data, loading, error, refetch: fetchSkills };
};

// ==========================================
// 4. Hook to load CERTIFICATIONS Data
// ==========================================
export const useCertifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCertifications();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching certifications:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  return { data, loading, error, refetch: fetchCertifications };
};

// ==========================================
// 5. Hook to load TESTIMONIALS Data
// ==========================================
export const useTestimonials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTestimonials();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { data, loading, error, refetch: fetchTestimonials };
};
