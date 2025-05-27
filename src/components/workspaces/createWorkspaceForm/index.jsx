import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspace from "@/hooks/useWorkspace";

const CreateWorkspaceForm = () => {
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    if (!newWorkspaceName.trim() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const newWorkspace = await createWorkspace(newWorkspaceName.trim());

      navigate(`/workspaces/${newWorkspace.id}`);

      setNewWorkspaceName("");
      setIsCreating(false);

    } catch (err) {
      console.error("Failed to create workspace:", err);
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={isSubmitting || !newWorkspaceName.trim()}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsCreating(false);
          setNewWorkspaceName("");
        }}
        className="btn btn-ghost btn-sm"
        disabled={isSubmitting}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateWorkspaceForm;