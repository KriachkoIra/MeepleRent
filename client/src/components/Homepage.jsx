import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Homepage() {
    const { username, setId, setUsername, setEmail } = useContext(UserContext);

    function logout() {
        axios
            .post(`auth/logout`)
            .then(() => {
                setId(null);
                setUsername(null);
                setEmail(null);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {/* Навігаційне меню */}
            <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
                <h3 className="text-4xl logo text-amber-400">MeepleRent</h3>
                <div className="flex-1 flex justify-center space-x-4">
                    <Link to="/games" className="hover:underline">Ігри</Link>
                    <Link to="/about" className="hover:underline">Про нас</Link>
                    <Link to="/contacts" className="hover:underline">Контакти</Link>
                </div>
                <div>
                    <Link to="/profile" className="hover:underline">Мій профіль</Link>
                </div>
            </nav>

            {/* Вміст сторінки */}
            <div className="p-4">
                <p>Вітаємо, {username}!</p>
                <button onClick={logout} className="bg-amber-300 hover:bg-amber-200 py-2 px-4 rounded-md mt-4">
                    Вийти
                </button>
            </div>
        </div>
    );
}
