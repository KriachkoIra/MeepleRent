import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Homepage() {
  const { email, username } = useContext(UserContext);

  return <div>Hello, {username}!</div>;
}
