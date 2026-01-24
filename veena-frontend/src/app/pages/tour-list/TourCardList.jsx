import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaHeart, FaCcVisa, FaStar } from "react-icons/fa";
import {
  Building2,
  Bus,
  Camera,
  Cookie,
  PlaneTakeoff,
  User,
} from "lucide-react";

// ✅ Sample tours data
const tours = [
  {
    id: 1,
    title: "Kashmir Escape",
    price: "₹30,000",
    image: "/assets/img/tour-card/1.avif",
    days: 5,
    destinations: "3 Cities",
    departures: "9 Dates",
    dates: [
      { date: "28 Sep 25", seats: 6 },
      { date: "02 Nov 25", seats: 3 },
      { date: "19 Dec 25", seats: 6 },
    ],
  },
  {
    id: 2,
    title: "Leh Ladakh Adventure",
    price: "₹45,000",
    image: "/assets/img/tour-card/2.avif",
    days: 7,
    destinations: "5 Cities",
    departures: "6 Dates",
    dates: [
      { date: "10 Oct 25", seats: 5 },
      { date: "20 Nov 25", seats: 2 },
    ],
  },
  {
    id: 3,
    title: "Kerala Backwaters",
    price: "₹25,000",
    image: "/assets/img/tour-card/3.avif",
    days: 4,
    destinations: "2 Cities",
    departures: "3 Dates",
    dates: [
      { date: "15 Sep 25", seats: 10 },
      { date: "05 Oct 25", seats: 4 },
    ],
  },
  {
    id: 4,
    title: "Goa Beaches",
    price: "₹20,000",
    image: "/assets/img/tour-card/4.avif",
    days: 3,
    destinations: "1 City",
    departures: "12 Dates",
    dates: [
      { date: "01 Nov 25", seats: 12 },
      { date: "15 Nov 25", seats: 8 },
    ],
  },
  {
    id: 5,
    title: "Goa Beaches",
    price: "₹20,000",
    image: "/assets/img/tour-card/1.avif",
    days: 3,
    destinations: "1 City",
    departures: "12 Dates",
    dates: [
      { date: "01 Nov 25", seats: 12 },
      { date: "15 Nov 25", seats: 8 },
    ],
  },
];

const TourCard = ({ tour }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-xs flex flex-col md:flex-row p-3 bg-white mb-4">
      {/* Left Image */}
      <div className="relative w-full md:w-1/5 flex-shrink-0">
        <Image
          src={tour.image}
          alt={tour.title}
          width={600}
          height={600}
          className="w-full h-48 md:h-50 lg:h-50 xl:h-50 object-cover rounded-lg"
        />

        {/* Wishlist */}
        <Link href="/wishlist">
          <div className="absolute top-2 right-2 group">
            <button className="bg-white rounded-full p-2 shadow hover:bg-red-50 transition">
              <FaHeart className="text-gray-500 group-hover:text-red-500" />
            </button>
            <span className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
              Add to Wishlist
            </span>
          </div>
        </Link>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-between md:px-4 mt-4 md:mt-0">
        <div>
          {/* Labels */}
          <div className="flex gap-2 mb-1">
            <span className="border border-orange-500 text-orange-500 font-bold text-[10px] px-2 py-1 rounded">
              GROUP TOUR
            </span>
            <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-1 rounded">
              Family
            </span>
          </div>

          <h2 className="text-sm font-semibold">{tour.title}</h2>
          <p className="text-yellow-500 text-sm">
            ★★★★★ <span className="text-gray-600">79 Reviews</span>
          </p>

          {/* Tooltip */}
          <div className="relative group inline-block mb-2">
            <p className="text-blue-600 text-sm cursor-pointer">
              ∞ All Inclusive
            </p>
            <div className="absolute -left-10 mt-2 hidden group-hover:block w-64 bg-white text-gray-800 text-sm rounded-lg p-4 shadow-lg border border-gray-200 z-50">
              <h4 className="font-semibold mb-3">Tour Includes</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>Hotel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cookie className="w-5 h-5" />
                  <span>Meals</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlaneTakeoff className="w-5 h-5" />
                  <span>Flight</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  <span>Sightseeing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5" />
                  <span>Transport</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCcVisa className="w-5 h-5" />
                  <span>Visa</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <User className="w-5 h-5" />
                  <span>Tour Manager</span>
                </div>
              </div>
              <p className="text-red-600 text-xs mt-3">
                *Economy class air travel included; taxes extra.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Info */}
        <div className="flex gap-6 mt-2 text-xs border-b border-gray-300 py-2">
          <div>
            <p>Days</p>
            <span className="font-bold">{tour.days}</span>
          </div>
          <div>
            <p>Destinations</p>
            <span className="text-sky-600 font-bold">{tour.destinations}</span>
          </div>
          <div>
            <p>Departure</p>
            <span className="text-sky-600 font-bold">{tour.departures}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-3 text-xs">
          <p className="text-red-500 font-semibold">Dates Filling Fast</p>
          <div className="flex gap-4 mt-1 flex-wrap">
            {tour.dates.map((d, i) => (
              <span key={i} className="text-gray-700">
                {d.date} <span className="text-red-500">({d.seats} seats)</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="md:w-1/4 w-full flex flex-col justify-center bg-blue-50 rounded-2xl items-center border border-gray-300 p-2 mt-4 md:mt-0">
        <p className="text-xs text-gray-600">Starts from</p>
        <h3 className="text-sm font-bold text-black">{tour.price}</h3>
        <p className="text-xs text-gray-500">per person on twin sharing</p>
        <p className="text-xs text-gray-500">
          EMI from <span className="text-sky-600">₹1,012/mo</span>
        </p>
        <Link
          href="tour-details"
          className="bg-red-700 text-center text-xs text-white hover:bg-red-500 w-full py-2 mt-2 rounded font-semibold cursor-pointer"
        >
          Book Online
        </Link>
        <Link
          href="tour-details"
          className="border-blue-500 border text-center bg-white text-blue-500 text-xs w-full py-2 mt-2 rounded font-semibold"
        >
          View Tour Details
        </Link>
        <div className="mt-4 flex gap-6 text-xs">
          <Link href="compare-tours" className="text-black">
            🔄 Compare
          </Link>
          <Link href="#" className="text-black">
            💬 Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// ✅ Main component: maps tours
const TourCardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;

  // Calculate index range
  const indexOfLast = currentPage * toursPerPage;
  const indexOfFirst = indexOfLast - toursPerPage;
  const currentTours = tours.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(tours.length / toursPerPage);
  return (
    <div>
      {/* Render tours */}
      {currentTours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border text-xs cursor-pointer rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-full cursor-pointer ${
              currentPage === i + 1
                ? "bg-blue-900 text-white"
                : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border text-xs rounded cursor-pointer  disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TourCardList;
