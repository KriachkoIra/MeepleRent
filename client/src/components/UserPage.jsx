import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

export default function UserPage({ handleLogout }) {
    const { username, email, avatar } = useContext(UserContext);

    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center">
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

                <h2 className="text-xl font-semibold text-center text-gray-800">{username}</h2>
                <p className="text-center text-gray-600">{email}</p>

                <div className="space-y-4">
                    <button
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        onClick={() => alert("Add Game functionality here")}>
                        Add Game
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Logout
                    </button>
                </div>
            </div>

            {/* Right Section (Buttons for My Games, My Booked Games ) */}
            <div className="w-1/2 flex justify-center items-start space-x-6 mt-6">
                <button
                    onClick={() => alert("My Games functionality here")}
                    className="bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
                    My Games
                </button>

                <button
                    onClick={() => alert("My Booked Games functionality here")}
                    className="bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
                    My Booked Games
                </button>
            </div>
        </div>
    );
}
