import { useContext, useEffect, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./context/UserContext.jsx";

const Register = lazy(() => import("./components/Register.jsx"));
const Homepage = lazy(() => import("./components/Homepage.jsx"));
const UserPage = lazy(() => import("./components/UserPage.jsx"));
const ProfileMyGames = lazy(() => import("./components/ProfileMyGames.jsx"));
const ProfileMyReservations = lazy(() => import("./components/ProfileMyReservations.jsx"));
const RouteNotFound = lazy(() => import("./components/RouteNotFound.jsx"));

function App() {
  // Set up base URL for axios requests
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  // UserContext: Access the current user's username
  const { username, setUsername, setEmail, setId, setAvatar } =
    useContext(UserContext);

  useEffect(() => {
    // Check if the user is already logged in (via UserContext or session)
    axios
      .get("/auth/verify")
      .then((res) => {
        // Set user details in context if authenticated
        setUsername(res.data.username);
        setEmail(res.data.email);
        setId(res.data.id);
        setAvatar(res.data.avatar);
      })
      .catch(() => {
        // Clear user context if not logged in
        setUsername(null);
        setEmail(null);
        setId(null);
        setAvatar(null);
      });
  }, [setUsername, setEmail, setId, setAvatar]);

  // // Function to handle the "User Page" button click
  // const handleUserPageClick = () => {
  //   setShowUserPage(true);
  // };

  // // Handle logout
  // const handleLogout = () => {
  //   axios
  //     .post("/auth/logout")
  //     .then(() => {
  //       setUsername(null);
  //       setEmail(null);
  //       setId(null);
  //       setAvatar(null);
  //       setShowUserPage(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error logging out:", err);
  //     });
  // };

  if (username) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<UserPage />} >
              <Route default path={"/profile"} element={<ProfileMyGames />} />
              <Route path={"/profile/my-reservations"} element={<ProfileMyReservations />} />
          </Route>
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <Register />;
}

export default App;
