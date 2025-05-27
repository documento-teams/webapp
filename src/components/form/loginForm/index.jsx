import { useTranslation } from "react-i18next";
import useLogin from "@/hooks/useLogin";
import Input from "@/components/common/input";

const LoginForm = () => {
  const { t } = useTranslation();
  const { email, setEmail, password, setPassword, error, handleSubmit } =
    useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          {t("login.title")}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            {t("login.email")}
          </label>
          <Input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            variant="secondary"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            {t("login.password")}
          </label>
          <Input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            variant="secondary"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          {t("login.submit")}
        </button>
        <p className="text-center text-gray-600 mt-4">
          {t("login.noAccount")}{" "}
          <a href="#" className="text-purple-600 hover:underline">
            {t("login.signup")}
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
