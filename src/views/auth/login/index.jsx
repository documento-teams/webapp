import LoginForm from "@/components/auth/form/LoginForm";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <div className="w-full max-w-sm mx-auto mt-10">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
