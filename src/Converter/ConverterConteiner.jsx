import React, { useEffect, useState } from "react";
import Allcountries from "./Allcountries";
import { MdOutlineSwapVert } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const ConverterConteiner = () => {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);

  const [allCountries, setAllCountries] = useState([]);

  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const countriesApi =
    "https://gist.githubusercontent.com/portapipe/a28cd7a9f8aa3409af9171480efcc090/raw/";

  const fetchCountries = async () => {
    const res = await fetch(countriesApi);
    const data = await res.json();
    setAllCountries(data);

    // Auto-set default countries: Pakistan → India
    const pakistan = data.find((c) => c.currency?.code === "PKR");
    const india = data.find((c) => c.currency?.code === "INR");

    setFromCountry({
      flag: `data:image/png;base64,${pakistan.flag}`,
      code: pakistan.currency.code,
    });

    setToCountry({
      flag: `data:image/png;base64,${india.flag}`,
      code: india.currency.code,
    });
  };

  const convertCurrency = async () => {
    if (!fromCountry?.code || !toCountry?.code) return;

    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/e62cf696f9f47ade9e515e6b/latest/${fromCountry.code}`
    );
    const data = await res.json();

    const rate = data.conversion_rates[toCountry.code];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  const handleSwap = () => {
    const temp = fromCountry;
    setFromCountry(toCountry);
    setToCountry(temp);
    setConvertedAmount(null);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="container bg-gray-300 w-[98%] py-10 rounded-2xl mx-auto my-5 flex items-center justify-center px-4">
      <div className="w-full md:w-[50%] lg:w-[40%] p-5 bg-blue-200 rounded-2xl">
        <h2 className="text-center text-2xl text-teal-900 font-semibold">
          Currency Converter
        </h2>

        {/* FROM Section */}
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold text-teal-950">From</h3>
          <div className="w-full p-3 border border-teal-950 rounded-md flex items-center justify-between">
            <input
              type="number"
              placeholder="Enter Amount"
              className="outline-0 bg-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex items-center gap-4">
              <div
                className={`items-center gap-3 ${
                  fromCountry?.flag ? "flex" : "hidden"
                }`}
              >
                <img
                  src={fromCountry?.flag || ""}
                  alt=""
                  className="w-[40px] min-h-[35px] rounded-lg object-contain"
                />
                <h3 className="text-md text-teal-950 font-semibold">
                  {fromCountry?.code || "code"}
                </h3>
              </div>

              <div className="relative">
                <IoIosArrowDown
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                  size={25}
                  className="hover:scale-110 cursor-pointer"
                />
                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-10 bg-gray-200 rounded-2xl overflow-y-scroll transition-all duration-200 z-10 ${
                    showFromDropdown
                      ? "max-h-[300px] min-w-[250px]"
                      : "max-h-0 min-w-0"
                  }`}
                >
                  <div className="flex flex-col">
                    {allCountries.map((obj, i) => (
                      <Allcountries
                        {...obj}
                        key={i}
                        onSelect={() => {
                          setFromCountry({
                            flag: `data:image/png;base64,${obj.flag}`,
                            code: obj.currency?.code || "",
                          });
                          setShowFromDropdown(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <span className="flex items-center w-full justify-center mt-4">
          <MdOutlineSwapVert
            size={30}
            className="text-teal-900 text-center cursor-pointer hover:scale-110"
            onClick={handleSwap}
          />
        </span>

        {/* TO Section */}
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold text-teal-950">To</h3>
          <div className="w-full p-3 border border-teal-950 rounded-md flex items-center justify-between">
            <input
              type="text"
              placeholder="Converted Amount"
              className="outline-0 bg-transparent"
              readOnly
              value={convertedAmount || ""}
            />

            <div className="flex items-center gap-4">
              <div
                className={`items-center gap-3 ${
                  toCountry ? "flex" : "hidden"
                }`}
              >
                <img
                  src={toCountry?.flag || ""}
                  alt=""
                  className="w-[40px] min-h-[35px] rounded-lg object-contain"
                />
                <h3 className="text-md text-teal-950 font-semibold">
                  {toCountry?.code || "code"}
                </h3>
              </div>

              <div className="relative">
                <IoIosArrowDown
                  onClick={() => setShowToDropdown(!showToDropdown)}
                  size={25}
                  className="hover:scale-110 cursor-pointer"
                />
                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-10 bg-gray-200 rounded-2xl overflow-y-scroll transition-all duration-200 z-10 ${
                    showToDropdown
                      ? "max-h-[300px] min-w-[250px]"
                      : "max-h-0 min-w-0"
                  }`}
                >
                  <div className="flex flex-col">
                    {allCountries.map((obj, i) => (
                      <Allcountries
                        {...obj}
                        key={i}
                        onSelect={() => {
                          setToCountry({
                            flag: `data:image/png;base64,${obj.flag}`,
                            code: obj.currency?.code || "",
                          });
                          setShowToDropdown(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Button */}
        <button
          onClick={convertCurrency}
          className="bg-teal-500 text-white px-2 py-4 rounded-md text-2xl font-semibold text-center mx-auto w-[60%] my-4 block cursor-pointer"
        >
          Exchange
        </button>

        {/* Result */}
        {convertedAmount && (
          <h5 className="bg-teal-500 text-white px-2 py-4 rounded-md text-2xl font-semibold text-center mx-auto w-[60%] my-4 block">
            {amount} {fromCountry.code} = {convertedAmount} {toCountry.code}
          </h5>
        )}
      </div>
    </div>
  );
};

export default ConverterConteiner;
