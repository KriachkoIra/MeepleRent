import React from "react";
import { useNavigate } from "react-router-dom";

const AddGameEmptyListItem = () => {
  const navigate = useNavigate();
  return (
    // <div className="w-full h-full flex items-start justify-center bg-[#f0f2e6] hover:bg-[#e9ebe0] cursor-pointer rounded-4xl">
    <div key={1} className="my-game bg-[#f0f2e6] rounded-xl overflow-hidden">
    <button
      className="w-full h-full aspect-square text-[80px]  text-[#7e7e7e] py-2 rounded-4xl  transition-colors text-lg"
      onClick={() => navigate("/add-game")}
    >
      +
    </button>
    </div>
  );
};

export default AddGameEmptyListItem;
