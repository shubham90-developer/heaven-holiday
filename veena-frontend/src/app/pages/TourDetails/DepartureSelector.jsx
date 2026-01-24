"use client";
import React, { useState } from "react";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="relative p-6 bg-white w-96 rounded-lg shadow-xl">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const DepartureSelector = () => {
  const [activeTab, setActiveTab] = useState("All departures");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  // Data grouped by month, with city tags
  const months = [
    {
      name: "Sep 2025",
      dates: [
        {
          day: "28",
          weekday: "SUN",
          price: "₹32,000",
          label: "Only J/L available",
          status: "red",
          city: "Joining / Leaving",
        },
      ],
    },
    {
      name: "Oct 2025",
      dates: [
        {
          day: "14",
          weekday: "TUE",
          price: "₹33,000",
          status: "gray",
          city: "Mumbai",
        },
        {
          day: "18",
          weekday: "SAT",
          price: "₹34,000",
          label: "On - Tour Diwali",
          status: "purple",
          city: "Mumbai",
        },
        {
          day: "22",
          weekday: "WED",
          price: "₹34,000",
          label: "On - Tour Diwali",
          status: "purple",
          city: "Joining / Leaving",
        },
        {
          day: "26",
          weekday: "SUN",
          price: "₹35,000",
          label: "Diwali Special",
          status: "purple",
          city: "Mumbai",
        },
      ],
    },
    {
      name: "Nov 2025",
      dates: [
        {
          day: "02",
          weekday: "SUN",
          price: "₹32,000",
          label: "3 seats",
          status: "red",
          city: "Joining / Leaving",
        },
        {
          day: "28",
          weekday: "FRI",
          price: "₹30,000",
          label: "Lowest Price",
          status: "green",
          city: "Mumbai",
        },
      ],
    },
    {
      name: "Dec 2025",
      dates: [
        {
          day: "19",
          weekday: "FRI",
          price: "₹34,000",
          status: "gray",
          city: "Mumbai",
        },
        {
          day: "23",
          weekday: "TUE",
          price: "₹35,000",
          status: "gray",
          city: "Joining / Leaving",
        },
        {
          day: "31",
          weekday: "WED",
          price: "₹36,000",
          label: "New Year",
          status: "purple",
          city: "Mumbai",
        },
      ],
    },
  ];

  // Filter based on tab
  const getFilteredMonths = () => {
    if (activeTab === "All departures") return months;

    return months
      .map((month) => ({
        ...month,
        dates: month.dates.filter((date) => date.city === activeTab),
      }))
      .filter((month) => month.dates.length > 0);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedDate(null); // reset selected date when changing tab
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    if (selectedCity) {
      alert(
        `You selected ${selectedCity} for ${selectedDate.weekday}, ${selectedDate.day}`
      );
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        id="departure-section"
        className="bg-white p-4 rounded-lg shadow-md w-full md:col-span-2"
      >
        <h2 className="font-semibold text-lg mb-2 border-b pb-2">
          1. SELECT DEPARTURE CITY & DATE
        </h2>
        {/* Tabs */}
        <div className="flex gap-3 my-4">
          {["All departures", "Mumbai", "Joining / Leaving"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-full border cursor-pointer text-xs ${
                activeTab === tab
                  ? "bg-blue-900 text-white cursor-pointer border-blue-600"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div>
            <p className="font-semibold">{activeTab} dates</p>
            <p className="text-green-600">
              All inclusive tours, lock in at this great price today.
            </p>
          </div>
          <p className="text-purple-600 cursor-pointer">Celebrations</p>
        </div>

        {/* Month + Date Cards */}
        <div className="flex flex-wrap gap-4">
          {getFilteredMonths().map((month, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="bg-gray-700 text-white text-[10px] w-10 text-center px-2 py-6 rounded-md">
                {month.name}
              </div>
              <div className="flex gap-2 flex-wrap">
                {month.dates.map((date, j) => (
                  <div
                    key={j}
                    onClick={() => handleDateClick(date)}
                    className={`w-24 text-center rounded-lg p-2 cursor-pointer border transition ${
                      selectedDate?.day === date.day
                        ? "border-blue-600 ring-2 ring-blue-400"
                        : "border-gray-300 hover:border-blue-400"
                    } ${
                      date.status === "green"
                        ? "bg-green-100"
                        : date.status === "red"
                        ? "bg-red-50"
                        : date.status === "purple"
                        ? "bg-purple-50"
                        : "bg-white"
                    }`}
                  >
                    <div className="text-[10px] text-gray-800  border-b py-1">
                      {date.weekday}
                    </div>
                    <div className="text-sm font-bold">{date.day}</div>
                    <div className="text-xs font-medium">{date.price}</div>
                    {date.label && (
                      <div
                        className={`text-[10px] mt-1 font-semibold ${
                          date.status === "red"
                            ? "text-red-500"
                            : date.status === "green"
                            ? "text-green-600"
                            : date.status === "purple"
                            ? "text-purple-600"
                            : "text-gray-400"
                        }`}
                      >
                        {date.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* footer text */}
        <div className="text-xs text-gray-500 mt-4 ">
          <ul className="list-disc pl-4 space-y-1 flex">
            <li>Terms and Conditions apply.</li>
            <li>5% GST is applicable on given tour price.</li>
            <li>
              Mentioned tour prices are Per Person for Indian Nationals only.
            </li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Select your preferred departure city
        </h3>

        <div className="space-y-3 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="city"
              value="Mumbai"
              checked={selectedCity === "Mumbai"}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-4 w-4"
            />
            <span>Mumbai</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="city"
              value="Join at Srinagar, Leave at Srinagar"
              checked={selectedCity === "Join at Srinagar, Leave at Srinagar"}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-4 w-4"
            />
            <span>Join at Srinagar, Leave at Srinagar</span>
          </label>
        </div>

        <div className="bg-blue-50 text-gray-700 text-sm p-2 rounded mb-4">
          Except for joining/leaving, To & fro economy class air is included for
          all departure city.
        </div>

        <button
          onClick={handleProceed}
          disabled={!selectedCity}
          className={`w-full py-2 rounded-md font-medium ${
            selectedCity
              ? "bg-yellow-300 hover:bg-red-700"
              : "bg-yellow-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </Modal>
    </>
  );
};

export default DepartureSelector;
