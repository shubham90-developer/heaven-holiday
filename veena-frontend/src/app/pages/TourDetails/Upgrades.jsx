"use client";
import React, { useState } from "react";

const Upgrades = () => {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <section className="py-10 lg:px-0 px-4" id="upgrades">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-800">
          Upgrades Available
        </h2>
        <p className="text-sm text-gray-500 italic">
          Want luxury? Add luxury at minimum cost!
        </p>

        {/* Tabs */}
        <div className="flex mt-4 border-b">
          <button
            onClick={() => setActiveTab("flight")}
            className={`px-6 py-2 text-sm font-medium rounded-t-md ${
              activeTab === "flight"
                ? "bg-blue-800 text-white"
                : "bg-blue-50 text-blue-900"
            }`}
          >
            Flight Upgrade
          </button>
          <button
            onClick={() => setActiveTab("prime")}
            className={`px-6 py-2 text-sm font-medium rounded-t-md ml-1 ${
              activeTab === "prime"
                ? "bg-blue-800 text-white"
                : "bg-blue-50 text-blue-900"
            }`}
          >
            Prime Seat(s)
          </button>
        </div>

        {/* Tab Content */}
        <div className="border border-t-0 rounded-b-md p-4 text-sm text-gray-700">
          {activeTab === "flight" && (
            <p>
              Need to upgrade to business or first class? <br />
              Please get in touch with our team on{" "}
              <a href="tel:1800227979" className="text-blue-600 font-medium">
                1800 22 7979
              </a>{" "}
              or{" "}
              <a href="tel:18003135555" className="text-blue-600 font-medium">
                1800 313 5555
              </a>{" "}
              for more details.
            </p>
          )}

          {activeTab === "prime" && (
            <p>
              Want to reserve the best seats on your flight? <br />
              Contact our team on{" "}
              <a href="tel:1800227979" className="text-blue-600 font-medium">
                1800 22 7979
              </a>{" "}
              or{" "}
              <a href="tel:18003135555" className="text-blue-600 font-medium">
                1800 313 5555
              </a>{" "}
              for availability and pricing.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Upgrades;
