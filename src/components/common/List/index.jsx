import PropTypes from "prop-types";

const List = ({
  items,
  renderItem,
  onDeleteItem,
  itemTypeName,
  isLoading,
  error,
  emptyMessage,
  createFormComponent: CreateFormComponent
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4 rounded-lg">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Error loading {itemTypeName.toLowerCase()}: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-base-100 rounded-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-1">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Your {itemTypeName}
          </h2>
          <p className="text-sm text-base-content/70">
            {items.length} {items.length === 1 ? itemTypeName.slice(0, -1) : itemTypeName.toLowerCase()} found
          </p>
        </div>
        {CreateFormComponent && (
          <div className="flex-shrink-0">
            <CreateFormComponent />
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-base-200 border border-base-300 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 bg-base-300/50 flex items-center justify-center rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-base-content/70 text-lg">
            {emptyMessage || `No ${itemTypeName.toLowerCase()} found.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="transform hover:-translate-y-1 transition-all duration-200">
              {renderItem(item, { onDeleteItem })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onCreateItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  itemTypeName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  emptyMessage: PropTypes.string,
  createFormComponent: PropTypes.elementType
};

List.defaultProps = {
  isLoading: false,
  error: null,
  createFormComponent: null
};

export default List;