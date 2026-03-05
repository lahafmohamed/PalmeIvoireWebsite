import {
  Wheat,
  Factory,
  Package,
  Handshake,
  Star,
  Settings,
  Utensils,
  Award,
  Gem,
  Hexagon,
  Globe,
  Check,
  CheckCircle,
  Recycle,
  Users,
  Trophy,
  ShieldCheck,
  Lock,
  HardHat,
  Briefcase,
  FlaskConical,
  TestTube2,
  Truck,
  Flame,
  Dna,
  Ship,
  Lightbulb,
  Microscope,
  Target,
  Zap,
  UtensilsCrossed,
  Leaf,
  TreePalm,
  Droplets,
  CircleDollarSign,
  BadgeCheck,
  FileCheck,
  ClipboardCheck,
  TrendingUp,
  Heart,
  Building2,
  Sprout,
  Scale,
  Timer,
  ArrowRight,
} from 'lucide-react'

const iconMap = {
  // Agriculture / Production
  wheat: Wheat,
  factory: Factory,
  package: Package,
  handshake: Handshake,
  leaf: Leaf,
  palm: TreePalm,
  sprout: Sprout,
  droplets: Droplets,
  
  // Quality / Awards
  star: Star,
  award: Award,
  trophy: Trophy,
  badgeCheck: BadgeCheck,
  checkCircle: CheckCircle,
  check: Check,
  fileCheck: FileCheck,
  clipboardCheck: ClipboardCheck,
  
  // Technical / Industrial
  settings: Settings,
  flame: Flame,
  dna: Dna,
  microscope: Microscope,
  flask: FlaskConical,
  testTube: TestTube2,
  
  // Business / People
  users: Users,
  briefcase: Briefcase,
  hardHat: HardHat,
  building: Building2,
  
  // Values / Abstract
  gem: Gem,
  hexagon: Hexagon,
  globe: Globe,
  recycle: Recycle,
  shieldCheck: ShieldCheck,
  lock: Lock,
  lightbulb: Lightbulb,
  target: Target,
  zap: Zap,
  heart: Heart,
  scale: Scale,
  trendingUp: TrendingUp,
  
  // Logistics
  truck: Truck,
  ship: Ship,
  timer: Timer,
  
  // Food
  utensils: Utensils,
  utensilsCrossed: UtensilsCrossed,
  
  // Navigation
  arrowRight: ArrowRight,
  
  // Pricing
  dollarSign: CircleDollarSign,
}

/**
 * Professional Icon component using Lucide icons
 * @param {string} name - Icon key name from iconMap
 * @param {number} size - Icon size in pixels (default: 24)
 * @param {string} className - Additional CSS classes
 * @param {string} color - Icon color (default: currentColor)
 * @param {number} strokeWidth - Stroke width (default: 2)
 */
export function Icon({ 
  name, 
  size = 24, 
  className = '', 
  color = 'currentColor',
  strokeWidth = 2,
  ...props 
}) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`)
    return null
  }
  
  return (
    <IconComponent 
      size={size} 
      className={`icon ${className}`}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

export default Icon
