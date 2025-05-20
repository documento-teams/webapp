import { useState } from "react";
import useWorkspace from "@/hooks/useWorkspace";

const CreateWorkspaceForm = () => {
  const { createWorkspace } = useWorkspace();
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  if (!isCreating) {
    return (
      <button
        onClick={() => setIsCreating(true)}
        className="btn btn-primary btn-sm"
      >
        New Workspace
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleCreateWorkspace} className="flex gap-2">
        <input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          className="input input-bordered input-sm"
          placeholder="Workspace name"
          required
        />
        <button type="submit" className="btn btn-primary btn-sm">Create</button>
      </form>
      <button
        onClick={() => setIsCreating(false)}
        className="btn btn-ghost btn-sm"
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateWorkspaceForm;