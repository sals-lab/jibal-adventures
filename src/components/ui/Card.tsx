import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// CARD COMPONENT
// =============================================================================
// A flexible card container with optional hover effects.
// Used for trip cards, content sections, and more.
// =============================================================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable hover shadow effect */
  hover?: boolean;
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Border style */
  border?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = false,
      padding = "md",
      border = false,
      children,
      ...props
    },
    ref
  ) => {
    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-background-alt rounded-2xl",
          hover &&
            "shadow-soft transition-shadow duration-300 hover:shadow-medium",
          !hover && "shadow-soft",
          border && "border border-background-dark",
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// =============================================================================
// CARD HEADER
// =============================================================================

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// =============================================================================
// CARD TITLE
// =============================================================================

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-xl font-semibold text-foreground", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// =============================================================================
// CARD DESCRIPTION
// =============================================================================

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-foreground-muted", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// =============================================================================
// CARD CONTENT
// =============================================================================

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// =============================================================================
// CARD FOOTER
// =============================================================================

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

// =============================================================================
// CARD IMAGE
// =============================================================================

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio */
  aspect?: "video" | "square" | "card" | "portrait";
  /** Overlay gradient */
  overlay?: boolean;
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      className,
      src,
      alt,
      aspect = "card",
      overlay = false,
      children,
      ...props
    },
    ref
  ) => {
    const aspectStyles = {
      video: "aspect-video",
      square: "aspect-square",
      card: "aspect-card",
      portrait: "aspect-portrait",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-t-2xl",
          aspectStyles[aspect],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {overlay && <div className="gradient-overlay" />}
        {children}
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
