import { CircleGauge, Clock, Users } from "lucide-react";
import React from "react";
import { DIFFICULTY_MAP } from "../constants";

const MyGamesGame = ({
  item: {
    image,
    name,
    price,
    description,
    time,
    difficulty,
    minPlayers,
    maxPlayers,
  },
}) => {
  return (
    <div className="my-game min-md w-70">
      <img src={image} className="my-game__picture w-full"></img>
      <div>
        <div className="my-game__title-desc-wrapper w-full">
          <div className="flex items-center justify-between mt-5">
            <div className="my-game__title text-xl line-clamp-2">{name}</div>
            <div className="my-game__price text-gray-600 font-medium">
              {price}грн/день
            </div>
          </div>
          <div className="my-game__desc mt-1">{description}</div>
        </div>
        <div className="my-game__time-diff-players-wrapper w-full my-4 flex justify-between">
          <div className="my-game__time flex-col flex items-center">
            <Clock />
            <div className="my-game__time-title">Час</div>
            <div className="my-game__time">{time} хв</div>
          </div>
          <div className="my-game__difficulty flex-col flex items-center">
            <CircleGauge />
            <div className="my-game__difficulty-title">Складність</div>
            <div className="my-game__difficulty-value">
              {DIFFICULTY_MAP[difficulty]}
            </div>
          </div>
          <div className="my-game__players flex-col flex items-center">
            <Users />
            <div className="my-game__players-title">Гравці</div>
            <div className="my-game__players-value">
              {minPlayers} - {maxPlayers}
            </div>
          </div>
        </div>
        <div className="my-game__buttons w-full flex justify-between mt-3 px-2">
          <button className="px-3 py-0.5  rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-colors shadow-md">
            Редагувати
          </button>
          
          <button className="px-3 py-0.5  rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-md">Видалити</button>
        </div>
      </div>
    </div>
  );
};

export default MyGamesGame;
