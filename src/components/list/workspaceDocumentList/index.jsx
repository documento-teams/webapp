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
      <List
        items={documents}
        onDeleteItem={deleteDocument}
        itemTypeName="Documents"
        emptyMessage="No document found. Create your first one"
      />
    </div>
  );
};
export default WorkspaceDocumentList;
