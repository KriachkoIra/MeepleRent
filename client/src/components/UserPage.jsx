import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Outlet } from "react-router-dom";

export default function UserPage({ handleLogout }) {
    const { username, email, avatar } = useContext(UserContext);
    const [editableUsername, setEditableUsername] = useState(username);
    const [editableEmail, setEditableEmail] = useState(email);

    const handleSave = () => {
        alert("Збережено!");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start py-20 px-8 justify-center space-x-6">
            {/* Left Section (User Information) */}
            <div className="w-1/3 bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="flex justify-center">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="rounded-full w-40 h-40 object-cover border-4 border-yellow-500 shadow-md"
                        />
                    ) : (
                        <div className="bg-yellow-500 rounded-full w-40 h-40 flex justify-center items-center text-white text-5xl shadow-md">
                            {username?.charAt(0)}
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={editableUsername}
                    onChange={(e) => setEditableUsername(e.target.value)}
                    className="w-full text-2xl font-semibold text-center text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500"
                />
                <input
                    type="email"
                    value={editableEmail}
                    onChange={(e) => setEditableEmail(e.target.value)}
                    className="w-full text-center text-gray-600 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500"
                />

                <button
                    onClick={handleSave}
                    className="w-full-center-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Зберегти зміни
                </button>

                <div className="space-y-4">
                    <button
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors text-lg"
                        onClick={() => alert("Add Game functionality here")}>
                        Додати гру
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-lg">
                        Вийти
                    </button>
                </div>
            </div>

            {/* Right Section (Games, Bookings) */}
            <div className=" w-2/3 bg-white rounded-xl shadow-lg p-15 space-y-12 flex flex-col items-center">
                <Outlet/>
            </div>
        </div>
    );
}
