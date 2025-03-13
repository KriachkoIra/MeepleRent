import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router";

export default function Homepage() {
  const { username, setId, setUsername, setEmail } = useContext(UserContext);

  function logout() {
    axios
      .post(`auth/logout`)
      .then(() => {
        setId(null);
        setUsername(null);
        setEmail(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <p>Вітаємо, {username}!</p>
      <button onClick={logout} className="bg-amber-300 hover:bg-amber-200">
        Вийти
      </button>
      <button className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md">
        <Link to="/profile">Мій профіль</Link>
      </button>
    </div>
  );
}
