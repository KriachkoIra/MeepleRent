import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, Outlet } from "react-router-dom";
import { FaCog } from "react-icons/fa";

export default function UserPage({ handleLogout }) {
    const { username, email, avatar } = useContext(UserContext);
    const [editableUsername, setEditableUsername] = useState(username);
    const [editableEmail, setEditableEmail] = useState(email);

    const handleSave = () => {
        alert("Збережено!");
    };

    return (
        <div>
            {/* Навігаційне меню */}
            <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
                <h3 className="text-4xl logo text-amber-400">MeepleRent</h3>
                <div className="flex-1 flex justify-center space-x-4">
                    <Link to="/games" className="hover:underline">Ігри</Link>
                    <Link to="/about" className="hover:underline">Про нас</Link>
                    <Link to="/contacts" className="hover:underline">Контакти</Link>
                </div>
                <div>
                    <Link to="/profile" className="hover:underline">Мій профіль</Link>
                </div>
            </nav>

            <div className="min-h-screen bg-yellow-50 flex items-start py-20 px-8 justify-center space-x-6">
                {/* Left Section (User Information) */}
                <div className="w-1/3 bg-yellow-50 rounded-xl shadow-lg p-8 space-y-6">
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
                        className="w-full-center-2 bg-purple-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Зберегти зміни
                    </button>

                    <div className="space-y-4">
                        <button
                            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors text-lg"
                            onClick={() => alert("Add Game functionality here")}
                        >
                            Додати гру
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-lg">
                            Вийти
                        </button>

                    </div>
                </div>

                {/* Right Section (Games, Bookings) */}
                <div className="w-2/3 bg-yellow-50 rounded-xl shadow-lg p-15 space-y-12 flex flex-col items-center">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
