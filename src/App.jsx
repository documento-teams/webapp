import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "../../views/homepage";
import Login from "@/views/auth/login";
import Dashboard from "@/views/dashboard";
import Register from "@/views/auth/register";
import ProtectedRoutes from "@/components/protectedRoutes";
import Documents from "@/views/document/documentsList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
  },
  {
    path: "/documents",
    element: <ProtectedRoutes><Documents /></ProtectedRoutes>,
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;