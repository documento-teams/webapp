const UserProfile = ({ userData }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700">
          User Profile
        </h2>

        <div className="mb-6">
          <p className="text-gray-700font-medium mb-1">Full Name</p>
          <p className="px-4 py-2 border border-gray-200 rounded-lg ">
            {userData?.fullname || "Not specified"}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-1">Email</p>
          <p className="px-4 py-2 border border-gray-200 rounded-lg">
            {userData?.email || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
