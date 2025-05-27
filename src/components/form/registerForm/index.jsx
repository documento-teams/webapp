import { useState } from "react";
import { useTranslation } from "react-i18next";
import useRegister from "@/hooks/useRegister";
import Input from "@/components/common/input";
import LanguageSelector from "../../common/LanguageSelector";

const RegisterForm = () => {
  const { error, handleRegister } = useRegister();
  const { t } = useTranslation();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    await handleRegister({ fullname, email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-teal-500">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-green-700">
          {t("register.title")}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6">
          <Input
            label={t("register.fullname")}
            type="text"
            placeholder={t("register.fullnamePlaceholder")}
            variant="success"
            fullWidth
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <div className="mb-6">
          <Input
            label={t("login.email")}
            type="email"
            placeholder={t("login.emailPlaceholder")}
            variant="success"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <div className="mb-6">
          <Input
            label={t("login.password")}
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            variant="success"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <div className="mb-6">
          <Input
            label={t("register.confirmPassword")}
            type="password"
            placeholder={t("register.confirmPasswordPlaceholder")}
            variant="success"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordError}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          {t("login.signup")}
        </button>
        <p className="text-center text-gray-600 mt-4">
          {t("register.alreadyAccount")}{" "}
          <a href="/login" className="text-green-600 hover:underline">
            {t("login.title")}
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
