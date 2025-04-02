import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import axios from "axios";

export default function EditGamePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("low");
  const [minPlayers, setMinPlayers] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`games/${id}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setDescription(res.data.description);
        setDifficulty(res.data.difficulty);
        setMinPlayers(Number(res.data.minPlayers));
        setMaxPlayers(Number(res.data.maxPlayers));
        setTime(Number(res.data.time));
        setPrice(Number(res.data.price));
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageChange = (e) => {
    setImageChanged(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImage(null);

  const handleAdd = async () => {
    // todo: validation
    try {
      const formData = new FormData();
      if (imageChanged) formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("time", time);
      formData.append("difficulty", difficulty);
      formData.append("minPlayers", minPlayers);
      formData.append("maxPlayers", maxPlayers);
      formData.append("price", price);
      console.log(image);
      await axios.patch(`games/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
    } catch (e) {
      console.log("Error e", e);
      // todo: handle error properly
    }
  };

  return (
    <div className="overflow-hidden h-[calc(100vh-64px)] bg-background py-12">
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
          onClick={handleAdd}
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-orange-300 w-48"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}
