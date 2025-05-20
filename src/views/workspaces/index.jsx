import { useNavigate } from "react-router-dom";
import WorkspaceList from "@/components/workspaces/workspacesList";

const WorkspacesView = () => {
  const navigate = useNavigate();

  const handleSelectWorkspace = (workspace) => {
    // Navigation vers la page du workspace sélectionné
    navigate(`/workspaces/${workspace.id}`);
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      <WorkspaceList onSelect={handleSelectWorkspace} />
    </div>
  );
};

export default WorkspacesView;