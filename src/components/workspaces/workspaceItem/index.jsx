import PropTypes from "prop-types";
import Button from "@/components/common/button";

const WorkspaceItem = ({ workspace, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      onDelete(workspace.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="card-body w-full p-5">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3 className="card-title text-lg text-purple-700 mb-2">{workspace.name}</h3>
            <p className="text-gray-500 text-sm mb-4">
              {workspace.description || "No description provided"}
            </p>
          </div>
          <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {workspace.updatedAt ? `Updated ${new Date(workspace.updatedAt).toLocaleDateString()}` : ""}
            </span>
            <div className="space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelect(workspace)}
              >
                Open
              </Button>
              <Button
                variant="error"
                size="sm"
                outline
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WorkspaceItem.propTypes = {
  workspace: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default WorkspaceItem;