import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WorkspaceDocumentList from "@/components/list/workspaceDocumentList";

const WorkspaceDocumentListView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/workspaces");
    }
  });

  return (
    <div>
      <WorkspaceDocumentList id={id} />
    </div>
  );
};

export default WorkspaceDocumentListView;
