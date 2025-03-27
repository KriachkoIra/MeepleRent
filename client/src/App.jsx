import { useContext, useEffect, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./context/UserContext.jsx";
import Navbar from "./components/Navbar.jsx";
import AddGamePage from "./components/AddGamePage.jsx";

const Register = lazy(() => import("./components/Register.jsx"));
const Homepage = lazy(() => import("./components/Homepage.jsx"));
const UserPage = lazy(() => import("./components/UserPage.jsx"));
const ProfileMyGames = lazy(() => import("./components/ProfileMyGames.jsx"));
const ProfileMyReservations = lazy(() =>
  import("./components/ProfileMyReservations.jsx")
);
const RouteNotFound = lazy(() => import("./components/RouteNotFound.jsx"));

function App() {
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  const { username, setUsername, setEmail, setId, setAvatar } =
    useContext(UserContext);

  useEffect(() => {
    axios
      .get("/auth/verify")
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setId(res.data.id);
        setAvatar(res.data.avatar);
      })
      .catch(() => {
        setUsername(null);
        setEmail(null);
        setId(null);
        setAvatar(null);
      });
  }, [setUsername, setEmail, setId, setAvatar]);

  if (username) {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<UserPage />}>
            <Route default path={"/profile"} element={<ProfileMyGames />} />
            <Route
              path={"/profile/my-reservations"}
              element={<ProfileMyReservations />}
            />
          </Route>
          <Route path="add-game" element={<AddGamePage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <Register />;
}

export default App;
