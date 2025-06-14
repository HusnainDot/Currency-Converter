import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Allcountries from "./Allcountries";
import { MdOutlineSwapVert } from "react-icons/md";

const ConverterConteiner = () => {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const allCountries =
    "https://gist.githubusercontent.com/portapipe/a28cd7a9f8aa3409af9171480efcc090/raw/";
  const [countries, setCountries] = useState([]);

  const allCountry = async () => {
    const response = await fetch(allCountries);
    const allData = await response.json();
    setCountries(allData);
    console.log(allData);
  };

  useEffect(() => {
    allCountry();
  }, []);
  return (
    <>
      <div className="container bg-gray-300 w-[98%] py-10 rounded-2xl mx-auto my-5 flex items-center justify-center px-4">
        <div className=" w-full md:w-[50%] lg:w-[40%] p-5 bg-blue-200 rounded-2xl">
          <h2 className="text-center text-2xl text-teal-900 font-semibold">
            Currency Converter
          </h2>

          {/* From  */}

          <div className="w-full">
            <span className="text-lg text-teal-950 font-semibold">Form</span>
            <div className="flex items-center justify-between border-[1px] border-teal-950 w-full h-[60px] px-3 rounded-xl">
              <input
                type="text"
                placeholder="Enter Amount "
                className="outline-0 text-xl pr-8 bg-transparent"
              />

              {/* Countries DropDown */}

              <div className="  text-gray-700 flex gap-3 items-center relative">
                <div className="flex items-center gap-3">
                  <img
                    src=""
                    className="w-[40px] h-[40px] rounded-full"
                    alt=""
                  />

                  <span className="text-xl text-teal-950 font-semibold">
                    code
                  </span>
                </div>

                <FaAngleDown
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                  size={25}
                  className="cursor-pointer active:scale-95"
                />

                <div
                  className={`mt-3  z-10 overflow-y-auto space-y-2 bg-white  rounded-md shadow absolute  right-0 top-5    overflow-hidden transition-all duration-150  ${
                    showFromDropdown ? "max-h-60 p-2" : "p-0 max-h-0"
                  } `}
                >
                  {countries?.map((country, index) => (
                    <Allcountries
                      key={index}
                      id={country.id}
                      name={country.name}
                      currency={country.currency?.name}
                      currencySymbol={country.currency?.symbol}
                      currencyCode={country.currency?.code}
                      flag={`data:image/png;base64,${country.flag}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <span className=" flex items-center w-full justify-center mt-4">
            <MdOutlineSwapVert
              size={30}
              className="text-teal-900 text-center"
            />
          </span>
          {/* To */}
          <div className="w-full">
            <span className="text-lg text-teal-950 font-semibold">To</span>
            <div className="flex items-center justify-between border-[1px] border-teal-950 w-full h-[60px] px-3 rounded-xl">
              <input
                type="text"
                placeholder="Enter Amount "
                className="outline-0 text-xl pr-8 bg-transparent"
              />

              {/* Countries DropDown */}

              <div className="  text-gray-700 flex gap-3 items-center relative">
                <div className="flex items-center gap-3">
                  <img
                    src=""
                    className="w-[40px] h-[40px] rounded-full"
                    alt=""
                  />

                  <span className="text-xl text-teal-950 font-semibold">
                    code
                  </span>
                </div>

                <FaAngleDown
                  onClick={() => setShowToDropdown(!showToDropdown)}
                  size={25}
                  className="cursor-pointer active:scale-95"
                />

                <div
                  className={`mt-3  transition-all duration-150  overflow-y-auto space-y-2 bg-white  rounded-md shadow absolute right-0 top-5    overflow-hidden ${
                    showToDropdown ? "max-h-60 p-2" : "p-0 max-h-0"
                  }`}
                >
                  {countries?.map((country, index) => (
                    <Allcountries
                      key={index}
                      id={country.id}
                      name={country.name}
                      currency={country.currency?.name}
                      currencySymbol={country.currency?.symbol}
                      currencyCode={country.currency?.code}
                      flag={`data:image/png;base64,${country.flag}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="bg-gray-50 px-2 py-4 rounded-md text-2xl font-semibold  text-center mx-auto w-[60%]  my-4 block">
            Exchange
          </button>

          <h5 className="bg-gray-50 px-2 py-4 rounded-md text-2xl font-semibold  text-center mx-auto w-[60%]  my-4 block">
            1 USD = 270 PKR{" "}
          </h5>
        </div>
      </div>
    </>
  );
};

export default ConverterConteiner;
