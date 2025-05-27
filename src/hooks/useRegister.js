import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

const useRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      await api.post("/api/user/register", {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      });

      navigate("/login");
      toast.success("User registered successfully! Please log in.");
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