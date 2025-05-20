import useWorkspace from "@/hooks/useWorkspace";
import PropTypes from "prop-types";
import List from "@/components/common/List";
import WorkspaceItem from "@/components/workspaces/WorkspaceItem";
import CreateWorkspaceForm from "@/components/workspaces/CreateWorkspaceForm";

const WorkspaceList = ({ onSelect }) => {
  const { workspaces, loading, error, deleteWorkspace } = useWorkspace();

  const workspacesArray = Array.isArray(workspaces)
    ? workspaces
    : (workspaces && workspaces.workspaces)
      ? workspaces.workspaces
      : [];

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

  return (
    <List
      items={workspacesArray}
      renderItem={renderWorkspaceItem}
      onDeleteItem={handleDeleteWorkspace}
      itemTypeName="Workspaces"
      isLoading={loading}
      error={error}
      emptyMessage="No workspaces found. Create your first one!"
      createFormComponent={CreateWorkspaceForm}
    />
  );
};

WorkspaceList.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default WorkspaceList;