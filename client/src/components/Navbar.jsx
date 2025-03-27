import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center h-16">
      <h3 className="text-4xl logo text-amber-400">MeepleRent</h3>
      <div className="flex-1 flex justify-center space-x-4">
        <Link to="/" className="hover:underline">
          Ігри
        </Link>
        <Link to="/about" className="hover:underline">
          Про нас
        </Link>
        <Link to="/contacts" className="hover:underline">
          Контакти
        </Link>
      </div>
      <div>
        <Link to="/profile" className="hover:underline">
          Мій профіль
        </Link>
      </div>
    </nav>
  );
}
