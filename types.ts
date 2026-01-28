export interface PricingTier {
  quantity: string;
  unitPrice: number;
  packagePrice: number;
  customerBenefit: number;
}

export interface PricingVariant {
  unitPrice: number;
  packagePrice: number;
  customerBenefit: number;
}

export interface ServiceSubPackage {
  name: string;
  subtitle: string;
  description: string;
  features: string[]; // Legacy simple list
  included: string[]; // New structured list with checks
  notIncluded: string[]; // New structured list with crosses
  iconPath: string;
  pricing: Record<string, PricingVariant>;
  accentColor?: string; // Hex for custom styling
}

// For Script to Screen Matrix Pricing
export type VideoDuration = '10s' | '15s' | '20s' | '30s';
export interface StSPackage {
  name: string;
  description: string; // "included" summary
  included: string[];
  notIncluded: string[];
  prices: Record<VideoDuration, number | null>; // Price for each duration
  iconPath: string;
  accentColor: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  beforeImage?: string; // Optional now (StS has only after)
  afterImage: string;
  isVideo?: boolean;
  isVertical?: boolean;
  aspectRatio?: number;
}

export interface PerformanceMetric {
  value: string;
  label: string;
  description: string;
}

export interface PerformanceCase {
  value: string;
  label: string;
  sourceUrl: string;
}

export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  descriptionPoints: string[];
  
  // Pricing Configuration
  pricingType: 'qam-matrix' | 'sts-matrix' | 'voice-volume';
  
  // QAM Data
  subPackages?: ServiceSubPackage[];
  
  // StS Data
  stsPackages?: StSPackage[];
  
  // Voice/Volume Data
  volumePricing?: Record<string, PricingTier>;
  
  portfolio?: PortfolioItem[];
  colorTheme: 'amber' | 'blue' | 'emerald'; // To differentiate sections visually
}

export interface MetricWithSource {
  value: string;
  sourceText?: string;
  sourceUrl?: string;
}

export interface AudienceSubCard {
  title?: string;
  icon?: string; // Icon path
  metrics: MetricWithSource[];
  text: string;
}

export interface AudienceProfile {
  title: string; // e.g. PERFORMANCE
  subtitle: string;
  
  // Standard Layout (Legacy/Fallback)
  painPoints?: { text: string; icon: string }[];
  metrics?: { value: string; label: string }[];
  footer?: string;

  // New Performance Layout
  performanceMetric?: PerformanceMetric;
  performanceCases?: PerformanceCase[];

  // New Branding Layout
  introText?: string;
  subCards?: AudienceSubCard[];
}
