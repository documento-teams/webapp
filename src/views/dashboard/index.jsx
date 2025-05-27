import Sidebar from "@/components/common/sidebar";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/common/LanguageSelector";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSelector />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
