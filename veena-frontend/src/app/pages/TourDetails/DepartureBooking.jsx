"use client";
import React, { useState } from "react";
import DepartureSelector from "./DepartureSelector";
import { FaFileInvoice } from "react-icons/fa";
import PricingModal from "./PricingModal";
import Link from "next/link";
import EmiModal from "./EmiModal";

const DepartureBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Intro */}
        <div className="mb-6">
          <p className="text-md text-black font-bold">
            Select departure city, dates & add guest to book your tour
          </p>
          <p className="text-sm text-gray-500">
            As seats fill, prices increase! So book today!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left: Date Selection */}
          <DepartureSelector />

          {/* Right: Booking Summary */}
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
            {/* Title */}
            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4 border-b pb-2">
              <FaFileInvoice className="text-blue-600" />
              BOOKING SUMMARY
            </h2>

            {/* Dept City */}
            <div className="mb-2 flex justify-between text-sm text-gray-700">
              <span>Dept. city</span>
              <span className="font-medium">Mumbai</span>
            </div>

            {/* Dept Date */}
            <div className="mb-2 flex justify-between text-sm text-gray-700 break-words">
              <span>Dept. date</span>
              <span className="font-semibold text-black">
                28 Nov 2025 → 02 Dec 2025
              </span>
            </div>

            {/* Travellers */}
            <div className="mb-2 flex justify-between text-sm text-gray-700 break-words">
              <span>Travellers</span>
              <span>0 Adult(s) | 0 Child | 0 Infant</span>
            </div>

            {/* Rooms */}
            <div className="mb-4 flex justify-between text-sm text-gray-700">
              <span>Rooms</span>
              <span>0 Room</span>
            </div>

            {/* Price Section */}
            <div className="border-t border-dashed pt-4 mb-4">
              <div className="flex justify-between items-start flex-col sm:flex-row">
                <span className="text-sm font-medium text-black mb-2 sm:mb-0">
                  Basic Price
                </span>
                <div className="flex flex-col items-start sm:items-end">
                  <p className="text-green-600 font-semibold text-xl">
                    {selectedDate ? selectedDate.price : "₹30,000"}
                  </p>
                  <p className="text-xs text-gray-500">
                    per person on twin sharing
                  </p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                <PricingModal />
                <Link href="#" className="text-blue-700 underline">
                  Cancellation Policy
                </Link>
              </div>
            </div>

            {/* EMI */}
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  EMI Available
                </span>
                <span className="font-semibold">₹1,012/month</span>
              </div>
              {/* emo modal */}
              <EmiModal />
            </div>

            {/* Contact Info */}
            <div className="border-t border-dashed pt-4 mb-4 text-sm text-gray-700">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-blue-600">📞</span>
                  <span>1800 22 7979</span>
                  <span>|</span>
                  <span>1800 313 5555</span>
                  <span>|</span>
                  <span>1800 22 7979</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📍</span>
                  <Link
                    href="/contact-us"
                    className="text-blue-600 hover:underline"
                  >
                    Locate nearest Heaven Holiday
                  </Link>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 bg-gray-900 rounded-lg py-2 px-4">
              <button className="flex-1 py-2 bg-red-700 rounded-lg font-medium hover:bg-red-500 text-white transition cursor-pointer">
                Book Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartureBooking;
