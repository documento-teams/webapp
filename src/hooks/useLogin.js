import { useState } from "react";
import api from "@/lib/api.js";

const useLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", {
        email,
        password,
      });
    } catch {
      console.error("error while logging in");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    handleSubmit,
  };
};

export default useLogin;
