import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MyGamesGame from "./MyGamesGame";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileMyGames = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`/users/${id}`);
        setData(response.games);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col px-10">
      <div className="flex w-full">
        <button
          disabled
          className="w-1/4 bg-primary text-white py-3 rounded-lg transition-colors shadow-md text-lg"
        >
          Мої ігри
        </button>
        <button
          onClick={() => navigate("/profile/my-reservations")}
          className="w-1/4 ml-10 text-primary py-3 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-md text-lg"
        >
          Мої бронювання
        </button>
      </div>
      <div className="flex flex-wrap justify-between gap-15 -mr-15 mt-12">
        {loading && <div>Loading</div>}
        {!loading && data.map((item) => <MyGamesGame item={item} />)}
      </div>
    </div>
  );
};

export default ProfileMyGames;
