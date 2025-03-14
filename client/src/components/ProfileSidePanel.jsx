import React from "react";

const ProfileSidePanel = ({ handleLogout }) => {
  const { username, email, avatar } = useContext(UserContext);
  return (
    <>
      {/* Left Section (User Information: Avatar, Name, Email, Add Game, Logout Button) */}
      <div className="w-1/3 bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-full w-32 h-32 object-cover border-4 border-yellow-500 shadow-md"
            />
          ) : (
            <div className="bg-yellow-500 rounded-full w-32 h-32 flex justify-center items-center text-white text-4xl shadow-md">
              {username?.charAt(0)}
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800">
          {username}
        </h2>
        <p className="text-center text-gray-600">{email}</p>

        <div className="space-y-4">
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            onClick={() => alert("Add Game functionality here")}
          >
            Add Game
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidePanel;
