import { useTranslation } from "react-i18next";
import LanguageSelector from "../../common/LanguageSelector";

const UserProfile = ({ userData }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <LanguageSelector />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          {t("profile.title")}
        </h2>

        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-1">{t("profile.fullname")}</p>
          <p className="px-4 py-2 border border-gray-200 rounded-lg ">
            {userData?.fullname || t("profile.notSpecified")}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-1">{t("profile.email")}</p>
          <p className="px-4 py-2 border border-gray-200 rounded-lg">
            {userData?.email || t("profile.notSpecified")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
