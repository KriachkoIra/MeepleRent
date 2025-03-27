import React from "react";
import { useNavigate } from "react-router-dom";

// activePage: ["my-games", "my-bookings"]
const ProfileNavButtons = ({ activePage }) => {
  const navigate = useNavigate();
  return (
    <div className="profile-nav-buttons flex w-full justify-between lg:justify-start">
      <button
        disabled={activePage == "my-games"}
        onClick={activePage == "my-games" ? () => {} : () => navigate("/profile")}
        className={
          activePage == "my-games"
            ? "w-2/5 lg:w-1/3 max-w-60 bg-primary text-white py-3 rounded-lg transition-colors shadow-md text-lg"
            : "w-2/5 lg:w-1/3 max-w-60 border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-lg transition-colors shadow-md text-lg"
        }
      >
        Мої ігри
      </button>
      <button
        disabled={activePage == "my-bookings"}
        onClick={activePage == "my-games" ? () => navigate("/profile/my-bookings") : () => {}}
        className={
          activePage == "my-games"
            ? "w-2/5 lg:w-1/3 max-w-60 lg:ml-10 text-primary py-3 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-md text-lg"
            : "w-2/5 lg:w-1/3 max-w-60 lg:ml-10 text-white py-3 rounded-lg bg-primary transition-colors shadow-md text-lg"
        }
      >
        Мої бронювання
      </button>
    </div>

    //     <div className="flex w-full gap-6">
    //     <button
    //       onClick={() => navigate("/profile")}
    //       className=""
    //     >
    //       Мої ігри
    //     </button>
    //     <button className=
    //       Мої бронювання
    //     </button>
    //   </div>
  );
};

export default ProfileNavButtons;
