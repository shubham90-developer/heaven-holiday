"use client";

import React, { useState } from "react";
import { Heart, Download, Mail, Share2, X, Copy } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const TourActions = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div>
      {/* Bottom buttons */}
      <div className="flex justify-between text-xs text-blue-800 items-center gap-4 mt-4">
        <Link
          href="/account/wishlist"
          className="flex items-center gap-1 cursor-pointer"
        >
          <Heart className="w-4 h-4" /> Wishlist
        </Link>
        <button
          onClick={() => setActiveModal("download")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Download
        </button>
        <button
          onClick={() => setActiveModal("email")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Mail className="w-4 h-4" /> Email
        </button>
        <button
          onClick={() => setActiveModal("share")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>

      {/* Download Modal */}
      {activeModal === "download" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[600px] flex relative overflow-hidden">
            {/* Left image */}
            <div className="w-1/2">
              <img
                src="/assets/img/tour-card/1.avif"
                alt="Tour"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Right content */}
            <div className="w-1/2 p-6">
              <button
                className="absolute top-2 right-2 text-gray-500 cursor-pointer bg-gray-300 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="w-3 h-3" />
              </button>
              <h2 className="text-lg font-semibold mb-2">
                You're printing the itinerary & price details for tour date 28
                Nov 2025
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Please go back to calendar if you wish to change the date or
                click on Print.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  className="border px-4 py-2 rounded cursor-pointer text-xs"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="bg-red-700 px-4 py-2 rounded font-semibold hover:bg-yellow-500 text-xs cursor-pointer">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {activeModal === "email" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[600px] flex relative overflow-hidden">
            {/* Left image */}
            <div className="w-1/2">
              <img
                src="/assets/img/tour-card/2.avif"
                alt="Tour"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Right content */}
            <div className="w-1/2 p-6">
              <button
                className="absolute top-2 right-2 text-gray-500 cursor-pointer bg-gray-300 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="w-3 h-3" />
              </button>
              <h2 className="text-lg font-semibold mb-2">
                You're mailing the itinerary & price details for tour date 28
                Nov 2025.
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Please go back to calendar if you wish to change the date or
                click on Send Email.
              </p>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-400 p-3 text-xs rounded-xl mb-3"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full border border-gray-400 p-3 text-xs rounded-xl mb-3"
              />
              <div className="flex gap-3 justify-end">
                <button
                  className="border px-4 py-2 rounded cursor-pointer text-xs"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="bg-red-700 px-4 py-2 rounded font-semibold hover:bg-yellow-500 text-xs cursor-pointer">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {activeModal === "share" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-[500px] flex relative overflow-hidden">
            {/* Left image */}
            <div className="w-1/2">
              <img
                src="/assets/img/tour-card/3.avif"
                alt="Tour"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Right content */}
            <div className="w-1/2 p-6">
              <button
                className="absolute top-2 right-2 text-gray-500 cursor-pointer bg-gray-300 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="w-3 h-3" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Share This Tour</h2>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100 text-green-600 text-xs cursor-pointer">
                  <FaWhatsapp className="w-4 h-4" />
                  Share via WhatsApp
                </button>

                <button className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100 text-blue-600 text-xs cursor-pointer">
                  <FaFacebook className="w-4 h-4" />
                  Share via Facebook
                </button>

                <button className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100 text-gray-700 text-xs cursor-pointer">
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourActions;
