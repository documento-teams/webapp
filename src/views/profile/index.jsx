import UserForm from "@/components/form/userForm";
import useUser from "@/hooks/useUser";
import LanguageSelector from "../../components/common/LanguageSelector";
import { useTranslation } from "react-i18next";


const ProfileView = () => {
  const { t } = useTranslation();
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>{t("common.loading")}</div>;
  }
  if (error) {
    return <div>{t("common.error")}: {error}</div>;
  }

  return (
    <>
      <LanguageSelector />
      <UserForm userData={user} buttonText={t("profile.update")}/>
    </>
  );
};

export default ProfileView;
