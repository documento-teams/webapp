import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import useDocument from "@/hooks/useDocument";
import DocuEditor from "@/components/common/documentMDXEditor";
import Button from "@/components/common/button";

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchDocumentsById, specificDocument, updateDocument, error } = useDocument();
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

  useEffect(() => {
    if (specificDocument) {
      const docContent = specificDocument.content || "# New Document\n\nStart writing...";
      setContent(docContent);
      setHasChanges(false);
    }
  }, [specificDocument]);

  const canEdit = specificDocument?.permissions?.canEdit ?? false;
  const readOnly = specificDocument?.permissions?.readOnly ?? false;

  const handleContentChange = (newContent) => {
    if (readOnly) {
      return;
    }

    setContent(newContent);
    setHasChanges(newContent !== (specificDocument?.content || ""));
  };

  const handleSave = async (contentToSave = content) => {
    if (!specificDocument || readOnly) {
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
    if (hasChanges && canEdit) {
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
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {specificDocument.name || `Document ${id}`}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-500">
                {hasChanges && canEdit ? "Unsaved changes" : "All changes saved"}
              </p>
              {readOnly && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  📖 Read Only
                </span>
              )}
              {specificDocument.documentAuthor && (
                <span className="text-xs text-gray-400">
                  by {specificDocument.documentAuthor.fullname}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && (
            <Button
              onClick={() => handleSave()}
              disabled={!hasChanges || saving || readOnly}
              variant={hasChanges ? "primary" : "secondary"}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          )}
          {readOnly && (
            <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded">
              You can view this document but cannot edit it
            </div>
          )}
        </div>
      </div>

      {error && error.includes("permission") && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 mt-4 rounded">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {content !== undefined && (
          <DocuEditor
            content={content}
            onChange={handleContentChange}
            onSave={canEdit ? handleSave : undefined}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;