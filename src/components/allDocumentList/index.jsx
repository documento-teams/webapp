import { useEffect, useState } from "react";
import List from "@/components/common/List";
import useDocument from "@/hooks/useDocument";
import DocumentItem from "@/components/list/documentItem";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";

const AllDocumentsList = () => {
  const navigate = useNavigate();
  const { documents, loading, error, fetchAllDocument } = useDocument();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    fetchAllDocument();
  }, [fetchAllDocument]);

  const handleSelectDocument = (document) => {
    navigate(`/documents/${document.id}`);
  };

  const renderDocumentItem = (document) => (
    <DocumentItem
      document={document}
      onSelect={handleSelectDocument}
      showAuthor={true}
      showDelete={false}
    />
  );

  const filteredDocuments = Array.isArray(documents) ? documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.content && doc.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAuthor = !selectedAuthor ||
                         (doc.documentAuthor && doc.documentAuthor.fullname.toLowerCase().includes(selectedAuthor.toLowerCase()));
    return matchesSearch && matchesAuthor;
  }) : [];

  const uniqueAuthors = Array.isArray(documents) ?
    [...new Set(documents
      .filter(doc => doc.documentAuthor && doc.documentAuthor.fullname)
      .map(doc => doc.documentAuthor.fullname)
    )] : [];

  return (
    <div className="w-full max-w-full">
      <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-700">
          All Documents
        </h2>
        <p className="text-sm text-gray-600">
          Browse all the documents ({filteredDocuments.length} documents)
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered flex-1"
          />
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
          {(searchTerm || selectedAuthor) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setSelectedAuthor("");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <List
        items={filteredDocuments}
        renderItem={renderDocumentItem}
        itemTypeName="All Documents"
        isLoading={loading}
        error={error}
        emptyMessage={
          searchTerm || selectedAuthor
            ? "No documents match your filters. Try adjusting your search criteria."
            : "No documents found. Create your first document in a workspace!"
        }
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full"
      />
    </div>
  );
};

export default AllDocumentsList;