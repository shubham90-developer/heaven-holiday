"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const TopBookingAds = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null; // hide when closed

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center bg-[#0b1a33] text-white rounded-xl shadow-lg w-[320px] animate-slideIn">
      {/* Image */}
      <div className="flex-shrink-0 p-2">
        <Image
          src="/assets/img/tours/1.avif"
          alt="Varanasi Ayodhya Lucknow"
          width={80}
          height={80}
          className=" object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3">
        <p className="text-sm text-gray-300">2 guests just booked!</p>
        <p className="font-semibold text-white text-base">
          Varanasi Ayodhya Lucknow
        </p>
        <p className="text-xs text-gray-400 mt-1">Just Now • Mumbai</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="p-2  hover:text-white cursor-pointer bg-gray-100 rounded-full text-black hover:bg-gray-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBookingAds;
