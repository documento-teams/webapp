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

const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      variant = "default",
      error,
      fullWidth = false,
      className = "",
      labelClassName = "",
      selectClassName = "",
      placeholder = "Sélectionner...",
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

        <select
          ref={ref}
          className={`select appearance-none border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-opacity-50 pr-8 ${
            variantClasses
          } ${
            error ? "!border-red-500 !ring-red-500" : ""
          } ${selectClassName}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <label className="label">
            <span className="label-text-alt text-red-500">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
