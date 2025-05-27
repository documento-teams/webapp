const Sidebar = ({ title, items, footerItems }) => {
  return (
    <div className="w-64 h-screen bg-white shadow-xl rounded-lg pr-4 border-r-2 border-gray-300 flex flex-col justify-between p-4 sticky top-0">
      <div>
        <h2 className="text-2xl font-bold text-purple-700 my-6 text-center">
          {title}
        </h2>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-100 hover:bg-purple-100 transition duration-300 p-3 rounded-lg cursor-pointer"
              onClick={item.action}
            >
              <span className="text-gray-700 font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <ul className="space-y-4">
          {footerItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-100 hover:bg-red-100 transition duration-300 p-3 rounded-lg cursor-pointer mb-3"
              onClick={item.action}
            >
              <span className="text-red-600 font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;