"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaBook,
  FaPlane,
  FaHeart,
  FaGift,
  FaVideo,
  FaEnvelope,
  FaCamera,
  FaCheck,
} from "react-icons/fa";

const Sidebar = () => {
  const [profileImg, setProfileImg] = useState(null);
  const fileInputRef = useRef(null);
  const pathname = usePathname(); // current route

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { icon: <FaUser />, label: "My Account", url: "/account" },
    { icon: <FaBook />, label: "My Booking", url: "/account/my-booking" },
    {
      icon: <FaPlane />,
      label: "My Holiday Cart",
      url: "/account/my-holiday-cart",
    },
    { icon: <FaHeart />, label: "Wishlist", url: "/account/wishlist" },
    { icon: <FaGift />, label: "Gift Cards", url: "/account/gift-cards" },
  ];

  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-6 border-b border-gray-200 pb-6 relative">
        <div className="relative">
          {profileImg ? (
            <img
              src={profileImg}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold">
              RJ
            </div>
          )}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-600 hover:text-blue-600"
          >
            <FaCamera size={14} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <h3 className="mt-3 font-semibold">Raj J</h3>
        <p className="text-sm text-gray-600">user@gmail.com</p>
        <p className="text-sm font-bold text-gray-600 flex items-center gap-1">
          +91 9298400003
          <FaCheck className="text-white text-md bg-green-400 p-1 rounded-full" />
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-2 text-gray-700">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.url;
          return (
            <li key={idx}>
              <Link
                href={item.url}
                className={`flex items-center gap-2 p-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "hover:bg-blue-50 hover:text-blue-900"
                }`}
              >
                <span className={isActive ? "text-white" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Support */}
      <div className="mt-6 text-sm bg-gray-100 p-4 rounded-md">
        <p className="font-medium mb-1">Need to talk before you depart?</p>
        <Link
          href="tel:1800227979"
          className="block text-gray-700 hover:text-blue-600"
        >
          1800 22 7979 / 1800 103 3355
        </Link>
        <p className="text-blue-600 flex items-center gap-2 mt-1">
          <FaEnvelope /> travel@powered.com
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
