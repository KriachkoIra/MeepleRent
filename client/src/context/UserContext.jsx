import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/auth/verify", { withCredentials: true })
      .then((res) => {
        setId(res.data.id);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setAvatar(res.data.avatar);
      })
      .catch((err) => {
        setId(null);
        setUsername(null);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        id,
        setId,
        email,
        setEmail,
        username,
        setUsername,
        avatar,
        setAvatar,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
