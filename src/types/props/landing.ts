// P01 Landing page component props
// File: src/types/landing.ts

export interface HeroProps {
  title: string;
  subtitle?: string;
  showGridAnimation?: boolean; // default true
  onStartClick: (e?: unknown) => void;
  className?: string;
}

export interface CTAButtonProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  onHover?: () => void;
}

export interface TrustBarProps {
  tickers: string[];
  speed?: number; // px/s, default 50
  theme?: 'dark' | 'light';
}

export interface SecurityShieldProps {
  label: string;
  onClick: () => void;
  status: 'active' | 'locked';
}

export interface AdvisorDTO {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
}

export interface AdvisorCardProps {
  advisor?: AdvisorDTO | null;
  delay?: number;
  onContactClick: (advisorId: string) => void;
}
