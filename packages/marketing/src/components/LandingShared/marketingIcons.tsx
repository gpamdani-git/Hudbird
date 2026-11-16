import {
  Check,
  Clock,
  Cloud,
  Code2,
  Compass,
  Cpu,
  CreditCard,
  Database,
  Flame,
  Gauge,
  Globe,
  Heart,
  Key,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  Rocket,
  Shield,
  Sliders,
  Sparkles,
  Star,
  Terminal,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";

export const MARKETING_ICON_REGISTRY: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  layers: Layers,
  globe: Globe,
  lock: Lock,
  code: Code2,
  cpu: Cpu,
  database: Database,
  cloud: Cloud,
  check: Check,
  clock: Clock,
  compass: Compass,
  "credit-card": CreditCard,
  flame: Flame,
  gauge: Gauge,
  heart: Heart,
  key: Key,
  lifebuoy: LifeBuoy,
  mail: Mail,
  rocket: Rocket,
  sliders: Sliders,
  star: Star,
  terminal: Terminal,
  users: Users,
  wand: Wand2,
};

export function resolveMarketingIcon(
  iconName?: string | null,
  fallback: ComponentType<{ className?: string }> = Sparkles
): ComponentType<{ className?: string }> {
  if (!iconName) return fallback;
  const normalized = iconName.trim().toLowerCase();
  return MARKETING_ICON_REGISTRY[normalized] ?? fallback;
}
