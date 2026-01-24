"use client";

import React, { useState } from "react";
import { FaSmile, FaPlane, FaStar, FaUserTie } from "react-icons/fa";
import { useGetCounterQuery } from "../../../../store/counterApi/counterApi";
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Dadra & Nagar Haveli",
  "Daman & Diu",
  "Lakshadweep",
  "Andaman & Nicobar Islands",
];

const MapTabs = () => {
  const [activeTab, setActiveTab] = useState("india");
  const [selection, setSelection] = useState("All destinations");

  // Determine dropdown options based on activeTab
  const dropdownOptions =
    activeTab === "india"
      ? ["All destinations", "India", ...states]
      : ["All destinations", "World"];
  const {
    data: counter,
    isLoading: counterLoading,
    isError: counterError,
  } = useGetCounterQuery();
  if (counterLoading) {
    return <p>loading</p>;
  }
  if (counterError) {
    return <p>error</p>;
  }

  console.log(counter);
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* Left Side - Tabs + Map */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 text-center py-2 font-medium ${
                activeTab === "india"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("india");
                setSelection("All destinations");
              }}
            >
              India
            </button>
            <button
              className={`flex-1 text-center py-2 font-medium ${
                activeTab === "world"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("world");
                setSelection("All destinations");
              }}
            >
              World
            </button>
          </div>

          {/* Map Area */}
          <div className="relative mt-4 bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
            {activeTab === "india" ? (
              <img
                src="/maps/india-map.png"
                alt="India Map"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="/maps/world-map.png"
                alt="World Map"
                className="w-full h-full object-contain"
              />
            )}

            {/* Zoom Controls */}
            <div className="absolute right-4 top-1/2 flex flex-col gap-2 -translate-y-1/2">
              <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-xl">
                +
              </button>
              <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-xl">
                −
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Stats */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Dropdown */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring focus:ring-blue-200"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              {dropdownOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaSmile className="text-yellow-500 text-2xl" />
            <div>
              <h3 className="text-2xl font-bold text-blue-700">
                {counter?.data?.guests || ""}
              </h3>
              <p className="text-gray-600 text-sm">Happy Guests</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaPlane className="text-gray-500 text-2xl" />
            <div>
              <h3 className="text-2xl font-bold text-blue-700">
                {counter?.data?.toursCompleted || ""}
              </h3>
              <p className="text-gray-600 text-sm">Tours Conducted</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaStar className="text-yellow-400 text-2xl" />
            <div>
              <h3 className="text-2xl font-bold text-blue-700">
                {counter?.data?.tourDestination || ""}
              </h3>
              <p className="text-gray-600 text-sm">Tour Destinations</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <FaUserTie className="text-gray-600 text-2xl" />
            <div>
              <h3 className="text-2xl font-bold text-blue-700">
                {counter?.data?.tourExpert || ""}
              </h3>
              <p className="text-gray-600 text-sm">Tour Managers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapTabs;
