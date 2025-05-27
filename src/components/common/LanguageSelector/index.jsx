import { useTranslation } from "react-i18next";
import Input from "@/components/common/input"; // adapte le chemin si besoin

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="absolute top-4 right-4 w-40">
      <Input
        type="select"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        options={[
          { value: "fr", label: "🇫🇷 Français" },
          { value: "en", label: "🇬🇧 English" }
        ]}
        variant="default"
      />
    </div>
  );
};

export default LanguageSelector;
