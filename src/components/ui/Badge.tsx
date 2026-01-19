import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// BADGE COMPONENT
// =============================================================================
// Used for difficulty levels, continents, status indicators, and tags.
// =============================================================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline";
  /** Size of the badge */
  size?: "sm" | "md" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  // Base styles
  const baseStyles = "inline-flex items-center font-medium rounded-full";

  // Variant styles
  const variantStyles = {
    default: "bg-background-dark text-foreground",
    primary: "bg-primary text-background-alt",
    secondary: "bg-secondary text-primary",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    outline: "border border-primary text-primary bg-transparent",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// =============================================================================
// DIFFICULTY BADGE
// =============================================================================
// Specialized badge for trip difficulty levels with appropriate colors.
// =============================================================================

export type DifficultyLevel = "Easy" | "Moderate" | "Challenging" | "Extreme";

const difficultyColors: Record<DifficultyLevel, string> = {
  Easy: "bg-green-100 text-green-800",
  Moderate: "bg-blue-100 text-blue-800",
  Challenging: "bg-amber-100 text-amber-800",
  Extreme: "bg-red-100 text-red-800",
};

export interface DifficultyBadgeProps extends Omit<BadgeProps, "variant"> {
  difficulty: DifficultyLevel | string;
}

export function DifficultyBadge({
  difficulty,
  className,
  ...props
}: DifficultyBadgeProps) {
  const colorClass =
    difficultyColors[difficulty as DifficultyLevel] ||
    "bg-gray-100 text-gray-800";

  return (
    <Badge className={cn(colorClass, className)} {...props}>
      {difficulty}
    </Badge>
  );
}

// =============================================================================
// CONTINENT BADGE
// =============================================================================
// Specialized badge for continents.
// =============================================================================

export interface ContinentBadgeProps extends Omit<BadgeProps, "variant"> {
  continent: string;
}

export function ContinentBadge({
  continent,
  className,
  ...props
}: ContinentBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("border-secondary text-foreground-muted", className)}
      {...props}
    >
      {continent}
    </Badge>
  );
}

// =============================================================================
// STATUS BADGE
// =============================================================================
// For availability status (Available, Limited, Sold Out).
// =============================================================================

export type AvailabilityStatus = "available" | "limited" | "sold_out";

const statusConfig: Record<
  AvailabilityStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Available",
    className: "bg-green-100 text-green-800",
  },
  limited: {
    label: "Limited Spots",
    className: "bg-amber-100 text-amber-800",
  },
  sold_out: {
    label: "Sold Out",
    className: "bg-red-100 text-red-800",
  },
};

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: AvailabilityStatus;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, className)} {...props}>
      {config.label}
    </Badge>
  );
}
