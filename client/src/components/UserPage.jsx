import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

export default function UserPage({ handleLogout }) {
    const { username, email, avatar } = useContext(UserContext);
    const [editableUsername, setEditableUsername] = useState(username);
    const [editableEmail, setEditableEmail] = useState(email);

    const handleSave = () => {
        alert("Збережено!");
    };

    const cards = [
        {
            title: "Шахи",
            description: " Класична стратегічна гра, де вам потрібно продумати кожен хід, щоб перемогти супротивника. ",
            rating: 4.5,
        },
        {
            title: "Карти: Покер",
            description:
                "Створіть стратегію, вгадуйте ходи супротивників та вигравайте великі ставки, ставши королем покеру.",
            rating: 3.8,
        },
        {
            title: "Монополія 3",
            description:
                "Приймайте розумні рішення і станьте найбагатшою особою на ігровому полі, перемігши всіх своїх суперників!",
            rating: 4.2,
        },
    ];

    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center space-x-6">
            {/* Left Section (User Information) */}
            <div className="w-1/2 bg-white rounded-xl shadow-lg p-8 space-y-6">
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
            <div className=" h-1/2 w-1/2 bg-white rounded-xl shadow-lg p-15 space-y-12 flex flex-col items-center">
                <div className="flex w-full space-x-50">
                    <button
                        onClick={() => alert("My Games functionality here")}
                        className="w-1/2 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-md text-lg">
                        Мої ігри
                    </button>
                    <button
                        onClick={() => alert("My Booked Games functionality here")}
                        className="w-1/2 text-orange-500 py-4 rounded-lg border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors shadow-md text-lg">
                        Мої бронювання
                    </button>
                </div>
                <div className="flex justify-center space-x-6 ">
                    {cards.map((card, index) => (
                        <div key={index} className="w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                            <p className="text-gray-600">{card.description}</p>
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-500 font-bold">{card.rating}</span>
                                <span className="text-gray-400">/ 5</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
