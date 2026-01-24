"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LogOut, X } from "lucide-react";
import Link from "next/link";

const ProfileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Avatar */}
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
      >
        <Image
          src="/assets/img/search/1.avif" // replace with dynamic user image
          alt="User"
          width={30}
          height={30}
          className="object-contain"
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 text-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-yellow-100">
          <p className="text-gray-700 font-semibold">Hello, raj</p>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700  bg-gray-200 p-2 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="py-2 overflow-y-auto h-[calc(100%-120px)] text-black text-xs">
          <Link
            href="/account"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">My Account</p>
            <p className="text-xs text-gray-500">
              Manage your profile & traveller details.
            </p>
          </Link>

          <Link
            href="/account/my-booking"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">My Bookings</p>
            <p className="text-xs text-gray-500">See booking details.</p>
          </Link>

          <Link
            href="/account/my-holiday-cart"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">My Holiday Cart</p>
            <p className="text-xs text-gray-500">
              Complete your pending payments here.
            </p>
          </Link>

          <Link
            href="/account/wishlist"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">My Wishlist</p>
            <p className="text-xs text-gray-500">
              Save tours to your wishlist for later.
            </p>
          </Link>

          <Link
            href="/account/gift-cards"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">Gift Cards</p>
            <p className="text-xs text-gray-500">Your purchase history.</p>
          </Link>

          {/* <Link
            href="/pre-departure"
            className="block px-4 py-3 hover:bg-gray-100 border-b border-dotted border-gray-500"
          >
            <p className="font-medium">Pre-departure Videos</p>
            <p className="text-xs text-gray-500">
              Key tips for a smooth journey.
            </p>
          </Link> */}
        </div>

        {/* Footer - Sign Out */}
        <div className="border-t p-4 bg-yellow-100">
          <button className="flex items-center gap-2 w-full px-4 py-3 text-left text-red-500 cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
