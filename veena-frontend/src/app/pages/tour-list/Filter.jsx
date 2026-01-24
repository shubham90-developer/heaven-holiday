"use client";
import React, { useState } from "react";

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeRegion, setActiveRegion] = useState("");
  const [selectedSpecial, setSelectedSpecial] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ Drawer toggle

  // Helpers
  const addFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };
  const clearAll = () => {
    setSelectedFilters([]);
    setActiveRegion("");
    setSelectedSpecial("");
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-blue-900 text-white px-4 py-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        ☰ Filters
      </button>

      {/* Drawer for mobile & sidebar for desktop */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-lg border-r border-gray-200 z-40 
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto md:shadow-none md:border md:rounded-md
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="font-semibold">Filter Your Tour</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            ✖
          </button>
        </div>

        {/* Top selected filters bar */}
        <div className="bg-blue-900 text-white p-3 rounded-t-md hidden md:block">
          <p className="text-sm font-medium mb-2 flex justify-between">
            Filter Your Tour{" "}
            <button onClick={clearAll} className="text-xs underline">
              Clear All
            </button>
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.length > 0 ? (
              selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center bg-blue-800 text-xs px-2 py-1 rounded-full cursor-pointer"
                  onClick={() => removeFilter(filter)}
                >
                  {filter} <span className="ml-1">✕</span>
                </span>
              ))
            ) : (
              <p className="text-xs italic text-gray-200">No filters applied</p>
            )}
          </div>
        </div>

        {/* Filters body */}
        <div className="p-4 space-y-5 text-sm overflow-y-auto h-full md:h-auto">
          {/* Region */}
          <div className="border-b border-gray-400 pb-5">
            <p className="font-semibold mb-2">Region</p>
            <div className="flex gap-3 flex-wrap">
              {["India", "World"].map((region) => (
                <button
                  key={region}
                  className={`px-3 py-1 border rounded-md cursor-pointer ${
                    activeRegion === region
                      ? "bg-blue-900 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => {
                    setActiveRegion(region);
                    addFilter(region);
                  }}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className=" border-b border-gray-400  pb-5">
            <p className="font-semibold mb-2">Price Range</p>
            <div className="space-y-2">
              {[
                "< ₹10,000 – ₹25,000",
                "₹25,000 – ₹50,000",
                "₹50,000 – ₹1,00,000",
                "₹1,00,000 & above",
              ].map((range) => (
                <label key={range} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      e.target.checked ? addFilter(range) : removeFilter(range)
                    }
                    checked={selectedFilters.includes(range)}
                  />{" "}
                  {range}
                </label>
              ))}
            </div>
          </div>

          {/* Tour Duration */}
          <div className="border-b border-gray-400 pb-5">
            <p className="font-semibold mb-2">Tour Duration</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["0–4 Days", "5–8 Days", "9–12 Days", "13–17 Days"].map(
                (duration) => (
                  <button
                    key={duration}
                    className={`px-2 py-1 border rounded-md ${
                      selectedFilters.includes(duration)
                        ? "bg-blue-800 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() =>
                      selectedFilters.includes(duration)
                        ? removeFilter(duration)
                        : addFilter(duration)
                    }
                  >
                    {duration}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Depart Between */}
          <div className=" border-b border-gray-400  pb-5">
            <p className="font-semibold mb-2">Depart Between</p>
            <div className="flex gap-2">
              <input
                type="date"
                className="w-1/2 border rounded-md px-2 py-1"
                onChange={(e) => addFilter(`From ${e.target.value}`)}
              />
              <input
                type="date"
                className="w-1/2 border rounded-md px-2 py-1"
                onChange={(e) => addFilter(`To ${e.target.value}`)}
              />
            </div>
          </div>

          {/* Departure City */}
          <div className=" border-b border-gray-400  pb-5">
            <p className="font-semibold mb-2">Departure City</p>
            <div className="space-y-1 ">
              {[
                "Jalgaon",
                "Pune",
                "Nagpur",
                "Goa",
                "Delhi",
                "Chandrapur",
                "Nanded",
                "Nashik",
                "Hyderabad",
                "Bangalore",
                "Ahmedabad",
                "Mumbai",
              ].map((city) => (
                <label key={city} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(city)}
                    onChange={(e) =>
                      e.target.checked ? addFilter(city) : removeFilter(city)
                    }
                  />{" "}
                  {city}
                </label>
              ))}
            </div>
          </div>

          {/* Joining Location */}
          <div className=" border-b border-gray-400  pb-5">
            <p className="font-semibold mb-2">Joining Location</p>
            <div className="space-y-1">
              {[
                "Jodhpur",
                "Jaipur",
                "Udaipur",
                "Kochi",
                "Chennai",
                "Delhi",
              ].map((loc) => (
                <label key={loc} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(loc)}
                    onChange={(e) =>
                      e.target.checked ? addFilter(loc) : removeFilter(loc)
                    }
                  />{" "}
                  {loc}
                </label>
              ))}
            </div>
          </div>

          {/* Specialty Tour */}
          <div>
            <p className="font-semibold mb-2">Specialty Tour</p>
            <div className="space-y-1">
              {[
                "Family",
                "Senior Special",
                "Short Trips",
                "Women’s Special",
                "Luxury Tour",
                "Women's Special with Kids",
              ].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="special"
                    checked={selectedSpecial === type}
                    onChange={() => {
                      setSelectedSpecial(type);
                      addFilter(type);
                    }}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Filter;
