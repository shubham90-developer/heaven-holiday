"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const TourInformation = () => {
  const [activeTab, setActiveTab] = useState("inclusions");

  const inclusions = [
    "To and fro economy class air travel for ‘Mumbai to Mumbai Tour’ guests as mentioned in the itinerary",
    "Airfare, Airport taxes and Visa Fees",
    "Baggage Allowance as per the airline policy",
    "Tour Manager Services throughout the tour",
    "Travel by comfortable A/C coach as per the tour itinerary",
    "Entrance fees of all sightseeing places to be visited from inside",
    "Accommodation in comfortable and convenient hotels on twin sharing basis",
    "All Meals – Breakfast, Lunch, Dinner (set menu) as mentioned in the itinerary",
    "All Tips – Guide, Driver & Restaurants",
    "Cost of internal airfare as mentioned in the itinerary",
  ];

  const exclusions = [
    "Any increase in airfare, visa fees, airport taxes, government taxes, fuel surcharges, etc.",
    "Expenses of personal nature such as porterage, laundry, telephone, drinks, etc.",
    "Cost of insurance, if not mentioned in inclusions",
    "Any services not mentioned under inclusions",
  ];

  const preparation = [
    "Carry valid passport with at least 6 months validity",
    "Pack according to the weather of your destination",
    "Carry required medicines and personal items",
    "Keep both hard copy and digital copy of travel documents",
  ];

  const renderList = (items) => (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-gray-700">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-10 lg:px-0 px-4" id="info">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Tour Information</h2>
        <p className="text-gray-500 italic mb-6">
          Read this to prepare for your tour in the best way!
        </p>

        {/* Tabs Header */}
        <div className="flex bg-blue-50 rounded-t-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("inclusions")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "inclusions"
                ? "bg-blue-800 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            Tour Inclusions
          </button>
          <button
            onClick={() => setActiveTab("exclusions")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "exclusions"
                ? "bg-blue-800 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            Tour Exclusions
          </button>
          <button
            onClick={() => setActiveTab("preparation")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "preparation"
                ? "bg-blue-800 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            Advance Preparation
          </button>
        </div>

        {/* Tabs Content */}
        <div className="border border-t-0 rounded-b-lg p-6 bg-white">
          {activeTab === "inclusions" && renderList(inclusions)}
          {activeTab === "exclusions" && renderList(exclusions)}
          {activeTab === "preparation" && renderList(preparation)}
        </div>
      </div>
    </section>
  );
};

export default TourInformation;
