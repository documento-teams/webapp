import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/common/sidebar";

const NavigationSidebar = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Documents", action: () => navigate("/documents") },
    { label: "Profile", action: () => navigate("/profile") },
    { label: "Workspace", action: () => navigate("/workspace") },
  ];

  const footerItems = [
    { label: "Logout", action: () => console.log("Logout clicked") },
    { label: "Settings", action: () => console.log("Settings clicked") },
  ];

  return (
    <div className="w-full md:w-1/4 ">
      <Sidebar title="Documento" items={items} footerItems={footerItems} />
    </div>
  );
};

export default NavigationSidebar;
