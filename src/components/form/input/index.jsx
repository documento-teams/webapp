import PropTypes from "prop-types";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  ...props
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label htmlFor={name} style={{ display: "block", marginBottom: "0.5rem" }}>
          {label}{required && " *"}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        {...props}
      />
      {error && (
        <div style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          {error}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
