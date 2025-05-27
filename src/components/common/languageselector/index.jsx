import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={() => i18n.changeLanguage("fr")}
        className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300"
      >
        FR
      </button>
      <button
        onClick={() => i18n.changeLanguage("en")}
        className="px-3 py-1 rounded bg-indigo-200 hover:bg-indigo-300"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
