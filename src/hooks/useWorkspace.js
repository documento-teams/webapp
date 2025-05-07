import api from "@/lib/api";
import { useState } from "react";

const useWorkspace = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  const getWorkspaceList = async () => {
    try {
      const response = await api.get("/api/workspace/all");
      console.log("Workspace list response:", response);
      console.log("Workspace list response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching workspace:", error);
      throw error;
    }
  };

  const createWorkspace = async (workspaceName) => {
    try {
      const data = {
        name: "caca",
      };
      console.log("Creating workspace with data:", data);
      const response = await api.post("/api/workspace/create", data);
      console.log("Create workspace response:", response);
      return response;
    } catch (error) {
      console.error("Error creating workspace:", error);
      throw error;
    }
  };

  return {
    workspaceList,
    setWorkspaceList,
    getWorkspaceList,
    createWorkspace,
  };
};

export default useWorkspace;
