import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Register from "./components/Register.jsx";
import Homepage from "./components/Homepage.jsx";
import UserPage from "./components/UserPage.jsx";
import { UserContext } from "./context/UserContext.jsx";

function App() {
  // Set up base URL for axios requests
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  // UserContext: Access the current user's username
  const { username, setUsername, setEmail, setId, setAvatar } = useContext(UserContext);

  const [showUserPage, setShowUserPage] = useState(false);

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

  // Function to handle the "User Page" button click
  const handleUserPageClick = () => {
    setShowUserPage(true);
  };

  // Handle logout
  const handleLogout = () => {
    axios
        .post("/auth/logout")
        .then(() => {
          setUsername(null);
          setEmail(null);
          setId(null);
          setAvatar(null);
          setShowUserPage(false);
        })
        .catch((err) => {
          console.error("Error logging out:", err);
        });
  };

  // Conditional rendering based on user login state
  if (showUserPage) {
    return <UserPage handleLogout={handleLogout} />;
  }

  if (username) {
    // User is logged in, show homepage with user page button
    return (
        <div>
          <Homepage />
          <button
              onClick={handleUserPageClick}
              className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md">
            Go to User Page
          </button>
        </div>
    );
  }

  return <Register />;
}

export default App;
