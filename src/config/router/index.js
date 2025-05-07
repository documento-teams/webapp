import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;