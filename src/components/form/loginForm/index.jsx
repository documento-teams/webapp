import useLogin from "@/hooks/useLogin";
import Input from "@/components/common/input";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } =
    useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            variant="secondary"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="secondary"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelClassName="text-gray-700 font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
