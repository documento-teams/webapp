import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import PrivateRoute from "@/components/privateRoutes";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
