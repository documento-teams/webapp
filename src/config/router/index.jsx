import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Dashboard from "@/views/dashboard";
import NavigationSidebar from "@/components/navigation/navigationSidebar";
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
    element: (
      <>
        <NavigationSidebar />
        <Dashboard />
      </>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
