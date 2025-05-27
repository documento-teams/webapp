import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import useDocument from "@/hooks/useDocument";

const CreateDocumentForm = ({ workspaceId }) => {
  const { t } = useTranslation();
  const { createDocument } = useDocument();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      const newDocument = await createDocument({
        name: name.trim(),
        workspaceId: parseInt(workspaceId, 10),
      });

      navigate(`/documents/${newDocument.id}`);
      setName("");
      setIsCreating(false);
    } catch (err) {
      console.error("Error creating document:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCreating) {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsCreating(true)}
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        }
      >
        {t("document.new")}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleCreate} className="flex gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="primary"
          placeholder={t("document.namePlaceholder")}
          required
          disabled={isSubmitting}
          autoFocus
          inputClassName="input-sm"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSubmitting || !name.trim()}
        >
          {isSubmitting ? t("document.creating") : t("document.create")}
        </Button>
      </form>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsCreating(false);
          setName("");
        }}
        disabled={isSubmitting}
      >
        {t("common.cancel")}
      </Button>
    </div>
  );
};

CreateDocumentForm.propTypes = {
  workspaceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default CreateDocumentForm;
