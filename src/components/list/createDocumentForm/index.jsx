import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@/components/common/button";
import useDocument from "@/hooks/useDocument";

const CreateDocumentForm = ({ workspaceId }) => {
  const { createDocument } = useDocument();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    try {
      await createDocument({
        name,
        workspaceId: parseInt(workspaceId, 10)
      });
      setName("");
      setIsCreating(false);
    } catch (err) {
      console.error("Error creating document:", err);
    }
  };

  if (!isCreating) {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsCreating(true)}
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        New Document
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered input-sm"
          placeholder="Document name"
          required
        />
        <Button type="submit" variant="primary" size="sm">Create</Button>
      </form>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCreating(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

CreateDocumentForm.propTypes = {
  workspaceId: PropTypes.string.isRequired
};

export default CreateDocumentForm;