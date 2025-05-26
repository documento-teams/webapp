import PropTypes from "prop-types";
import Button from "@/components/common/button";

const DocumentItem = ({ document, onSelect, onDelete, showAuthor = false }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this document?")) {
      onDelete(document.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-min-full">
      <div className="card-body w-full p-5">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3 className="card-title text-lg text-purple-700 mb-2">{document.name}</h3>
            {showAuthor && document.documentAuthor && (
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">
                👤 {document.documentAuthor.fullname}
              </div>
            )}
            {document.content && (
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {document.content.substring(0, 300)}...
              </p>
            )}
            {document.updatedAt && (
              <div className="text-xs text-gray-400">
                Updated: {new Date(document.updatedAt).toLocaleDateString()}
            {document.documentAuthor && (
              <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {document.documentAuthor.fullname}
              </div>
            )}
          </div>
          <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <div className="space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelect(document)}
              >
                Open
              </Button>
              <Button variant="error" size="sm" outline onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string,
    updatedAt: PropTypes.string,
    documentAuthor: PropTypes.shape({
      fullname: PropTypes.string,
    }),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAuthor: PropTypes.bool
};

export default DocumentItem;
