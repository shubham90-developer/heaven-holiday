"use client";
import React from "react";
import { Building, Landmark, Castle, LandmarkIcon } from "lucide-react"; // example icons
import { useGetAllCitiesQuery } from "../../../../store/contact-office/contactCityApi";

const CitySectionSkeleton = () => {
  return (
    <div className="py-10 bg-gray-50 text-center animate-pulse">
      {/* Heading Skeleton */}
      <div className="h-5 w-56 bg-gray-300 rounded mx-auto mb-8" />

      {/* Cities Skeleton */}
      <div className="flex flex-wrap justify-center gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 shadow-sm" />
            <div className="mt-2 h-3 w-14 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="mt-6 h-4 w-32 bg-gray-300 rounded mx-auto" />
    </div>
  );
};

const CitySection = () => {
  const { data, isLoading, error } = useGetAllCitiesQuery();

  if (isLoading) {
    return (<CitySectionSkeleton />);
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
  const cities = data?.data;

  const activeCities = cities.filter((item) => {
    return item.status == "active";
  });

  return (
    <div className="py-10 bg-gray-50 text-center">
      {/* Heading */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
        Heaven Holiday is present in
      </h2>

      {/* Cities */}
      <div className="flex flex-wrap justify-center gap-6">
        {activeCities.map((city) => (
          <div
            key={city._id}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-gray-100 shadow-sm">
              <img
                src={city.icon}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              {city.name}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-6 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
        +50 more cities..
      </p>
    </div>
  );
};

export default CitySection;
