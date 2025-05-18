import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const LoginForm = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <Input
        label="Email"
        type="email"
        variant="primary"
        placeholder="user@mail.com"
        fullWidth
        required
      />
      <Input
        label="Password"
        type="password"
        variant="primary"
        placeholder="••••••••"
        fullWidth
        required
      />
    </form>
  );
};

export default LoginForm;
