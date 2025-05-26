import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import useDocument from "@/hooks/useDocument";
import DocuEditor from "@/components/common/documentMDXEditor";
import Button from "@/components/common/button";

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchDocumentsById, specificDocument, updateDocument } = useDocument();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchDocumentsById(id);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, fetchDocumentsById]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Mettre à jour le contenu quand le document est chargé
  useEffect(() => {
    if (specificDocument) {
      const docContent = specificDocument.content || "# New Document\n\nStart writing...";
      setContent(docContent);
      setHasChanges(false);
    }
  }, [specificDocument]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setHasChanges(newContent !== (specificDocument?.content || ""));
  };

  const handleSave = async (contentToSave = content) => {
    if (!specificDocument) {
      return;
    }

    try {
      setSaving(true);
      await updateDocument({
        id: specificDocument.id,
        content: contentToSave
      });
      setHasChanges(false);
    } catch (err) {
      console.error("Error saving document:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (hasChanges) {
      const shouldLeave = window.confirm("You have unsaved changes. Do you want to leave without saving?");
      if (!shouldLeave) {
        return;
      }
    }
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement du document...</div>
      </div>
    );
  }

  if (!specificDocument) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Document non trouvé</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {specificDocument.name || `Document ${id}`}
            </h1>
            <p className="text-sm text-gray-500">
              {hasChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleSave()}
            disabled={!hasChanges || saving}
            variant={hasChanges ? "primary" : "secondary"}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {content !== undefined && (
          <DocuEditor
            content={content}
            onChange={handleContentChange}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;