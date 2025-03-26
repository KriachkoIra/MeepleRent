import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, Outlet } from "react-router-dom";

export default function UserPage({ handleLogout }) {
  const { username, email, avatar } = useContext(UserContext);
  const [editableUsername, setEditableUsername] = useState(username);
  const [editableEmail, setEditableEmail] = useState(email);

  const handleSave = () => {
    alert("Збережено!");
  };

  return (
    <div>
      <div className="min-h-screen bg-background flex items-start px-8 justify-center gap-10">
        {/* Left Section (User Information) */}
        <div className="w-1/4 bg-background p-8 space-y-6 sticky top-0">
          <div className="flex justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-full w-40 h-40 object-cover border-4 border-yellow-500 shadow-md"
              />
            ) : (
              <div className="bg-background rounded-full w-40 h-40 flex justify-center items-center text-white text-5xl shadow-md">
                {username?.charAt(0)}
              </div>
            )}
          </div>

          <input
            type="text"
            value={editableUsername}
            onChange={(e) => setEditableUsername(e.target.value)}
            className="w-full text-2xl font-semibold text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
          />
          <input
            type="email"
            value={editableEmail}
            onChange={(e) => setEditableEmail(e.target.value)}
            className="w-full text-center text-gray-600 text-lg border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
          />

          <button
            onClick={handleSave}
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-orange-300 transition-colors text-lg"
          >
            Зберегти зміни
          </button>

          <div className="space-y-4">
            <button
              className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-orange-300 transition-colors text-lg"
              onClick={() => alert("Add Game functionality here")}
            >
              Додати гру
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-500 transition-colors text-lg"
            >
              Вийти
            </button>
          </div>
        </div>

        {/* Right Section (Games, Bookings) */}
        <div className="w-3/4 bg-background rounded-xl mt-8 pr-6 space-y-12 flex flex-col items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
