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
  const [deleteId, setDeleteId] = useState(null);
  const { id } = useContext(UserContext);

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
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      setData(data.filter(({ _id }) => _id != deleteId));
      await axios.delete(`/games/${deleteId}`);
      setDeleteId(null);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="profile-my-games flex flex-col w-full">
      {deleteId && (
        <div className="fixed top-6 right-4 bg-white p-4 rounded-xl border-b-2 border-primary">
          <p>Ви точно хочете видалити гру?</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-primary hover:bg-red-500 text-white rounded-xl w-full"
            >
              Так
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className="px-2 py-1 bg-secondary hover:bg-orange-300 text-white rounded-xl w-full"
            >
              Ні
            </button>
          </div>
        </div>
      )}
      <ProfileNavButtons activePage="my-games" />
      <div className="profile-my-games__list w-full grid grid-cols-1 min-lg:grid-cols-2 gap-15 mt-12">
        {loading && <div>Loading</div>}
        {!loading &&
          data.map((item) => (
            <MyGamesGame key={item._id} item={item} setDeleteId={setDeleteId} />
          ))}
        {!loading && <AddGameEmptyListItem />}
      </div>
    </div>
  );
};

export default ProfileMyGames;
