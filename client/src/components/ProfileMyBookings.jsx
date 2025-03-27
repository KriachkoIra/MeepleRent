import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyBookingsBooking from "./MyBookingsGame";
import axios from "axios";
import ProfileNavButtons from "./ProfileNavButtons";

// const reservations = [
//   {
//     title: "Шахи",
//     picLink:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW8oljyKn4wkm5qxSr7GibLG_5_Mhm36ObIQ&s",
//     ownerName: "Іван Іванов",
//     description:
//       " Класична стратегічна гра, де вам потрібно продумати кожен хід, щоб перемогти супротивника. ",
//     price: 50,
//     status: "Орендується",
//   },
//   {
//     title: "Карти: Покер",
//     picLink:
//       "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS6lcg90R6hEnxTs_Wzga9XHMjlUz1mizagyVG7QSxn5JEWt9jntdNSMC-oX7IUxwZr7f5Lvyl9YsLfHCyCD0M5Krlns-NbvKOy1rYfY8nzcZwcvaBg_Ci25E2KYoXT&usqp=CAc",
//     ownerName: "Іван Іванов",
//     description:
//       "Створіть стратегію, вгадуйте ходи супротивників та вигравайте великі ставки, ставши королем покеру.",
//     price: 50,
//     status: "Повернено (04.02.21 - 07.02.25)",
//   },
//   {
//     title: "Монополія 3",
//     picLink:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5IHl8ZiCnQXn4KaAGnfRsJHN1k-CINwu_w&s",
//     ownerName: "Іван Іванов",
//     description:
//       "Приймайте розумні рішення і станьте найбагатшою особою на ігровому полі, перемігши всіх своїх суперників!",
//     price: 50,
//     status: "Повернено (25.02.21 - 27.02.25)",
//   },
// ];

const ProfileMyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`/bookings`);
        setBookings(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="profile-my-bookings w-full">
      <ProfileNavButtons activePage="my-bookings"/>
      <div className="flex w-full flex-col space-x-6 mt-12">
        {bookings.map((item) => (
          <MyBookingsBooking item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProfileMyBookings;
