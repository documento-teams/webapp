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
    path: "/documentsHub",
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
        index: true,
        element: <h1>Document List</h1>,
      },
      {
        path: ":id",
        element: <DocumentEditorView />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
