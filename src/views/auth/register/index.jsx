import RegisterForm from "@/components/form/registerForm";
import LanguageSelector from "@/components/common/LanguageSelector";

const Register = () => {
  return(
    <>
      <LanguageSelector />
      <RegisterForm />
    </>
  );
};

export default Register;