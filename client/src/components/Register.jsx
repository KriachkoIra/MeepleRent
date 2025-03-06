import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Register() {
  const [email, setEmaiField] = useState("");
  const [username, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { setUsername, setEmail } = useContext(UserContext);

  const registerUser = async (e) => {
    e.preventDefault();

    const link = isRegister ? "/auth/register" : "/auth/login";

    await axios
      .post(link, { email, username, password })
      .then(async (res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .catch((err) => {
        setAlert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div>
      <h3>{isRegister ? "Register" : "Login"}</h3>
      <form onSubmit={(e) => registerUser(e)}>
        <input
          type="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmaiField(e.target.value)}
          required
        />
        {isRegister && (
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsernameField(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {alert && <div>{alert}</div>}
        <button>{isRegister ? "Register" : "Login"}</button>
      </form>
      <div>
        <span>{isRegister ? "Alredy registered?" : "No account yet?"} </span>
        <button onClick={() => setIsRegister((st) => !st)}>
          {isRegister ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}
