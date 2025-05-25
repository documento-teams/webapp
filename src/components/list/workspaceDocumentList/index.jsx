import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import List from "@/components/common/List";
import useDocument from "@/hooks/useDocument";
import useWorkspace from "@/hooks/useWorkspace";
import DocumentItem from "@/components/list/documentItem";
import CreateDocumentForm from "@/components/list/createDocumentForm";

const WorkspaceDocumentList = ({ id }) => {
  const { documents, loading: docLoading, error: docError, fetchDocuments, deleteDocument } = useDocument();
  const { workspaces, loading: wsLoading, error: wsError } = useWorkspace();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDocuments(parseInt(id, 10));
    }
  }, [id, fetchDocuments]);

  useEffect(() => {
    if (!id || !workspaces) { return; }

    const workspaceId = parseInt(id, 10);
    let foundWorkspace = null;
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