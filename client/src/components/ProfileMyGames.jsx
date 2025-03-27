import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MyGamesGame from "./MyGamesGame";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ProfileNavButtons from "./ProfileNavButtons";
import AddGameEmptyListItem from "./AddGameEmptyListItem";
import "../index.css";

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

  const handleDelete = async (gameId) => {
    setLoading(true);
    try {
      setData(data.filter(({ _id }) => _id != gameId));
      await axios.delete(`/games/${gameId}`);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="profile-my-games flex flex-col w-full">
      <ProfileNavButtons activePage="my-games"/>
      <div className="profile-my-games__list w-full grid grid-cols-1 min-lg:grid-cols-2 gap-15 mt-12">
        {loading && <div>Loading</div>}
        {!loading && data.map((item) => <MyGamesGame item={item} handleDelete={handleDelete} />)}
        {!loading && <AddGameEmptyListItem/>}
      </div>
    </div>
  );
};

export default ProfileMyGames;
