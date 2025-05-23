import { useState, useCallback } from "react";
import api from "@/lib/api";

const useDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async (workspaceId = null) => {
    try {
      setLoading(true);
      let url = "/api/document/author";
      if (workspaceId) {
        url = `/api/document/workspace/${workspaceId}`;
      }
      const data = await api.get(url);
      setDocuments(data);
      setError(null);
    } catch (err) {
      console.error("Fetch documents error:", err);
      setError(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  const createDocument = useCallback(async (documentData) => {
    try {
      const response = await api.post("/api/document/create", documentData);
      setDocuments((prev) => [...prev, response]);
      return response;
    } catch (err) {
      console.error("Create document error:", err);
      setError(err.message || "Failed to create document");
      throw err;
    }
  }, []);

  const deleteDocument = useCallback(async (id) => {
    try {
      await api.delete(`/api/document/${id}`);
      setDocuments((prev) => prev.filter((document) => document.id !== id));
    } catch (err) {
      console.error("Delete document error:", err);
      setError(err.message || "Failed to delete document");
      throw err;
    }
  }, []);

  const updateDocument = useCallback(async (id, data) => {
    try {
      const updatedDocument = await api.put(`/api/document/${id}`, data);
      setDocuments((prev) =>
        prev.map((document) =>
          document.id === id ? updatedDocument : document
        )
      );
      return updatedDocument;
    } catch (err) {
      console.error("Update document error:", err);
      setError(err.message || "Failed to update document");
      throw err;
    }
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    createDocument,
    deleteDocument,
    updateDocument,
  };
};

export default useDocument;