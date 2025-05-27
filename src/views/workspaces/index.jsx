import { useNavigate } from "react-router-dom";
import WorkspaceList from "@/components/workspaces/workspacesList";
import LanguageSelector from "../../components/common/LanguageSelector";
import { useTranslation } from "react-i18next";

const WorkspacesView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectWorkspace = (workspace) => {
    navigate(`/workspaces/${workspace.id}`);
  };

  return (
    <div className="flex justify-end p-4">
      <LanguageSelector />
      <div className="h-full">
        <h1 className="text-2xl font-bold mb-4">{t(workspace.workspace)}</h1>
        <WorkspaceList onSelect={handleSelectWorkspace} />
      </div>
    </div>
  );
};

export default WorkspacesView;