import { useState, useEffect , useCallback } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

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
        if (data.length === 0) {
          toast.error("No workspaces found");
        } else {
          toast.success("Workspaces loaded successfully");
        }
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
      toast.success("Workspace created successfully");
      return newWorkspace;
    } catch (err) {
      console.error("Create workspace error:", err);
      toast.error(`Error creating workspace: ${err.message}`);
      setError(`Error creating workspace: ${err.message}`);
      throw err;
    }
  };

  const deleteWorkspace = async (id) => {
    try {
      await api.delete(`/api/workspace/${id}`);
      setWorkspaces(prev => prev.filter(workspace => workspace.id !== id));
      toast.success("Workspace deleted successfully");
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
      return response.workspace || response;
    } catch (err) {
      
      console.error("Error fetching workspace by ID:", err);
      throw new Error(`Error fetching workspace: ${err.message}`);
    }
  }, [workspaces]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return { workspaces, loading, error, createWorkspace, deleteWorkspace, getWorkspaceById, refreshWorkspaces: fetchWorkspaces };
};

export default useWorkspace;