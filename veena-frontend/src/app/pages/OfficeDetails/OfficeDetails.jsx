"use client";
import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import Breadcrumb from "@/app/components/Breadcum";
import DekhoApnaDesh from "@/app/pages/Hero/DekhoApnaDesh";
import TourReview from "@/app/components/TourReview";
import HolidayDestinations from "./HolidayDestinations";
import ContactForm from "./ContactForm";

const OfficeDetails = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: null },
  ];

  const hours = [
    { day: "Mon", time: "10:00 AM - 07:00 PM" },
    { day: "Tue", time: "10:00 AM - 07:00 PM" },
    { day: "Wed", time: "10:00 AM - 07:00 PM" },
    { day: "Thu", time: "10:00 AM - 07:00 PM" },
    { day: "Fri", time: "10:00 AM - 07:00 PM" },
    { day: "Sat", time: "10:00 AM - 07:00 PM", highlight: true },
    { day: "Sun", time: "Closed" },
  ];

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-10 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Office Info */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              {/* Tag */}
              <span className="inline-block bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Virtual Sales Office
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-3 flex items-center">
                <span>Puducherry</span>
                <span className="border-l-2 border-gray-300 pl-2 ml-2 text-red-600 font-semibold text-lg">
                  CLOSED
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-gray-600 mt-2">
                Want to connect? Just click ‘Schedule a Video Meet’ and share
                your details.
              </p>

              {/* Contact Info */}
              <div className="mt-5 space-y-3 text-gray-800">
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gray-600" />
                  <span className="font-medium">+91 8655755288</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-600" />
                  <span className="font-medium">travel@heavenHoliday.com</span>
                </div>
              </div>

              {/* Working Hours */}
              <div ref={dropdownRef} className="relative inline-block mt-6">
                {/* Trigger */}
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 text-gray-900 font-medium cursor-pointer"
                >
                  Working Hours: Sat 10:00 AM - 07:00 PM
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg p-3 z-20">
                    {hours.map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex justify-between py-1 text-sm ${
                          h.highlight ? "font-bold text-black" : "text-gray-700"
                        }`}
                      >
                        <span>{h.day}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Call Back Form */}
            <div className="bg-gray-100 shadow rounded-lg p-6 w-full md:w-1/3">
              <h3 className="font-semibold text-base mb-4">
                Want us to call you?
              </h3>

              <input
                type="text"
                placeholder="Full Name*"
                className="w-full border rounded-xl p-3 text-sm mb-3 border-gray-300 focus:ring focus:ring-yellow-300"
              />
              <input
                type="text"
                placeholder="Mobile Number*"
                className="w-full border rounded-xl p-3 text-sm mb-3 border-gray-300 focus:ring focus:ring-yellow-300"
              />
              <input
                type="email"
                placeholder="Email ID*"
                className="w-full border rounded-xl p-3 text-sm mb-4 border-gray-300 focus:ring focus:ring-yellow-300"
              />

              <button className="w-full cursor-pointer text-white bg-red-700 hover:bg-red-500 py-3 rounded font-medium text-sm flex items-center justify-center gap-2">
                <Phone size={16} className="text-white" />
                <span>Request Call Back</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <DekhoApnaDesh />
      <HolidayDestinations />
      <TourReview />
      <ContactForm />
    </>
  );
};

export default OfficeDetails;
