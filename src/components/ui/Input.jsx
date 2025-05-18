import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      variant = "primary",
      error,
      fullWidth = false,
      className = "",
      labelClassName = "",
      inputClassName = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`form-control ${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label className="label pb-1">
            <span className={`label-text ${labelClassName}`}>{label}</span>
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={`input input-bordered input-${variant} ${
            error ? "input-error" : ""
          } ${inputClassName}`}
          {...props}
        />

        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
