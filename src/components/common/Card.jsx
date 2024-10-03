import React from "react";

import { IoIosStar } from "react-icons/io";

const Card = ({ data }) => {
  const { title, price, description, category, image } = data;
  const { rate, count } = data.rating;
  return (
    <div className="w-[250px] flex flex-col shadow-md mx-auto my-3 rounded-lg ">
      <div className="relative flex justify-center">
        <img className="object-contain w-40 h-40 " src={image} />
        <p className="absolute top-0 right-0 p-1 bg-[#0acf83]">{category}</p>
      </div>
      <div className="flex flex-col p-2">
        <h2 className="font-bold">{title}</h2>
        <h3 className="text-[#0acf83] font-semibold">USD {price}</h3>
        <div className="flex items-center gap-5 text-gray-400">
          <div className="flex items-center gap-1 text-gray-400">
            <IoIosStar className="text-[#ffc120]" />
            <p>{rate}</p>
          </div>
          <p>{count} Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
