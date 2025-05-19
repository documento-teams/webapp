import { useState } from "react";
import api from "@/lib/api.js";

const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (!email) {newErrors.email = "L'email est requis";}
    if (!password) {newErrors.password = "Le mot de passe est requis";}
    if (!fullname) {newErrors.fullname = "Le nom complet est requis";}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
        fullname
      });

      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullname("");
    } catch (error) {
      console.error("error while registering", error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Une erreur est survenue lors de l'inscription" });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fullname,
    setFullname,
    errors,
    setErrors,
    loading,
    success,
    handleSubmit,
  };
};

export default useRegister;