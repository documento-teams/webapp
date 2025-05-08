import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Dashboard from "@/views/dashboard";
import NavigationSidebar from "@/components/navigation/navigationSidebar";
import PrivateRoute from "@/components/privateRoutes";
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
      <PrivateRoute>
        <div className="flex">
          <NavigationSidebar />
          <Dashboard />
        </div>
      </PrivateRoute>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
