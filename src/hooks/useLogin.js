import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
    }

    const response = await api.post("/api/user/login", {
      email,
      password,
    });
    if (response.error) {
      setError(response.error);
      toast.error("Error while trying log in");
    } else {
      setError("");
    }

    if (response) {
      Cookies.set("token", response.token, {
        secure: false,
        sameSite: "Lax",
        expires: 7,
        path: "/",
      });
      navigate("/dashboard");
      toast.success("Welcome");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
    toast("logout successfully");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    logout
  };
};

export default useLogin;