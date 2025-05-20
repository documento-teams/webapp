import PropTypes from "prop-types";

const WorkspaceItem = ({ workspace, onSelect, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      onDelete(workspace.id);
    }
  };

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <h3 className="card-title text-lg">{workspace.name}</h3>
        <div className="card-actions justify-end mt-2">
          <button
            onClick={() => onSelect(workspace)}
            className="btn btn-sm btn-outline"
          >
            Open
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

WorkspaceItem.propTypes = {
  workspace: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default WorkspaceItem;