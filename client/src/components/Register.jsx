import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Register() {
  const [email, setEmaiField] = useState("");
  const [username, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { setUsername, setEmail, setId, setAvatar } = useContext(UserContext);

  const registerUser = async (e) => {
    e.preventDefault();

    const link = `http://localhost:3001${
      isRegister ? "/auth/register" : "/auth/login"
    }`;

    await axios
      .post(link, { email, username, password })
      .then(async (res) => {
        setId(res.data.id);
        setEmail(res.data.email);
        setAvatar(res.data.avatar);
        setUsername(res.data.username);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setAlert(err.response.data.message);
        } else {
          setAlert("Помилка з підключенням до сервера");
        }
        console.log(err);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/5 bg-my">
        <div className="flex flex-col w-[350px] gap-5 m-auto my-[180px]">
          <h3 className="text-4xl logo text-amber-400">MeepleRent</h3>
          <p className="text-md">Вітаємо! Введи свої дані.</p>
          <form
            onSubmit={(e) => registerUser(e)}
            className="flex flex-col gap-5"
          >
            <input
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmaiField(e.target.value)}
              className="border-b-2 border-black py-2"
              required
            />
            {isRegister && (
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsernameField(e.target.value)}
                className="border-b-2 border-black py-2"
                required
              />
            )}
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-black py-2"
              required
            />
            {alert && <div>{alert}</div>}
            <button className="bg-red-400 hover:bg-red-500 text-white py-2 rounded-md">
              {isRegister ? "Зареєструватися" : "Увійти"}
            </button>
          </form>
          <div>
            <span>
              {isRegister ? "Вже маєш аккаунт?" : "Ще не маєш аккаунта?"}{" "}
            </span>
            <button
              className="text-red-400 hover:text-red-500"
              onClick={() => setIsRegister((st) => !st)}
            >
              {isRegister ? "Увійти" : "Зареєструватися"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-3/5 flex h-screen">
        <div className="w-full h-full bg-red-400 m-auto register-picture"></div>
      </div>
    </div>
  );
}
