import React from "react";

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
    const baseClasses = `btn ${outline ? "btn-outline" : ""}
      btn-${variant}
      btn-${size}
      ${fullWidth ? "w-full" : ""}
      ${loading ? "loading" : ""}
      ${className}`;

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={loading || props.disabled}
        {...props}
      >
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {loading ? loadingText : children}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
