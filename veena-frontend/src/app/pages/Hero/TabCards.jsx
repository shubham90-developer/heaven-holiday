"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {
  useGetTourPackageQuery,
  useGetCategoriesQuery,
} from "store/toursManagement/toursPackagesApi";
import { useGetUserBookingsQuery } from "store/bookingApi/bookingApi";

const TabCards = () => {
  const [activeTab, setActiveTab] = useState("world");

  const {
    data: tourPackages,
    isLoading: tourPackagesLoading,
    error: tourPackagesError,
  } = useGetTourPackageQuery();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useGetUserBookingsQuery();

  // Get active categories filtered by type
  const activeCategories = useMemo(() => {
    if (!categories?.data) return [];
    return categories.data.filter(
      (cat) => cat.status === "Active" && cat.categoryType === activeTab,
    );
  }, [categories, activeTab]);

  // Get active tour packages
  const activeTourPackages = useMemo(() => {
    if (!tourPackages?.data) return [];
    return tourPackages.data.filter((pkg) => pkg.status === "Active");
  }, [tourPackages]);

  // Count packages per category
  const packageCountByCategory = useMemo(() => {
    const counts = {};
    activeTourPackages.forEach((pkg) => {
      const categoryId = pkg.category?._id;
      if (categoryId) {
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      }
    });
    return counts;
  }, [activeTourPackages]);

  // Count bookings per category
  const bookingCountByCategory = useMemo(() => {
    if (!bookings?.data?.bookings) return {};

    const counts = {};
    bookings.data.bookings.forEach((booking) => {
      const categoryId = booking.tourPackage?.category?._id;
      if (categoryId) {
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      }
    });
    return counts;
  }, [bookings]);

  if (tourPackagesLoading || categoriesLoading || bookingsLoading) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-2 text-center">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (tourPackagesError || categoriesError) {
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-2 text-center">
          <p>Error loading data</p>
        </div>
      </section>
    );
  }

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
          {activeCategories.length > 0 ? (
            activeCategories.map((category) => {
              const packageCount = packageCountByCategory[category._id] || 0;
              const guestsCount = bookingCountByCategory[category._id] || 0;

              return (
                <Link
                  href={`/category/${category._id}`}
                  key={category._id}
                  className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition block"
                >
                  {/* Background Image */}
                  <img
                    src={category.image || "/assets/img/tour-card/1.avif"}
                    alt={category.name}
                    className="w-full h-56 object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>

                  {/* Title & Badge Centered */}
                  <div className="absolute inset-0 flex flex-col items-center mt-2 text-center px-2">
                    <h3 className="text-lg font-semibold text-white drop-shadow">
                      {category.name}
                    </h3>

                    {category.badge && (
                      <span className="mt-2 inline-block bg-red-700 text-white text-xs font-medium px-2 py-1 rounded">
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 text-center py-2 rounded-md">
                    <p className="text-sm font-medium">
                      <strong>{packageCount}</strong> tours |{" "}
                      <strong>{guestsCount}</strong> guests travelled
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No categories available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabCards;
