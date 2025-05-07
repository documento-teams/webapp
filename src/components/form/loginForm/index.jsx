import useLogin from "../../../hooks/useLogin";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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