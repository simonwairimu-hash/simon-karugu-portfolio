-- ==========================================
-- SUPABASE DATABASE SCHEMA & SEED DATA
-- FOR SIMON KARUGU PORTFOLIO
-- ==========================================

-- 1. Create EXPERIENCE Table
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    icon_name TEXT NOT NULL DEFAULT 'Briefcase',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Select policy (Allow everyone to read)
CREATE POLICY "Allow public read access on experience" 
ON public.experience FOR SELECT 
TO public 
USING (true);

-- Insert/Update/Delete policies (Require authenticated admin role)
CREATE POLICY "Allow authenticated modifications on experience" 
ON public.experience FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- 2. Create PROJECTS Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    github_url TEXT NOT NULL DEFAULT '#',
    demo_url TEXT NOT NULL DEFAULT '#',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Select policy
CREATE POLICY "Allow public read access on projects" 
ON public.projects FOR SELECT 
TO public 
USING (true);

-- Mod policy
CREATE POLICY "Allow authenticated modifications on projects" 
ON public.projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- 3. Create CERTIFICATIONS Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_id TEXT,
    credential_url TEXT NOT NULL DEFAULT '#',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Select policy
CREATE POLICY "Allow public read access on certifications" 
ON public.certifications FOR SELECT 
TO public 
USING (true);

-- Mod policy
CREATE POLICY "Allow authenticated modifications on certifications" 
ON public.certifications FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- 4. Create SKILLS Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    level INT NOT NULL CHECK (level >= 0 AND level <= 100),
    category TEXT NOT NULL DEFAULT 'Core',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Select policy
CREATE POLICY "Allow public read access on skills" 
ON public.skills FOR SELECT 
TO public 
USING (true);

-- Mod policy
CREATE POLICY "Allow authenticated modifications on skills" 
ON public.skills FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- ==========================================
-- SEED DATA INITIALIZATION
-- ==========================================

-- Seed Experience
INSERT INTO public.experience (role, company, duration, description, highlights, tags, icon_name, sort_order)
VALUES 
(
  'Logistics Manager', 
  'Notos Kitchen', 
  'April 2026 - Present', 
  'Directing inventory systems and end-to-end supply chain logistics. Accountable for streamlining ingredient distribution, auditing stock discrepancies, and managing supplier communications.',
  ARRAY['Implemented database audits and SQL warehouse trackers, reducing inventory discrepancy rate by 22%.', 'Designed real-time Excel spreadsheets and automated dashboards to track supply runs, stock counts, and daily expenses.', 'Managed warehouse logistics and coordinate daily team actions, optimizing shipping efficiency.'],
  ARRAY['Inventory Systems', 'SQL Trackers', 'Logistics Flow', 'Supply Chain Control', 'Advanced Excel'],
  'Boxes',
  1
),
(
  'Sales Executive', 
  'SoftTech Web Development', 
  'March 2025 - December 2025', 
  'Led B2B client acquisition and sales cycles for customized digital platforms. Translated complex technical product specs (React sites, inventory portals, databases) to help business clients resolve infrastructure bottlenecks.',
  ARRAY['Exceeded sales targets by 115% through customized product demos demonstrating automated dashboard analytics.', 'Collaborated with dev teams to scoping web solutions, databases, and client requirements.', 'Constructed lead tracking systems in Excel using advanced formulas to organize sales funnels.'],
  ARRAY['B2B Sales', 'React Platforms', 'SaaS Scoping', 'Client Relations', 'Sales Dashboards'],
  'TrendingUp',
  2
),
(
  'IT Support Intern', 
  'NHIF Kenya', 
  'August 2024 - December 2024', 
  'Provided core hardware maintenance, operating system deployment, and networking support for internal environments. Monitored hardware setups and managed local software routing.',
  ARRAY['Resolved up to 20 helpdesk queries daily related to hardware support, printer setups, and LAN configurations.', 'Managed clean installations of operating systems and application software suite setups.', 'Performed system backups, user account setup, and physical hardware auditing.'],
  ARRAY['IT Support', 'Hardware Setup', 'Network Troubleshoot', 'Windows Server', 'Helpdesk Support'],
  'Cpu',
  3
)
ON CONFLICT DO NOTHING;


-- Seed Projects
INSERT INTO public.projects (title, type, description, technologies, github_url, demo_url, sort_order)
VALUES
(
  'Inventory Management System',
  'Software System',
  'A custom warehousing portal designed to eliminate tracking discrepancies. Built with a responsive React interface and Postgres database logic, featuring live stock monitors, alerts for low items, and audit reporting sheets.',
  ARRAY['React.js', 'PostgreSQL', 'Tailwind CSS', 'Node.js', 'Framer Motion'],
  '#',
  '#',
  1
),
(
  'Power BI Dashboard',
  'Business Intelligence',
  'An interactive management report to monitor supply chain fulfillment and sales conversions. Leveraged advanced DAX coding to calculate operational performance, target metrics, and custom filters.',
  ARRAY['Power BI', 'DAX', 'Excel Modeling', 'SQL Server'],
  '#',
  '#',
  2
),
(
  'SQL Data Analysis Project',
  'Database Analytics',
  'A comprehensive analysis of warehousing records. Created custom database queries, indexing, CTEs, and analytics scripts to resolve operational gaps and discover high-cost supply routes.',
  ARRAY['PostgreSQL', 'Database Design', 'Data Wrangling', 'CTEs'],
  '#',
  '#',
  3
),
(
  'Excel Reporting Automation',
  'Scripting & Automation',
  'Designed a macro tool that aggregates weekly raw logistical records and compiles reports automatically. Implemented Power Query routines and VBA script modules to save manual labor.',
  ARRAY['Excel VBA', 'Power Query', 'Automation', 'Macros'],
  '#',
  '#',
  4
)
ON CONFLICT DO NOTHING;


-- Seed Skills
INSERT INTO public.skills (name, level, category, sort_order)
VALUES
('Data Analysis (SQL & Excel)', 95, 'Core', 1),
('Python (Data Pipelines & Automation)', 88, 'Core', 2),
('React & Front-end Development', 80, 'Core', 3),
('ICT Systems & Network Administration', 85, 'Core', 4),
('Inventory & Warehouse Systems Control', 90, 'Core', 5)
ON CONFLICT DO NOTHING;


-- Seed Certifications
INSERT INTO public.certifications (title, issuer, issue_date, credential_id, credential_url, sort_order)
VALUES
('Google Data Analytics Professional Certificate', 'Google / Coursera', '2025', 'GDA-123456', '#', 1),
('Microsoft Certified: Power BI Data Analyst Associate', 'Microsoft', '2025', 'MS-BI-999', '#', 2),
('CCNA (Cisco Certified Network Associate)', 'Cisco', '2024', 'CCNA-8888', '#', 3)
ON CONFLICT DO NOTHING;


-- 5. Create TESTIMONIALS Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    company TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Select policy
CREATE POLICY "Allow public read access on testimonials" 
ON public.testimonials FOR SELECT 
TO public 
USING (true);

-- Mod policy
CREATE POLICY "Allow authenticated modifications on testimonials" 
ON public.testimonials FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Seed Testimonials
INSERT INTO public.testimonials (name, position, company, text, rating, sort_order)
VALUES
(
  'Florence Mbugua',
  'Supervisor',
  'NHIF Kenya',
  'Simon consistently demonstrated strong technical skills, professionalism, and a willingness to learn. His support greatly contributed to smooth daily operations.',
  5,
  1
),
(
  'Team Lead',
  'Operations Manager',
  'Notos Kitchen',
  'Simon''s attention to detail and ability to manage inventory systems improved reporting accuracy and operational efficiency.',
  5,
  2
),
(
  'Project Client',
  'Business Owner',
  'Freelance Project',
  'The dashboard and reporting solution Simon built provided valuable insights and helped streamline decision-making.',
  5,
  3
)
ON CONFLICT DO NOTHING;
