import { useState } from "react";
import useWorkspace from "@/hooks/useWorkspace";
import PropTypes from "prop-types";

const WorkspaceList = ({ onSelect }) => {
  const { workspaces, loading, error, createWorkspace, deleteWorkspace } = useWorkspace();
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const workspacesArray = Array.isArray(workspaces)
    ? workspaces
    : (workspaces && workspaces.workspaces)
      ? workspaces.workspaces
      : [];

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) {
      return;
    }
    try {
      await createWorkspace(newWorkspaceName);
      setNewWorkspaceName("");
      setIsCreating(false);
    } catch (err) {
      console.error("Failed to create workspace:", err);
    }
  };

  const handleDeleteWorkspace = async (id) => {
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      try {
        await deleteWorkspace(id);
      } catch (err) {
        console.error("Failed to delete workspace:", err);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div className="alert alert-error">Error loading workspaces: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Workspaces</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="btn btn-primary btn-sm"
        >
          {isCreating ? "Cancel" : "New Workspace"}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateWorkspace} className="mb-6 card bg-base-200 p-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Workspace Name</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="My New Workspace"
                required
              />
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </div>
        </form>
      )}

      {workspacesArray.length === 0 ? (
        <div className="text-center py-8 bg-base-200 rounded-lg">
          <p className="text-gray-500">No workspaces found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspacesArray.map((workspace) => (
            <div key={workspace.id} className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <h3 className="card-title text-lg">{workspace.name}</h3>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => onSelect(workspace)}
                    className="btn btn-sm btn-outline"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDeleteWorkspace(workspace.id)}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

WorkspaceList.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default WorkspaceList;