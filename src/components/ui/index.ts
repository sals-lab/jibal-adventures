// =============================================================================
// UI COMPONENTS INDEX
// =============================================================================
// Export all UI components from a single entry point.
// Usage: import { Button, Card, Badge } from "@/components/ui";
// =============================================================================

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Badge, DifficultyBadge, ContinentBadge, StatusBadge } from "./Badge";
export type {
  BadgeProps,
  DifficultyBadgeProps,
  ContinentBadgeProps,
  StatusBadgeProps,
  DifficultyLevel,
  AvailabilityStatus,
} from "./Badge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "./Card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
} from "./Card";

export { Container, Section, SectionHeader } from "./Section";
export type {
  ContainerProps,
  SectionProps,
  SectionHeaderProps,
} from "./Section";
