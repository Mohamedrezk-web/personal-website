// ── Shared embedded types ─────────────────────────────────────────────────

export interface SocialLink   { icon: string; url: string; label: string; }
export interface SkillSatellite { name: string; percentage: number; }
export interface HeroBadge    { icon: string; label: string; }
export interface StatCard     { value: string; label: string; }
export interface CategoryMeta { icon: string; color: string; glow: string; bg: string; border: string; }
export interface ContactInfoItem { icon: string; label: string; text: string; color: string; glow: string; bg: string; border: string; }
export interface FilterCategory { id: string; name: string; }

// ── Document-level models (mirror the Java @Document classes) ─────────────

export interface HeroSection {
  id: string;
  title: string;
  name: string;
  role: string;
  description: string;
  statusLabel: string;
  scrollText: string;
  socialLinks: SocialLink[];
  satellites: SkillSatellite[];
  badges: HeroBadge[];
}

export interface AboutSection {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  image: string;
  imageAlt: string;
  bio: string[];
  statCards: StatCard[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  current: boolean;
  color: string;
  glow: string;
  bg: string;
  border: string;
  responsibilities: string[];
  stack: string; // comma-separated
}

export interface TechnologySection {
  id: string;
  categories: Record<string, string[]>;
  categoryMeta: Record<string, CategoryMeta>;
}

export interface Project {
  id: string;
  displayOrder: number;
  image: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  githubLink?: string;
  liveLink: string;
  color: string;
  glow: string;
  border: string;
}

export interface ContactInfoSection {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ContactInfoItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string; // ISO string from backend
}

// ── API response wrappers ─────────────────────────────────────────────────

export interface PortfolioResponse {
  projects: Project[];
  categories: FilterCategory[];
}

export interface ContactResponse {
  success: boolean;
  errors?: Record<string, string>;
}
