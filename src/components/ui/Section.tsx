import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// CONTAINER COMPONENT
// =============================================================================
// Wraps content with max-width and horizontal padding.
// =============================================================================

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Width variant */
  size?: "narrow" | "default" | "wide" | "full";
  /** HTML element to render as */
  as?: "div" | "section" | "article" | "main";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size = "default", as: Component = "div", children, ...props },
    ref
  ) => {
    const sizeStyles = {
      narrow: "max-w-3xl", // 768px
      default: "max-w-content", // 1200px
      wide: "max-w-8xl", // 1408px
      full: "max-w-none",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

// =============================================================================
// SECTION COMPONENT
// =============================================================================
// A semantic section with consistent vertical spacing.
// =============================================================================

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical padding size */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background color variant */
  background?: "default" | "alt" | "primary" | "secondary";
  /** Container size for inner content */
  containerSize?: "narrow" | "default" | "wide" | "full";
  /** Whether to include a container wrapper */
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      padding = "lg",
      background = "default",
      containerSize = "default",
      container = true,
      children,
      ...props
    },
    ref
  ) => {
    const paddingStyles = {
      none: "",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    };

    const backgroundStyles = {
      default: "bg-background",
      alt: "bg-background-alt",
      primary: "bg-primary text-background-alt",
      secondary: "bg-secondary",
    };

    return (
      <section
        ref={ref}
        className={cn(
          paddingStyles[padding],
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        {container ? (
          <Container size={containerSize}>{children}</Container>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";

// =============================================================================
// SECTION HEADER
// =============================================================================
// Consistent header styling for sections with title and description.
// =============================================================================

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
  /** Title alignment */
  align?: "left" | "center";
  /** Show decorative element */
  decorator?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      description,
      align = "center",
      decorator = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 md:mb-16",
          align === "center" && "text-center",
          className
        )}
        {...props}
      >
        {decorator && (
          <span className="inline-block mb-4 px-4 py-1.5 bg-secondary/50 text-foreground-muted text-sm font-medium rounded-full uppercase tracking-wider">
            Explore
          </span>
        )}
        <h2 className="text-display-sm md:text-display-md font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-lg text-foreground-muted max-w-2xl",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { Container, Section, SectionHeader };
