import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// BUTTON COMPONENT
// =============================================================================
// A flexible button component with multiple variants and sizes.
// Follows accessibility best practices with proper focus states.
// =============================================================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  /** Size of the button */
  size?: "sm" | "md" | "lg" | "xl";
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      "btn-base relative inline-flex items-center justify-center gap-2",
      "font-semibold rounded-xl transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    );

    // Variant styles
    const variantStyles = {
      primary: cn(
        "bg-primary text-background-alt",
        "hover:bg-primary-light active:bg-primary-dark",
        "focus-visible:ring-primary"
      ),
      secondary: cn(
        "bg-secondary text-primary",
        "hover:bg-secondary-dark active:bg-secondary",
        "focus-visible:ring-secondary"
      ),
      outline: cn(
        "border-2 border-primary text-primary bg-transparent",
        "hover:bg-primary hover:text-background-alt",
        "focus-visible:ring-primary"
      ),
      ghost: cn(
        "text-primary bg-transparent",
        "hover:bg-primary/10 active:bg-primary/20",
        "focus-visible:ring-primary"
      ),
      link: cn(
        "text-primary bg-transparent underline-offset-4",
        "hover:underline",
        "focus-visible:ring-primary",
        "p-0 h-auto"
      ),
    };

    // Size styles
    const sizeStyles = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
      xl: "h-14 px-10 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          fullWidth && "w-full",
          isLoading && "cursor-wait",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}

        {/* Button text */}
        {children}

        {/* Right icon */}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
