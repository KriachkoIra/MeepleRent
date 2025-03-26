import { useContext } from "react";
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
      <div className="p-4">
        <p>Вітаємо, {username}!</p>
        <button
          onClick={logout}
          className="bg-amber-300 hover:bg-amber-200 py-2 px-4 rounded-md mt-4"
        >
          Вийти
        </button>
      </div>
    </div>
  );
}
