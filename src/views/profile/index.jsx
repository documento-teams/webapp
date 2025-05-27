import UserForm from "@/components/form/userForm";
import useUser from "@/hooks/useUser";

const ProfileView = () => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Chargement...</div>;
  }
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <>
      <UserForm userData={user} buttonText="Mettre à jour le profil" />
    </>
  );
};

export default ProfileView;
