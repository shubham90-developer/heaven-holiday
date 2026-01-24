"use client";
import React, { useState } from "react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import KycDocuments from "./KycDocuments";

const MyProfile = () => {
  const [gender, setGender] = useState(null);
  const [openProfile, setOpenProfile] = useState(true); // default open
  const [openTravellers, setOpenTravellers] = useState(false);

  return (
    <div className="flex-1">
      {/* My Profile Section */}
      <div className="mb-5 border border-gray-200 bg-white rounded-lg">
        <button
          className="flex justify-between items-center w-full px-6 py-4 text-black cursor-pointer"
          onClick={() => setOpenProfile(!openProfile)}
        >
          <span className="font-semibold">My Profile</span>
          <FaChevronDown
            className={`transform transition ${
              openProfile ? "rotate-180" : ""
            }`}
          />
        </button>

        {openProfile && (
          <div className="p-6 border-t bg-white">
            <h3 className="font-medium mb-2">Personal Information</h3>

            {/* Gender */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setGender("Male")}
                className={`px-4 py-1 text-xs border cursor-pointer rounded-md ${
                  gender === "Male"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "hover:bg-gray-100"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("Female")}
                className={`px-4 py-1 text-xs border cursor-pointer rounded-md ${
                  gender === "Female"
                    ? "bg-blue-900 text-white border-blue-900"
                    : "hover:bg-gray-100"
                }`}
              >
                Female
              </button>
            </div>

            {/* Nationality */}
            <input
              type="text"
              placeholder="Nationality"
              className="w-full border rounded-md p-2 mb-3 border-gray-400 text-xs py-3"
            />

            {/* DOB */}
            <div className="flex items-center rounded-md p-2 mb-3">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full border rounded-md p-2 mb-3 border-gray-400 text-xs py-3"
              />
            </div>

            {/* Address */}
            <textarea
              placeholder="Enter Address"
              className="w-full border rounded-md p-2 mb-3 border-gray-400 text-xs py-3"
            />

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="px-4 py-2 border rounded-md text-xs cursor-pointer">
                Cancel
              </button>
              <button className="px-4 py-2 bg-yellow-400 rounded-md text-xs cursor-pointer">
                Save
              </button>
            </div>

            {/* KYC Documents */}
            <div className="mt-6">
              <KycDocuments />
            </div>
          </div>
        )}
      </div>

      {/* Co-Travellers Section */}
      <div className="border border-gray-200 bg-white rounded-lg">
        <button
          className="flex justify-between items-center w-full px-6 py-4 text-black cursor-pointer"
          onClick={() => setOpenTravellers(!openTravellers)}
        >
          <span className="font-semibold">Co-Travellers</span>
          <FaChevronDown
            className={`transform transition ${
              openTravellers ? "rotate-180" : ""
            }`}
          />
        </button>

        {openTravellers && (
          <div className="p-6 text-center border-t">
            <blockquote className="italic text-gray-600 mb-4">
              “Travelling in the company of those we love is home in motion.”
              <br /> <span className="font-medium">-Leigh Hunt</span>
            </blockquote>

            <img
              src="/assets/img/otp.svg"
              alt="No Co-Travellers"
              className="mx-auto mb-4 h-24"
            />

            <p className="text-sm text-gray-700">
              You have 0 co-travellers. Make memories with your loved ones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
