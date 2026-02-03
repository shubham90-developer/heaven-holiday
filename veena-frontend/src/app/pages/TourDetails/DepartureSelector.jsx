"use client";
import React, { useState, useMemo } from "react";

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

const DepartureSelector = ({ departures = [], onDateSelect }) => {
  const [activeTab, setActiveTab] = useState("All departures");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  // Get unique cities from departures
  const uniqueCities = useMemo(() => {
    if (!departures || departures.length === 0) return [];
    const cities = [...new Set(departures.map((d) => d.city))];
    return cities;
  }, [departures]);

  // Format date for display
  const formatDateInfo = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    const month = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    return { day, weekday, month };
  };

  // Group departures by month
  const groupedDepartures = useMemo(() => {
    if (!departures || departures.length === 0) return [];

    const grouped = {};

    departures.forEach((departure) => {
      const { month } = formatDateInfo(departure.date);

      if (!grouped[month]) {
        grouped[month] = [];
      }

      const { day, weekday } = formatDateInfo(departure.date);

      // Determine status based on available seats
      let status = "gray";
      let label = "";

      if (departure.availableSeats <= 5) {
        status = "red";
        label = `${departure.availableSeats} seats`;
      } else if (
        departure.joiningPrice ===
        Math.min(...departures.map((d) => d.joiningPrice))
      ) {
        status = "green";
        label = "Lowest Price";
      }

      grouped[month].push({
        day,
        weekday,
        price: `₹${departure.joiningPrice?.toLocaleString("en-IN")}`,
        fullPackagePrice: `₹${departure.fullPackagePrice?.toLocaleString("en-IN")}`,
        label,
        status,
        city: departure.city,
        availableSeats: departure.availableSeats,
        totalSeats: departure.totalSeats,
        originalDate: departure.date,
        departureData: departure, // ✅ Full departure object stored here
      });
    });

    return Object.entries(grouped).map(([month, dates]) => ({
      name: month,
      dates,
    }));
  }, [departures]);

  // Filter based on tab
  const getFilteredMonths = () => {
    if (activeTab === "All departures") return groupedDepartures;

    return groupedDepartures
      .map((month) => ({
        ...month,
        dates: month.dates.filter((date) => date.city === activeTab),
      }))
      .filter((month) => month.dates.length > 0);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("DepartureSelector - Date clicked");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Date object:", date);
    console.log("departureData:", date.departureData);
    console.log("departureData._id:", date.departureData?._id);
    console.log("departureData.date:", date.departureData?.date);

    setSelectedDate(date);
    setIsModalOpen(true);

    // ✅ FIXED: Pass the full departure object with _id
    if (onDateSelect && date.departureData) {
      onDateSelect(date.departureData);
    }
  };

  const handleProceed = () => {
    if (selectedCity && selectedDate) {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Proceed clicked - Final selection");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Selected City:", selectedCity);
      console.log("Departure Data:", selectedDate.departureData);

      // ✅ FIXED: Pass the full departure object
      if (onDateSelect && selectedDate.departureData) {
        onDateSelect(selectedDate.departureData);
      }

      setIsModalOpen(false);
    }
  };

  // If no departures data, show fallback
  if (!departures || departures.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:col-span-2">
        <h2 className="font-semibold text-lg mb-2 border-b pb-2">
          1. SELECT DEPARTURE CITY & DATE
        </h2>
        <p className="text-gray-500 text-center py-8">
          No departure dates available at the moment.
        </p>
      </div>
    );
  }

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
          <button
            onClick={() => handleTabClick("All departures")}
            className={`px-4 py-2 rounded-full border cursor-pointer text-xs ${
              activeTab === "All departures"
                ? "bg-blue-900 text-white cursor-pointer border-blue-600"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            All departures
          </button>
          {uniqueCities.map((city) => (
            <button
              key={city}
              onClick={() => handleTabClick(city)}
              className={`px-4 py-2 rounded-full border cursor-pointer text-xs ${
                activeTab === city
                  ? "bg-blue-900 text-white cursor-pointer border-blue-600"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              {city}
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
          {/* <p className="text-purple-600 cursor-pointer">Celebrations</p> */}
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
                      selectedDate?.day === date.day &&
                      selectedDate?.month === month.name
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
                    <div className="text-[10px] text-gray-800 border-b py-1">
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
          {uniqueCities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="city"
                value={city}
                checked={selectedCity === city}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-4 w-4"
              />
              <span>{city}</span>
            </label>
          ))}
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
