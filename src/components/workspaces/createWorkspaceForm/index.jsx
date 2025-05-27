import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspace from "@/hooks/useWorkspace";
import Input from "@/components/common/input";
import Button from "@/components/common/button";

const CreateWorkspaceForm = () => {
  const { t } = useTranslation();
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
        {t("workspace.new")}
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
          placeholder={t("workspace.namePlaceholder")}
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
          {isSubmitting ? t("document.creating") : t("document.create")}
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
        {t("common.cancel")}
      </Button>
    </div>
  );
};

export default CreateWorkspaceForm;
