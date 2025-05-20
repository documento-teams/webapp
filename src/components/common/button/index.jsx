import React from "react";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-purple-600 hover:bg-purple-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  error: "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-amber-600 hover:bg-amber-700 text-white",
  neutral: "bg-gray-600 hover:bg-gray-700 text-white",
  ghost: "bg-transparent hover:bg-gray-100 text-current",
  link: "bg-transparent text-blue-600 hover:underline px-0 py-0",
};

const outlineVariants = {
  primary: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  secondary: "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
  success: "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  error: "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
  warning: "border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white",
  neutral: "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white",
};

const sizes = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
};

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      outline = false,
      fullWidth = false,
      loading = false,
      loadingText = "Loading...",
      startIcon,
      endIcon,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantClasses = outline
      ? outlineVariants[variant] || outlineVariants.primary
      : variants[variant] || variants.primary;

    const sizeClasses = sizes[size] || sizes.md;

    const baseClasses = `
      inline-flex items-center justify-center
      font-medium rounded-md
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
      disabled:opacity-60 disabled:cursor-not-allowed
      ${outline ? "border-2 bg-transparent" : "border-0"}
      ${variantClasses}
      ${sizeClasses}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText}
          </>
        ) : (
          <>
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-2">{endIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;