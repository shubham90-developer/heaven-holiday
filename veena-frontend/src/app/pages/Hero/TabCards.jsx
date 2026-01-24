"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useGetAllTabCardsQuery } from "store/tabCards/tabcardApi";
const TabCards = () => {
  const [activeTab, setActiveTab] = useState("world");
  const {
    data: tabcardData,
    isLoading: tabcardLoading,
    error: tabcardError,
  } = useGetAllTabCardsQuery();
  if (tabcardLoading) {
    return <p>loading</p>;
  }
  if (tabcardError) {
    return <p>error</p>;
  }

  const cards = tabcardData?.data?.cards || [];
  const activeCards = cards.filter((item) => item.isActive === true);

  // Filter cards by category
  const worldData = activeCards.filter((item) => item.category === "world");
  const indiaData = activeCards.filter((item) => item.category === "india");

  const data = activeTab === "world" ? worldData : indiaData;

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-2">
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("world")}
            className={`px-20 py-2 rounded-md font-medium transition cursor-pointer ${
              activeTab === "world"
                ? "bg-red-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            World
          </button>
          <button
            onClick={() => setActiveTab("india")}
            className={`px-20 py-2 rounded-md font-medium transition cursor-pointer ${
              activeTab === "india"
                ? "bg-red-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            India
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <Link
              href={item.link}
              key={item._id}
              className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition block"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>

              {/* Title & Badge */}
              {/* Title & Badge Centered */}
              <div className="absolute inset-0 flex flex-col items-center mt-2 text-center px-2">
                <h3 className="text-lg font-semibold text-white drop-shadow">
                  {item.title}
                </h3>

                {item.badge && (
                  <span className="mt-2 inline-block bg-red-700 text-white text-xs font-medium px-2 py-1 rounded">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 text-center py-2 rounded-md">
                <p className="text-sm font-medium">
                  <strong>{item.tours}</strong> tours |{" "}
                  <strong>{item.departures}</strong> departures
                </p>
                <p className="text-xs font-bold text-black">
                  {item.guests}{" "}
                  <span className="text-xs font-semibold text-gray-700">
                    guests travelled
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TabCards;
