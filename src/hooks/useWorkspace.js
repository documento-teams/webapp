import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

const useWorkspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await api.get("/api/workspace/author");
      setWorkspaces(data);
      setError(null);
    } catch (err) {
      console.error("Fetch workspaces error:", err);
      setError(`Error loading workspaces: ${err.message}`);
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

  const getWorkspaceById = useCallback(async (id) => {
    try {
      if (workspaces && workspaces.length > 0) {
        const cachedWorkspace = workspaces.find((w) => w.id === id);
        if (cachedWorkspace) {
          return cachedWorkspace;
        }
      }
      const response = await api.get(`/api/workspace/${id}`);
      return response;
    } catch (err) {
      console.error("Error fetching workspace by ID:", err);
      throw new Error(`Error fetching workspace: ${err.message}`);
    }
  }, [workspaces]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return {
    workspaces,
    loading,
    error,
    createWorkspace,
    deleteWorkspace,
    getWorkspaceById,
    refreshWorkspaces: fetchWorkspaces
  };
};

export default useWorkspace;