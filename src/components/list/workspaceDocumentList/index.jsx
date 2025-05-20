import useDocument from "@/hooks/useDocument";
import List from "@components/list";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkspaceDocumentList = () => {
  const { workspaceId } = useParams();
  const { documents, fetchDocuments, deleteDocument } = useDocument();

  useEffect(() => {
    if (workspaceId) {
      fetchDocuments(parseInt(workspaceId, 10));
    }
  }, [workspaceId, fetchDocuments]);


  return (
    <div>
      <h1>Workspace Document List</h1>
      <List
        items={documents}
        onDeleteItem={deleteDocument}
      />
    </div>
  );
};
export default WorkspaceDocumentList;
