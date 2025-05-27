import useWorkspace from "@/hooks/useWorkspace";
import PropTypes from "prop-types";
import List from "@/components/common/List";
import WorkspaceItem from "@/components/workspaces/workspaceItem";
import CreateWorkspaceForm from "@/components/workspaces/createWorkspaceForm";

const WorkspaceList = ({ onSelect }) => {
  const { workspaces, loading, error, deleteWorkspace } = useWorkspace();

  const workspacesArray = Array.isArray(workspaces) ? workspaces : [];

  const renderWorkspaceItem = (workspace, { onDeleteItem }) => (
    <WorkspaceItem
      key={workspace.id}
      workspace={workspace}
      onSelect={onSelect}
      onDelete={onDeleteItem}
    />
  );

  const handleDeleteWorkspace = async (id) => {
    try {
      await deleteWorkspace(id);
    } catch (err) {
      console.error("Failed to delete workspace:", err);
    }
  };

  const renderCreateWorkspaceForm = () => <CreateWorkspaceForm />;

  return (
    <List
      items={workspacesArray}
      renderItem={renderWorkspaceItem}
      onDeleteItem={handleDeleteWorkspace}
      itemTypeName="Your Workspaces"
      isLoading={loading}
      error={error}
      emptyMessage="No workspaces found. Create your first one!"
      createFormComponent={renderCreateWorkspaceForm}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    />
  );
};

WorkspaceList.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default WorkspaceList;