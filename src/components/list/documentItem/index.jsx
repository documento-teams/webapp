import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Button from "@/components/common/button";

const DocumentItem = ({ document, onSelect, onDelete, showAuthor = false, showDelete = true, userPermissions = null }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(t("document.confirmDelete"))) {
      onDelete(document.id);
    }
  };
  const { t } = useTranslation();
  const canDelete = showDelete && (userPermissions?.canDelete ?? true);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-full max-w-full">
      <div className="card-body w-full p-5">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="card-title text-lg text-purple-700">{document.name}</h3>
              {userPermissions?.readOnly && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  👁️ {t("document.viewOnly")}
                </span>
              )}
            </div>
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
                {t("document.updated")}: {new Date(document.updatedAt).toLocaleDateString()}
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
                {userPermissions?.readOnly ? t("common.view") : t("common.open")}
              </Button>
              {canDelete && (
                <Button
                  variant="error"
                  size="sm"
                  outline
                  onClick={handleDelete}
                >
                  {t("common.delete")}
                </Button>
              )}
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
  showAuthor: PropTypes.bool,
  showDelete: PropTypes.bool,
  userPermissions: PropTypes.shape({
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    readOnly: PropTypes.bool,
  }),
};

export default DocumentItem;