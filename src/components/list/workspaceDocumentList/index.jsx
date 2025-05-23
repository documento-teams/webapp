import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import List from "@/components/common/List";
import Button from "@/components/common/button";
import useDocument from "@/hooks/useDocument";
import useWorkspace from "@/hooks/useWorkspace";

// DocumentItem stylisé comme WorkspaceItem mais conservant tous les détails
const DocumentItem = ({ document, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this document?")) {
      onDelete(document.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-full max-w-full">
      <div className="card-body w-full p-5">
        <div className="flex flex-col h-full min-w-[250px]">
          <div className="flex-grow">
            <h3 className="card-title text-lg text-purple-700 mb-2">{document.name}</h3>
            {document.content && (
              <p className="text-gray-500 text-sm mb-4 line-clamp-4">
                {document.content.substring(0, 300)}...
              </p>
            )}
            {document.documentAuthor && (
              <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {document.documentAuthor.fullname}
              </div>
            )}
          </div>
          <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <div className="space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelect(document)}
              >
                Open
              </Button>
              <Button
                variant="error"
                size="sm"
                outline
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    updatedAt: PropTypes.string,
    documentAuthor: PropTypes.shape({
      fullname: PropTypes.string
    })
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

// Composant pour créer un nouveau document
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

// Composant principal
const WorkspaceDocumentList = ({ id }) => {
  const { documents, loading: docLoading, error: docError, fetchDocuments, deleteDocument } = useDocument();
  const { workspaces, loading: wsLoading, error: wsError } = useWorkspace();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDocuments(parseInt(id, 10));
    }
  }, [id, fetchDocuments]);

  // Trouver le workspace dans les données
  useEffect(() => {
    if (!id || !workspaces) { return; }

    const workspaceId = parseInt(id, 10);
    let foundWorkspace = null;
    // Gérer les différentes structures possibles de workspaces
    if (Array.isArray(workspaces)) {
      foundWorkspace = workspaces.find(w => w.id === workspaceId);
    } else if (workspaces.workspaces && Array.isArray(workspaces.workspaces)) {
      foundWorkspace = workspaces.workspaces.find(w => w.id === workspaceId);
    } else if (workspaces.id === workspaceId) {
      foundWorkspace = workspaces;
    }
    setWorkspace(foundWorkspace);
  }, [id, workspaces]);

  const handleSelectDocument = (document) => {
    window.location.href = `/documents/${document.id}`;
  };

  const renderDocumentItem = (document, { onDeleteItem }) => (
    <DocumentItem
      document={document}
      onSelect={handleSelectDocument}
      onDelete={onDeleteItem}
    />
  );

  const renderCreateDocumentForm = () => <CreateDocumentForm workspaceId={id} />;

  const isLoading = docLoading || wsLoading;
  const error = docError || wsError;

  // Assurez-vous que documents est un tableau
  const documentsArray = Array.isArray(documents) ? documents : [];

  return (
    <div className="w-full max-w-full">
      {workspace && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-purple-700">
            {workspace.name} Documents
          </h2>
          <p className="text-sm text-gray-600">
            Manage your documents in this workspace
          </p>
        </div>
      )}
      <List
        items={documentsArray}
        renderItem={renderDocumentItem}
        onDeleteItem={deleteDocument}
        itemTypeName="Documents"
        isLoading={isLoading}
        error={error}
        emptyMessage="No documents found in this workspace. Create your first one!"
        createFormComponent={renderCreateDocumentForm}
        className="grid grid-cols-1 gap-6 w-full max-w-full"
      />
    </div>
  );
};

WorkspaceDocumentList.propTypes = {
  id: PropTypes.string.isRequired
};

export default WorkspaceDocumentList;