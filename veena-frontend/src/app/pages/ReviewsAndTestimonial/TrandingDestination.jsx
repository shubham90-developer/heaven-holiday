"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetTrendingDestinationsQuery } from "../../../../store/toursManagement/trendingDestinationsAPi";

const TrandingDestination = () => {
  const [activeTab, setActiveTab] = useState("World");

  // Helper to format numbers only on client
  const formatNumber = (num) => {
    if (typeof window === "undefined") return num; // server: return raw number
    return num.toLocaleString(); // client: format
  };
  const { data, isLoading, error } = useGetTrendingDestinationsQuery();

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600">
            Failed to load team members. Please try again later.
          </p>
        </div>
      </section>
    );
  }
  const responce = data.data;
  console.log("responce", responce);

  // Filter by active status AND selected category
  const filteredDestinations = responce?.destinations.filter(
    (dest) => dest.status === "active" && dest.category === activeTab,
  );

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-2xl text-center font-bold mb-3">
          {responce?.title || ""}
        </h2>

        <div className="flex justify-center mb-8">
          <img
            src="/assets/img/header-bottom.svg"
            alt="underline"
            className="w-40 md:w-50"
          />
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {["World", "India"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest._id}
              className="relative h-[250px] rounded-xl overflow-hidden shadow-lg group"
            >
              <Image
                src={dest.image}
                alt={dest.title}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              <h3 className="absolute top-4 left-4 text-white text-lg font-bold drop-shadow-md">
                {dest.title}
              </h3>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-md shadow p-3 text-xs text-gray-800 font-medium">
                <p>
                  <span className="font-bold">{dest.tours}</span> tours |{" "}
                  <span className="font-bold">{dest.departures}</span>{" "}
                  departures
                </p>
                <p>
                  <span className="font-bold">{dest.guests}</span> guests
                  travelled
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrandingDestination;
