import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center h-16">
      <div className="flex-1 flex items-center gap-8">
        <h3 className="text-4xl logo text-amber-400">MeepleRent</h3>
        <Link to="/" className="hover:underline font-semibold">
          Ігри
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/chat" className="hover:underline flex items-center">
          <MessageSquare className="mr-1" />
          Чат
        </Link>
        <Link to="/profile" className="hover:underline">
          Мій профіль
        </Link>
      </div>
    </nav>
  );
}
