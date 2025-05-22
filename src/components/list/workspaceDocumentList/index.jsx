import useDocument from "@/hooks/useDocument";
import List from "@/components/common/List";
import { useEffect } from "react";

const WorkspaceDocumentList = ({ id }) => {
  const { documents, fetchDocuments, deleteDocument } = useDocument();

  useEffect(() => {
    if (id) {
      fetchDocuments(parseInt(id, 10));
    }
  }, [id, fetchDocuments]);

  return (
    <div>
      <h1>Workspace Document List</h1>
    </div>
  );
};
export default WorkspaceDocumentList;
