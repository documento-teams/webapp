import { useState } from "react";
import api from "@/lib/api";

const useDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async (workspaceId) => {
    try {
      setLoading(true);
      try {
        const data = await api.get(`/api/document/${workspaceId}`);
        console.log("data", data);
        setDocuments(data);
        setError(null);
      } catch (err) {
        console.error("Fetch documents error:", err);
        throw new Error(`Error loading documents: ${err.message}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await api.delete(`/api/document/${id}`);
      setDocuments((prev) => prev.filter((document) => document.id !== id));
    } catch (err) {
      console.error("Delete document error:", err);
      setError(`Error deleting document: ${err.message}`);
      throw err;
    }
  };

  const updateDocument = async (id, data) => {
    try {
      const updatedDocument = await api.put(`/api/document/${id}`, data);
      setDocuments((prev) =>
        prev.map((document) =>
          document.id === id ? updatedDocument : document,
        ),
      );
      return updatedDocument;
    } catch (err) {
      console.error("Update document error:", err);
      setError(`Error updating document: ${err.message}`);
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    deleteDocument,
    updateDocument,
  };
};

export default useDocument;
