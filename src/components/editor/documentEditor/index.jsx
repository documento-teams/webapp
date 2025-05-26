import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import useDocument from "@/hooks/useDocument";
import DocuEditor from "@/components/common/documentMDXEditor";

const DocumentEditor = () => {
  const { id } = useParams();
  const { fetchDocumentsById, specificDocument } = useDocument();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchDocumentsById(id);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, fetchDocumentsById]);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Chargement du document...</div>;
  }

  if (!specificDocument) {
    return <div>Document non trouvé</div>;
  }

  // Vérification supplémentaire pour s'assurer que specificDocument est chargé
  if (!specificDocument.content) {
    return <div>Le contenu du document est en cours de chargement...</div>;
  }

  return (
    <>
      <h1>Document: {specificDocument.title || id}</h1>
      <pre>{specificDocument.content}</pre>
      {specificDocument.content ? (
        <DocuEditor content={specificDocument.content} />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default DocumentEditor;
