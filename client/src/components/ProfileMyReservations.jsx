import React from "react";
import { useNavigate } from "react-router-dom";

const reservations = [
  {
    title: "Шахи",
    picLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8oljyKn4wkm5qxSr7GibLG_5_Mhm36ObIQ&s",
    ownerName: "Іван Іванов",
    description:
      " Класична стратегічна гра, де вам потрібно продумати кожен хід, щоб перемогти супротивника. ",
    price: 50,
    status: "Орендується",
  },
  {
    title: "Карти: Покер",
    picLink:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS6lcg90R6hEnxTs_Wzga9XHMjlUz1mizagyVG7QSxn5JEWt9jntdNSMC-oX7IUxwZr7f5Lvyl9YsLfHCyCD0M5Krlns-NbvKOy1rYfY8nzcZwcvaBg_Ci25E2KYoXT&usqp=CAc",
    ownerName: "Іван Іванов",
    description:
      "Створіть стратегію, вгадуйте ходи супротивників та вигравайте великі ставки, ставши королем покеру.",
    price: 50,
    status: "Повернено (04.02.21 - 07.02.25)",
  },
  {
    title: "Монополія 3",
    picLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5IHl8ZiCnQXn4KaAGnfRsJHN1k-CINwu_w&s",
    ownerName: "Іван Іванов",
    description:
      "Приймайте розумні рішення і станьте найбагатшою особою на ігровому полі, перемігши всіх своїх суперників!",
    price: 50,
    status: "Повернено (25.02.21 - 27.02.25)",
  },
];

const ProfileMyReservations = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full space-x-20">
        <button
          onClick={() => navigate("/profile")}
          className="w-1/4 border-orange-500 bg-white text-white py-4 rounded-lg transition-colors shadow-md text-lg"
        >
          Мої ігри
        </button>
        <button className="button--outline button--disabled  w-1/4 text-orange-500 py-4 rounded-lg border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors shadow-md text-lg">
          Мої бронювання
        </button>
      </div>
      <div className="flex flex-col justify-center space-x-6 ">
        {reservations.map(
          (
            { title, picLink, price, description, ownerName, status },
            index
          ) => (
            <div key={index} className="mb-6 bg-white rounded-lg shadow-lg p-6 w-full">
              <div className="flex">
                <img src={picLink} alt="pic here" className="w-40 h-40 mr-3" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between ">
                    <div className="">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {title}
                      </h3>
                      <div className="text-red-500">{ownerName}</div>
                    </div>
                    <div className="text-gray-500">{price} грн/день</div>
                  </div>
                  <div className="text-gray-600 mt-4">{description}</div>
                  <div className="mt-4">
                    <span>Статус:&nbsp;</span>
                    <span
                      className={
                        status == "Орендується"
                          ? "text-green-900"
                          : "text-gray-500"
                      }
                    >
                      {status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ProfileMyReservations;
