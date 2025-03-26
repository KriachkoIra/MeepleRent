import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Шахи",
    description:
      " Класична стратегічна гра, де вам потрібно продумати кожен хід, щоб перемогти супротивника. ",
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

const ProfileMyGames = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full gap-6">
        <button
          disabled
          className="w-1/4 bg-primary text-white py-3 rounded-lg transition-colors shadow-md text-lg"
        >
          Мої ігри
        </button>
        <button
          onClick={() => navigate("/profile/my-reservations")}
          className="w-1/4 text-primary py-3 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-md text-lg"
        >
          Мої бронювання
        </button>
      </div>
      <div className="flex justify-center space-x-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-bold">{card.rating}</span>
              <span className="text-gray-400">/ 5</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileMyGames;
