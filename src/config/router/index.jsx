import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Dashboard from "@/views/dashboard";
import NavigationSidebar from "@/components/navigation/navigationSidebar";
import WorkspacesView from "@/views/workspaces";
import WorkspaceDocumentListView from "@/views/workspaces/workspaceDocumentListView";
import DocumentEditorView from "@/views/documents/documentEditorView";

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
        <div className="flex">
          <NavigationSidebar />
          <Dashboard />
        </div>
      </>
    ),
  },
  {
    path: "/workspaces",
    element: (
      <>
        <div className="flex">
          <NavigationSidebar />
          <Outlet />
        </div>
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
