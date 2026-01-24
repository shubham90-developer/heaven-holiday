"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Plane, Hotel, MapPin } from "lucide-react";

const TourDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("flights");

  // ✈️ Flight data
  const flights = [
    {
      from: { city: "Mumbai", date: "18 Nov", time: "02:40" },
      to: { city: "Nairobi", date: "18 Nov", time: "06:35" },
      airline: "/assets/img/kq.webp",
      duration: "6h 25m",
    },
    {
      from: { city: "Nairobi", date: "18 Nov", time: "07:45" },
      to: { city: "Johannesburg", date: "18 Nov", time: "10:55" },
      airline: "/assets/img/kq.webp",
      duration: "4h 10m",
    },
    {
      from: { city: "Victoria Falls", date: "26 Nov", time: "18:05" },
      to: { city: "Nairobi", date: "26 Nov", time: "22:20" },
      airline: "/assets/img/kq.webp",
      duration: "03:15",
    },
    {
      from: { city: "Nairobi", date: "02 Dec", time: "16:45" },
      to: { city: "Mumbai", date: "03 Dec", time: "01:30" },
      airline: "/assets/img/kq.webp",
      duration: "06:15",
    },
  ];

  // 🏨 Hotel Data
  const hotels = [
    {
      city: "Sun City - South Africa",
      hotel: "Sun City Cabanas / or similar",
      checkIn: "18 Nov",
      checkOut: "19 Nov",
    },
    {
      city: "Johannesburg - South Africa",
      hotel: "Peermont Metcourt Hotel / or similar",
      checkIn: "19 Nov",
      checkOut: "20 Nov",
    },
    {
      city: "George - South Africa",
      hotel: "Protea Hotel by Marriott George King George / or similar",
      checkIn: "20 Nov",
      checkOut: "22 Nov",
    },
    {
      city: "Cape Town - South Africa",
      hotel: "Cresta Grande Cape Town / or similar",
      checkIn: "22 Nov",
      checkOut: "25 Nov",
    },
    {
      city: "Victoria Falls - Zimbabwe",
      hotel: "Elephant Hills Resort / or similar",
      checkIn: "25 Nov",
      checkOut: "26 Nov",
    },
    {
      city: "Nairobi - Kenya",
      hotel: "The Concord Hotel & Suites / or similar",
      checkIn: "26 Nov",
      checkOut: "27 Nov",
    },
  ];

  // 📍 Reporting / Dropping
  const reportingData = [
    {
      type: "Scheduled Tour Guests",
      reporting: "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
      dropping: "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
    },
    {
      type: "Joining & Leaving Guests",
      reporting: "Joining & Leaving option is Not Available",
      dropping: "Joining & Leaving option is Not Available",
    },
  ];

  return (
    <section className="py-10 lg:px-0 px-4" id="details">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Tour details</h2>
        <p className="text-gray-500 italic mb-4">
          Best facilities with no added cost.
        </p>

        {/* Tabs */}
        <div className="flex rounded-t-lg overflow-hidden mb-6">
          {["flights", "accommodation", "reporting"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 bg-blue-50 mx-2 cursor-pointer rounded-2xl py-3 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "bg-blue-800 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {tab === "flights" && "Flight Details"}
              {tab === "accommodation" && "Accommodation Details"}
              {tab === "reporting" && "Reporting & Dropping"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="border rounded-lg bg-white overflow-hidden">
          {activeTab === "flights" && (
            <div>
              {flights.map((flight, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-6 p-6 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* From */}
                  <div>
                    <p className="font-medium">{flight.from.city}</p>
                    <p className="text-xs text-gray-500">
                      {flight.from.date} | {flight.from.time}
                    </p>
                  </div>

                  {/* Airline + Duration */}
                  <div className="flex flex-col items-center">
                    <Plane className="w-5 h-5 text-blue-800 mb-1" />
                    <Image
                      src={flight.airline}
                      alt="Airline"
                      width={80}
                      height={20}
                      className="object-contain h-10"
                    />
                    <span className="bg-gray-100 px-3 py-1 mt-2 rounded-full text-xs text-gray-700">
                      {flight.duration}
                    </span>
                  </div>

                  {/* To */}
                  <div className="text-right">
                    <p className="font-medium">{flight.to.city}</p>
                    <p className="text-xs text-gray-500">
                      {flight.to.date} | {flight.to.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "accommodation" && (
            <div>
              {hotels.map((hotel, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-6 p-6 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div>
                    <p className="font-medium">{hotel.city}</p>
                    <p className="text-xs text-gray-500">{hotel.hotel}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                    <p className="text-sm">
                      {hotel.checkIn} → {hotel.checkOut}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reporting" && (
            <div>
              {reportingData.map((r, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row justify-between gap-6 p-6 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-800" />
                    <div>
                      <p className="font-semibold text-sm">Guest Type</p>
                      <p className="text-sm text-gray-700">{r.type}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Reporting Point</p>
                    <p className="text-sm text-gray-700">{r.reporting}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Dropping Point</p>
                    <p className="text-sm text-gray-700">{r.dropping}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="mt-4 text-xs text-gray-500">
          <p className="font-semibold mb-2 text-black">Note :</p>
          <p>• Flight details are tentative only. They may change.</p>
          <p>• Hotel details are tentative only. They may change.</p>
        </div>
      </div>
    </section>
  );
};

export default TourDetailsTabs;
