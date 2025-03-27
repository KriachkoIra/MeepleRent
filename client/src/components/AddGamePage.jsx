import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddGamePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("low");
  const [minPlayers, setMinPlayers] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImage(reader.result);
    }
  };

  const removeImage = () => setImage(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    const link = `http://localhost:3001/games`;

    console.log(image);

    await axios
      .post(link, {
        name,
        description,
        difficulty,
        minPlayers,
        maxPlayers,
        time,
        price,
        image,
      })
      .then(async (res) => {
        alert("Гру успішно додано!");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert("Помилка: " + err.response.data.message);
        } else {
          alert("Помилка з підключенням до сервера");
        }
        console.log(err);
      });
  };

  return (
    <div className="overflow-hidden h-[calc(100vh-64px)] bg-background py-12">
      <form onSubmit={handleAdd}>
        <div className="w-full px-32 pr-52">
          <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-500 rounded-lg w-1/3 h-50">
            {!image ? (
              <label className="cursor-pointer flex flex-col h-full items-center p-4 mt-auto text-gray-500">
                <span className="text-sm text-center">
                  Натисни чи перетягни фото, щоб завантажити його
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-white rounded-full"
                >
                  <XCircle className="text-red-500 w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex px-32 gap-20 mt-10">
          <div className="flex flex-col w-1/3 gap-10">
            <input
              type="number"
              value={time}
              required
              placeholder="Час гри у хвилинах"
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
            />
            <select
              name="difficulty"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
            >
              <option value="low">Низька складність</option>
              <option value="normal">Середня складність</option>
              <option value="high">Висока складність</option>
            </select>
            <div className="w-full flex justify-between">
              <input
                type="number"
                required
                value={minPlayers}
                onChange={(e) => setMinPlayers(e.target.value)}
                placeholder="Мін. к-сть гравців"
                className="text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <span>-</span>
              <input
                type="number"
                required
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                placeholder="Макс. к-сть гравців"
                className="text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <input
              required
              type="number"
              value={price}
              placeholder="Ціна подобово"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="flex flex-col w-2/3 gap-10">
            <input
              required
              type="text"
              value={name}
              placeholder="Назва гри"
              onChange={(e) => setName(e.target.value)}
              className="w-full text-center text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500"
            />
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="7"
              cols="50"
              className="h-full  text-gray-700 border-b-2 pb-2 border-gray-500 focus:outline-none focus:border-yellow-500 resize-none"
              placeholder="Опис гри"
            ></textarea>
          </div>
        </div>
        <div className="flex px-32 gap-20 mt-10 justify-between">
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-500 w-48"
            onClick={() => navigate("/profile")}
          >
            Скасувати
          </button>
          <button
            className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-orange-300 w-48"
            type="Submit"
          >
            Додати
          </button>
        </div>
      </form>
    </div>
  );
}
