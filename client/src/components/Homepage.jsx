import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { CircleGauge, Clock, PhoneCall, Users } from "lucide-react";
import { DIFFICULTY_MAP } from "../constants";

export default function Homepage() {
  const { username } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState(null);
  const [playersFilter, setPlayersFilter] = useState(null);

  useEffect(() => {
    let link = `http://localhost:3001/games`;

    const params = [];

    if (search) params.push("search=" + search);
    if (sortBy) params.push(sortBy);
    if (priceFilter) params.push("price=" + priceFilter);
    if (difficultyFilter) params.push("difficulty=" + difficultyFilter);
    if (playersFilter) params.push("players=" + playersFilter);

    if (params.length > 0) link += "?" + params.join("&");

    axios
      .get(link)
      .then((res) => {
        setGames(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, sortBy, priceFilter, difficultyFilter, playersFilter]);

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-8 px-20 text-center">
        <input
          value={search}
          type="text"
          placeholder="Пошук за назвою"
          className=" text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 w-54 m-auto"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          value={priceFilter}
          type="text"
          placeholder="Ціна до:"
          className=" text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 w-54 m-auto"
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <select
          value={sortBy}
          className=" text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 w-54 m-auto"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Сортувати за</option>
          <option value="sortBy=name&order=asc">Назва від А до Я</option>
          <option value="sortBy=name&order=desc">Назва від Я до А</option>
          <option value="sortBy=price&order=asc">
            Ціна від нижчої до вищої
          </option>
          <option value="sortBy=price&order=desc">
            Ціна від вищої до нижчої
          </option>
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className=" text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 w-54 m-auto"
        >
          <option value="">Складність</option>
          <option value="low">Легка</option>
          <option value="normal">Помірна</option>
          <option value="high">Складна</option>
        </select>
        <select
          value={playersFilter}
          onChange={(e) => setPlayersFilter(e.target.value)}
          className=" text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 w-54 m-auto"
        >
          <option value="">Кількість гравців</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      {games.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-20 gap-4  mt-8">
          {games.map((game) => (
            <Game key={game._id} item={game} />
          ))}
        </div>
      ) : (
        <p className="text-xl text-center font-semibold mt-10">
          Ігор за вашим запитом не знайдено :(
        </p>
      )}
    </div>
  );
}

function Game({
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
}) {
  return (
    <div className="mb-4">
      <div className="my-game m-auto min-md w-70 bg-background rounded-xl py-5 px-3 flex flex-col h-full">
        <div
          className="my-game__picture w-64 h-64 bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
        ></div>
        {/* This wrapper ensures content takes full space */}
        <div className="flex flex-col flex-grow">
          <div className="my-game__title-desc-wrapper w-full">
            <div className="flex items-center justify-between mt-5">
              <div className="my-game__title text-xl line-clamp-2">{name}</div>
              <div className="my-game__price text-gray-600 font-medium">
                {price}грн/день
              </div>
            </div>
            <div className="my-game__desc mt-2">{description}</div>
          </div>

          {/* Pushes .bottom_data to the bottom */}
          <div className="flex-grow"></div>

          {/* Bottom Section */}
          <div className="bottom_data mt-auto">
            <div className="my-game__time-diff-players-wrapper w-full my-4 flex justify-between">
              <div className="my-game__time flex flex-col items-center">
                <Clock />
                <div className="my-game__time-title">Час</div>
                <div className="my-game__time">{time} хв</div>
              </div>
              <div className="my-game__difficulty flex flex-col items-center">
                <CircleGauge />
                <div className="my-game__difficulty-title">Складність</div>
                <div className="my-game__difficulty-value">
                  {DIFFICULTY_MAP[difficulty]}
                </div>
              </div>
              <div className="my-game__players flex flex-col items-center">
                <Users />
                <div className="my-game__players-title">Гравці</div>
                <div className="my-game__players-value">
                  {minPlayers} - {maxPlayers}
                </div>
              </div>
            </div>
            <div className="my-game__buttons w-full mt-3 text-center">
              <button className="px-3 py-0.5 rounded-lg border-2 border-secondary hover:bg-secondary hover:text-white transition-colors shadow-md">
                Забронювати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
