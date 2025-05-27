import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspace from "@/hooks/useWorkspace";
import Input from "@/components/common/input";
import Button from "@/components/common/button";

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
      <Button variant="primary" size="sm" onClick={() => setIsCreating(true)}>
        New Workspace
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleCreateWorkspace} className="flex gap-2">
        <Input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          variant="primary"
          placeholder="Workspace name"
          required
          disabled={isSubmitting}
          autoFocus
          inputClassName="input-sm"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSubmitting || !newWorkspaceName.trim()}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsCreating(false);
          setNewWorkspaceName("");
        }}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CreateWorkspaceForm;
