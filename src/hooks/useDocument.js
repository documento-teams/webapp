import { useState, useCallback } from "react";
import api from "@/lib/api";

const useDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [specificDocument, setSpecificDocument] = useState({});
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
      return data;
    } catch (err) {
      console.error("Fetch documents error:", err);
      setError(err.message || "Failed to load documents");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDocumentsById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await api.get(`/api/document/${id}`);
      setSpecificDocument(data);
      setError(null);
      return data;
    } catch (err) {
      console.error("Fetch document error:", err);
      setError(err.message || "Failed to load document");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createDocument = useCallback(async (documentData) => {
    try {
      if (!documentData.content) {
        documentData.content = "# Hello World\n\nStart writing your document...";
      }
      const response = await api.post("/api/document/create", documentData);
      setDocuments((prev) => [response, ...prev]);
      setError(null);
      console.log("Document created successfully:", response);
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
      setError(null);
    } catch (err) {
      console.error("Delete document error:", err);
      setError(err.message || "Failed to delete document");
      throw err;
    }
  }, []);

  const updateDocument = useCallback(async (documentData) => {
    try {
      setLoading(true);
      const { id, ...data } = documentData;

      const response = await api.put(`/api/document/update/${id}`, data);

      setSpecificDocument(prev => ({ ...prev, ...response }));
      setDocuments(prev =>
        prev.map(doc => doc.id === id ? { ...doc, ...response } : doc)
      );
      setError(null);
      return response;
    } catch (err) {
      console.error("Update document error:", err);

      // Gérer spécifiquement l'erreur de permission
      if (err.message.includes("Not authorized to edit")) {
        setError("You don't have permission to edit this document. You can only view it.");
      } else {
        setError(err.message || "Failed to update document");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllDocument = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get("/api/document/all");
      setDocuments(data);
      setError(null);
      return data;
    } catch (err) {
      console.error("Fetch all documents error:", err);
      setError(err.message || "Failed to load all documents");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshDocuments = useCallback((workspaceId = null) => {
    if (workspaceId) {
      return fetchDocuments(workspaceId);
    } else {
      return fetchAllDocument();
    }
  }, [fetchDocuments, fetchAllDocument]);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    createDocument,
    deleteDocument,
    updateDocument,
    fetchDocumentsById,
    specificDocument,
    setSpecificDocument,
    fetchAllDocument,
    refreshDocuments,
  };
};

export default useDocument;