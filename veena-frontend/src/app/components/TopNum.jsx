"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  PhoneCall,
  PhoneIncoming,
  ChevronRightSquareIcon,
  MoveRight,
  ArrowRightCircle,
} from "lucide-react";
import Link from "next/link";

const PhoneDropdown = () => {
  const numbers = [
    "1800 22 7979",
    "1800 313 5555",
    "+91 22 2101 7979",
    "+91 22 2101 6969",
    "+91 915 200 4511",
  ];

  const [index, setIndex] = useState(0);
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  const timeoutRef = useRef(null);

  // Auto cycle numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % numbers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [numbers.length]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPhoneInfo(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPhoneInfo(false), 400);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Button */}
      <button className="flex items-center gap-3 bg-gray-600 hover:bg-gray-600 rounded-full pl-2 pr-3 py-1.5 text-xs font-semibold cursor-pointer overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-center w-5 h-5 bg-blue-700 rounded-full">
          <Phone className="w-2 h-3 text-white" />
        </div>

        {/* Animated Numbers */}
        <div className="relative w-25 h-5 overflow-hidden">
          <div
            key={index}
            className="absolute inset-0 flex items-center text-white animate-slide-fade"
          >
            {numbers[index]}
          </div>
        </div>

        {showPhoneInfo ? (
          <ChevronUp className="w-4 h-4 text-white" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute z-30 right-0 mt-3 w-80 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-100 transition-all duration-500 ease-in-out ${
          showPhoneInfo
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="p-5 space-y-4 text-sm leading-relaxed">
          <div>
            <p className="font-semibold flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" /> Toll Free Numbers
            </p>
            <div className="flex flex-col gap-1">
              <Link
                href="tel:1800227979"
                className="font-bold text-black hover:text-blue-900"
              >
                1800 22 7979
              </Link>
              <Link
                href="tel:18003135555"
                className="font-bold text-black hover:text-blue-900"
              >
                1800 313 5555
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold flex items-center gap-2 text-gray-700">
              <PhoneCall className="w-4 h-4" /> Call us on
            </p>
            <div className="flex flex-col gap-1">
              <Link
                href="tel:+91 22 2101 7979"
                className="font-bold text-black hover:text-blue-900"
              >
                +91 22 2101 7979
              </Link>
              <Link
                href="tel:+91 22 2101 6969"
                className="font-bold text-black hover:text-blue-900"
              >
                +91 22 2101 6969
              </Link>
            </div>
          </div>

          <div>
            <p className="font-semibold flex items-center gap-2 text-gray-700">
              <PhoneCall className="w-4 h-4" /> Call us on Foreign Nationals /
              NRIs
            </p>
            <p className="text-xs mx-3 text-black">
              Within India:{" "}
              <Link
                href="tel:+91 915 200 4511"
                className="font-bold text-sm text-black hover:text-blue-900"
              >
                +91 915 200 4511
              </Link>
            </p>
            <p className="text-xs mx-3 text-black">
              Outside India:{" "}
              <Link
                href="tel:+91 887 997 2221"
                className="font-bold text-sm text-black hover:text-blue-900"
              >
                +91 887 997 2221
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p>
              Business hours:{" "}
              <span className="font-bold text-gray-800">10AM - 7PM</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <a
              href="mailto:travel@heavenHoliday.com"
              className="text-blue-600 font-medium hover:underline hover:text-blue-900"
            >
              travel@heavenHoliday.com
            </a>
          </div>

          <div className="border-t border-gray-200 pt-2">
            <Link
              href="/contact-us"
              className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
            >
              Nearest Heaven Holiday office{" "}
              <span>
                <ArrowRightCircle />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide + Fade animation */}
      <style jsx>{`
        @keyframes slideFade {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          30% {
            opacity: 1;
            transform: translateY(0);
          }
          70% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
        .animate-slide-fade {
          animation: slideFade 4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PhoneDropdown;
