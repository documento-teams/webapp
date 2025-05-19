import React from "react";

const variants = {
  primary: "bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-500",
  secondary: "bg-purple-50 border-purple-300 focus:border-purple-500 focus:ring-purple-500",
  success: "bg-green-50 border-green-300 focus:border-green-500 focus:ring-green-500",
  error: "bg-red-50 border-red-300 focus:border-red-500 focus:ring-red-500",
  warning: "bg-amber-50 border-amber-300 focus:border-amber-500 focus:ring-amber-500",
  neutral: "bg-gray-50 border-gray-300 focus:border-gray-500 focus:ring-gray-500",
  default: "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500",
};

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      variant = "default",
      error,
      fullWidth = false,
      className = "",
      labelClassName = "",
      inputClassName = "",
      ...props
    },
    ref,
  ) => {
    const variantClasses = variants[variant] || variants.default;
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? "w-min-full" : ""} ${className}`}>
        {label && (
          <label className="label pb-1">
            <span className={`label-text ${labelClassName}`}>{label}</span>
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={`input border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-opacity-50 ${
            variantClasses
          } ${
            error ? "!border-red-500 !ring-red-500" : ""
          } ${inputClassName}`}
          {...props}
        />

        {error && (
          <label className="label">
            <span className="label-text-alt text-red-500">{error}</span>
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
