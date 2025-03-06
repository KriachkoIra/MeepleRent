import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

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
      <p>Hello, {username}!</p>
      <button onClick={logout} className="bg-amber-300 hover:bg-amber-200">
        Вийти
      </button>
    </div>
  );
}
