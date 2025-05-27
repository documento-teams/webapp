import { useState, useCallback } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

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
      if (data.length === 0) {
        toast.error("No documents found");
      } else { 
        toast.success("Documents loaded successfully");
      }
    } catch (err) {
      console.error("Fetch documents error:", err);
      setError(err.message || "Failed to load documents");
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
    } catch (err) {
      console.error("Fetch document error:", err);
      setError(err.message || "Failed to load document");
    } finally {
      setLoading(false);
    }
  }, []);

  const createDocument = useCallback(async (documentData) => {
    try {
      if (!documentData.content) {
        documentData.content = "#Hello World";
      }
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

  const updateDocument = useCallback(async (documentData) => {
    try {
      setLoading(true);
      const { id, ...data } = documentData;
      console.log(typeof id, data);
      const response = await api.put(`/api/document/update/${id}`, data);
      setSpecificDocument(prev => ({ ...prev, ...response }));
      setError(null);
      return response;
    } catch (err) {
      console.error("Update document error:", err);
      setError(err.message || "Failed to update document");
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
    } catch (err) {
      console.error("Fetch all documents error:", err);
      setError(err.message || "Failed to load all documents");
    } finally {
      setLoading(false);
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
    fetchDocumentsById,
    specificDocument,
    setSpecificDocument,
    fetchAllDocument,
  };
};

export default useDocument;
