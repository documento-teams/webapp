import { useState, useEffect } from "react";

const useWorkspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workspace/all`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setWorkspaces(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workspace/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const newWorkspace = await response.json();
      setWorkspaces(prev => [...prev, newWorkspace]);
      return newWorkspace;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteWorkspace = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workspace/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setWorkspaces(prev => prev.filter(workspace => workspace.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return { workspaces, loading, error, createWorkspace, deleteWorkspace, refreshWorkspaces: fetchWorkspaces };
};

export default useWorkspace;