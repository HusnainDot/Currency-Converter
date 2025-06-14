import React from "react";

const Allcountries = ({ id, name, flag, currencySymbol }) => {
    const shortName = name.length > 15 ? name.slice(0, 20) + "..." : name;

  return (
    <>
      <div className="bg-gray-200 py-3  hover:bg-gray-300 cursor-pointer px-2 flex flex-col gap-2 rounded-md overflow-hidden w-[150px] ">
        <div className="flex items-center  gap-3.5">
          <img src={flag} alt="" className="w-[30px] h-[30px] rounded-full " />

          <h3 className="text-md text-teal-950 font-semibold text-wrap ">
            {name.length > 15 ? name.slice(0, 20) + "..." : name}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Allcountries;
