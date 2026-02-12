"use client";

import React, { useState } from "react";
import { Phone, MapPin, Share2, X } from "lucide-react";
import { FaSms, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import CitySection from "./CitySection";
import { useGetAllOfficesQuery } 
from "../../../../store/contact-office/contactOfficeApi";


const OfficeCard = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const { data, isLoading, error } = useGetAllOfficesQuery();

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

  const offices = responce || [];
  const activeOffices = offices.filter((item) => {
    return item.status == "active";
  });

  return (
    <div className="lg:col-span-2 space-y-4">
      {activeOffices.map((office) => (
        <div
          key={office._id}
          className="bg-white rounded-xl shadow border border-gray-300 p-2 space-y-2"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-md">
                Sales Office
              </span>
              {office.forex && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                  FOREX Available
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href="https://maps.app.goo.gl/tSDNvytmsdvB8YmJA"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <MapPin size={16} className="text-gray-600" />
              </Link>
              <button
                onClick={() => setSelectedOffice(office)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <Share2 size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* City + Status */}
          <h2 className="text-md font-bold mt-3">
            {office.city} | &nbsp;
            <span className="text-green-600 font-semibold text-sm">
              {office.status}
            </span>
          </h2>

          {/* Address */}
          <p
            className="text-gray-700 text-xs mt-1"
            dangerouslySetInnerHTML={{ __html: office.address || "" }}
          ></p>

          {/* Bottom Row */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              href={`/contact-us/office-details/${office._id}`}
              className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-md text-xs font-medium"
            >
              Office Details
            </Link>
            <a
              href={`tel:${office.phone}`}
              className="flex items-center font-bold gap-1 text-sm text-gray-800 hover:underline"
            >
              <Phone size={14} /> {office.phone}
            </a>
          </div>
        </div>
      ))}

      {/* 🔹 Share Modal */}
      {selectedOffice && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            {/* Close Btn */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-300 rounded-full p-2 text-xs"
              onClick={() => {
                setSelectedOffice(null);
                setPhone("");
                setConsent(false);
              }}
            >
              <X size={10} />
            </button>

            {/* Title */}
            <h3 className="text-md font-semibold text-center mb-4">
              Enter your mobile number and send branch details to yourself
            </h3>

            {/* Phone Input */}
            <div className="flex border rounded-md overflow-hidden">
              <select className="bg-gray-100 px-2 text-sm border-r">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="w-4 h-4"
              />
              I agree to receiving content on SMS/WhatsApp
            </label>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                disabled={!consent}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium ${consent
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <FaWhatsapp size={16} />
                WhatsApp
              </button>

              <button
                disabled={!consent}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium ${consent
                    ? "bg-red-700 text-white hover:bg-yellow-500"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <FaSms size={16} />
                SMS
              </button>
            </div>
          </div>
        </div>
      )}

      <CitySection />
    </div>
  );
};

export default OfficeCard;
