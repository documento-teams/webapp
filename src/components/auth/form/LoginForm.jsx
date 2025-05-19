import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  } = useLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-4 w-full max-w-md"
    >
      <Input
        type="email"
        variant="primary"
        placeholder="user@mail.com"
        fullWidth
        required
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        error={errors?.email}
      />
      <Input
        type="password"
        variant="primary"
        placeholder="••••••••"
        fullWidth
        required
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password}
        className="justify-center items-center"
      />
      <div>
        <div className="flex justify-center gap-4 ">
          <Button
            type="submit"
            variant="primary"
          >
            Login
          </Button>
          <Button variant="link">
            Forgot Password ?
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;