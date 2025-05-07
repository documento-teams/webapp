import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const useRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      await api.post("/api/user/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };
  return {
    error,
    handleRegister,
  };
};

export default useRegister;