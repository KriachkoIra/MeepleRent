import React from "react";
import { STATUS_MAP } from "../constants";

const MyBookingsBooking = ({
  item: { _id, user: { username }, status, startDate, endDate, game: { name, price, image } },
}) => {
  return (
    <div key={_id} className="mb-6 bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex">
        <img src={image} alt="pic here" className="w-40 h-40 mr-3" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between ">
            <div className="">
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <div className="text-red-500">{username}</div>
            </div>
            <div className="text-gray-500">{price} грн/день</div>
          </div>
          {/* <div className="text-gray-600 mt-4">{description}</div> */}
          <div className="mt-4">
            <span>Статус:&nbsp;</span>
            <span className={`${STATUS_MAP[status].textColor}`}>
              {STATUS_MAP[status].title}
            </span>
          </div>
          <div className="mt-4">
            {new Date(startDate).toLocaleString()} - {new Date(endDate).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsBooking;
