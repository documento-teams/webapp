import { useState, useEffect } from "react";
import api from "@/lib/api";

const useWorkspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      try {
        const data = await api.get("/api/workspace/all");
        setWorkspaces(data);
        setError(null);
      } catch (err) {
        console.error("Fetch workspaces error:", err);
        throw new Error(`Error loading workspaces: ${err.message}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (name) => {
    try {
      const newWorkspace = await api.post("/api/workspace/create", { name });
      setWorkspaces(prev => [...prev, newWorkspace]);
      return newWorkspace;
    } catch (err) {
      console.error("Create workspace error:", err);
      setError(`Error creating workspace: ${err.message}`);
      throw err;
    }
  };

  const deleteWorkspace = async (id) => {
    try {
      await api.delete(`/api/workspace/${id}`);
      setWorkspaces(prev => prev.filter(workspace => workspace.id !== id));
    } catch (err) {
      console.error("Delete workspace error:", err);
      setError(`Error deleting workspace: ${err.message}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return { workspaces, loading, error, createWorkspace, deleteWorkspace, refreshWorkspaces: fetchWorkspaces };
};

export default useWorkspace;