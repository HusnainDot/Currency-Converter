import React from "react";

const Allcountries = ({ name, flag, onSelect }) => {
  const shortName = name.length > 10 ? name.slice(0, 20) + "..." : name;

  return (
    <div
      onClick={onSelect}
      className="bg-gray-200 py-3 hover:bg-gray-300 cursor-pointer px-2 rounded-md  w-full "
    >
      <div className="flex items-center gap-3.5">
        <img
          src={`data:image/png;base64,${flag}`}
          alt=""
          className="w-[40px] min-h-[35px] rounded-xl object-contain"
        />
        <h3 className="text-md text-teal-950 font-semibold ">{shortName}</h3>
      </div>
    </div>
  );
};

export default Allcountries;
