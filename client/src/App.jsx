import { useContext } from "react";
import Register from "./components/Register.jsx";
import Homepage from "./components/Homepage.jsx";
import axios from "axios";
import { UserContext } from "./context/UserContext.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  const { username } = useContext(UserContext);

  if (username) {
    return <Homepage />;
  }

  return <Register />;
}

export default App;
