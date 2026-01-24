"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MyBookingsCards = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="bg-blue-900 flex justify-center">
        <div className="flex w-full max-w-3xl">
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-yellow-400 text-white"
                  : "border-transparent text-gray-300 hover:text-yellow-300"
              }`}
            >
              {tab === "upcoming" && "Upcoming Tours (0)"}
              {tab === "completed" && "Completed Tours (0)"}
              {tab === "cancelled" && "Cancelled Tours (0)"}
            </button>
          ))}
        </div>
      </div>

      {/* Card Section */}
      <div className="p-6">
        {activeTab === "upcoming" && (
          <>
            {/* Empty state card */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto border border-gray-200">
              <div className="flex items-center gap-6">
                <Image
                  src="/assets/img/my-booking/1.png"
                  alt="Holiday Illustration"
                  width={150}
                  height={150}
                  className="object-contain"
                />
                <div>
                  <h2 className="font-semibold text-lg mb-1 text-gray-800">
                    This is a good time to go on a holiday.
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    You have 0 booking with us. Let’s break the ice.
                  </p>
                  <Link
                    href="/tour-list"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded"
                  >
                    Explore Tours
                  </Link>
                </div>
              </div>
            </div>

            {/* Insight Card */}
            <div className="bg-yellow-50 rounded-lg p-6 mt-4 shadow-sm border border-yellow-100 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Get Trip-Ready with Personalized Travel Insights
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Custom videos, expert tips, & guides — everything you need for
                  a smooth, memorable trip.
                </p>
                <Link
                  href={"/account/pre-departure-videos"}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded"
                >
                  Watch Pre-Departure Videos
                </Link>
              </div>
              <Image
                src="/assets/img/my-booking/2.svg"
                alt="Travel Tips"
                width={150}
                height={120}
                className="mt-4 md:mt-0"
              />
            </div>
          </>
        )}

        {activeTab !== "upcoming" && (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center max-w-4xl mx-auto border border-gray-200">
            <p className="text-gray-700">No {activeTab} tours found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsCards;
