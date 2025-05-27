import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/common/sidebar";
import useLogin from "@/hooks/useLogin";

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  const items = [
    { label: "Documents", action: () => navigate("/document-list-all") },
    { label: "Profile", action: () => navigate("/profile") },
    { label: "Workspace", action: () => navigate("/workspaces") },
  ];

  const footerItems = [
    {
      label: "Logout",
      action: logout,
      className: "text-red-500 hover:text-red-700"
    },
    { label: "Settings", action: () => console.log("Settings clicked") },
  ];

  return (
    <div className="w-full md:w-1/4 ">
      <Sidebar title="Documento" items={items} footerItems={footerItems} />
    </div>
  );
};

export default NavigationSidebar;
