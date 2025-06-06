import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Dashboard from "@/views/dashboard";
import NavigationSidebar from "@/components/navigation/navigationSidebar";
import WorkspacesView from "@/views/workspaces";
import WorkspaceDocumentListView from "@/views/workspaces/workspaceDocumentListView";
import DocumentEditorView from "@/views/documents/documentEditorView";
import ProtectedRoutes from "@/components/privateRoutes";
import AllDocumentsView from "@/views/documents/allDocuments";
import ProfileView from "@/views/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/document-list-all",
    element: (
      <>
        <ProtectedRoutes>
          <div className="flex">
            <NavigationSidebar />
            <AllDocumentsView />
          </div>
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ProtectedRoutes>
          <div className="flex">
            <NavigationSidebar />
            <Dashboard />
          </div>
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/workspaces",
    element: (
      <>
        <ProtectedRoutes>
          <div className="flex">
            <NavigationSidebar />
            <Outlet />
          </div>
        </ProtectedRoutes>
      </>
    ),
    children: [
      {
        index: true,
        element: <WorkspacesView />,
      },
      {
        path: ":id",
        element: <WorkspaceDocumentListView />,
      },
    ],
  },
  {
    path: "/documents",
    element: (
      <>
        <div>
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: ":id",
        element: <DocumentEditorView />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <>
        <ProtectedRoutes>
          <div className="flex">
            <NavigationSidebar />
            <ProfileView />
          </div>
        </ProtectedRoutes>
      </>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
