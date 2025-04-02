import { CircleGauge, Clock, Users } from "lucide-react";
import React from "react";
import { DIFFICULTY_MAP } from "../constants";

const MyGamesGame = ({
  item: {
    _id,
    image,
    name,
    price,
    description,
    time,
    difficulty,
    minPlayers,
    maxPlayers,
  },
  setDeleteId,
}) => {
  return (
    <div key={_id} className="my-game bg-[#f0f2e6] rounded-xl overflow-hidden">
      <img
        src={image}
        className="my-game__picture w-auto aspect-square object-cover overflow-hidden"
      ></img>
      <div className="my-game__info-wrapper px-4 py-5">
        <div className="my-game__title-desc-wrapper w-full">
          <div className="flex items-center justify-between">
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
              {DIFFICULTY_MAP[difficulty] || "Помірна"}
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
        <div className="my-game__buttons w-full flex justify-between mt-3">
          <button className="w-[45%] min-w-24 py-0.5 rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-colors shadow-md">
            Редагувати
          </button>

          <button
            onClick={() => setDeleteId(_id)}
            className="w-[45%] min-w-24 py-0.5 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-md"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyGamesGame;
