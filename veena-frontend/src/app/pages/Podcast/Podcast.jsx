// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaSearch, FaPlay } from "react-icons/fa";
// import { FiChevronDown } from "react-icons/fi";
// import PodcastLeftList from "./PodcastLeftList";

// import { useCreateEnquiryMutation } from "../../../../store/enquiryApi/enquiryApi";

// const toursData = {
//   "Vibrant North East": [
//     {
//       id: 1,
//       img: "/assets/img/tour-card/1.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Splendours",
//       reviews: 40,
//       days: 10,
//       destinations: "10 Countries 16 Cities",
//       departures: "7 Dates",
//       emi: "₹8,835/mo",
//       price: "₹2,62,000",
//     },
//     {
//       id: 2,
//       img: "/assets/img/tour-card/2.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Panorama",
//       reviews: 22,
//       days: 8,
//       destinations: "8 Countries 12 Cities",
//       departures: "2 Dates",
//       emi: "₹8,363/mo",
//       price: "₹2,48,000",
//     },
//     {
//       id: 3,
//       img: "/assets/img/tour-card/3.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Wonders",
//       reviews: 39,
//       days: 13,
//       destinations: "11 Countries 21 Cities",
//       departures: "5 Dates",
//       emi: "₹10,858/mo",
//       price: "₹3,22,000",
//     },
//     {
//       id: 4,
//       img: "/assets/img/tour-card/4.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Jewels with Versailles",
//       reviews: 197,
//       days: 15,
//       destinations: "12 Countries 23 Cities",
//       departures: "4 Dates",
//       emi: "₹12,982/mo",
//       price: "₹3,85,000",
//     },
//   ],
//   "Enchanting Uttar Pradesh": [
//     {
//       id: 1,
//       img: "/assets/img/tour-card/1.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Splendours",
//       reviews: 40,
//       days: 10,
//       destinations: "10 Countries 16 Cities",
//       departures: "7 Dates",
//       emi: "₹8,835/mo",
//       price: "₹2,62,000",
//     },

//     {
//       id: 3,
//       img: "/assets/img/tour-card/3.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Wonders",
//       reviews: 39,
//       days: 13,
//       destinations: "11 Countries 21 Cities",
//       departures: "5 Dates",
//       emi: "₹10,858/mo",
//       price: "₹3,22,000",
//     },
//     {
//       id: 4,
//       img: "/assets/img/tour-card/4.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Jewels with Versailles",
//       reviews: 197,
//       days: 15,
//       destinations: "12 Countries 23 Cities",
//       departures: "4 Dates",
//       emi: "₹12,982/mo",
//       price: "₹3,85,000",
//     },
//   ],
//   "Royal Rajasthan": [
//     {
//       id: 1,
//       img: "/assets/img/tour-card/1.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Splendours",
//       reviews: 40,
//       days: 10,
//       destinations: "10 Countries 16 Cities",
//       departures: "7 Dates",
//       emi: "₹8,835/mo",
//       price: "₹2,62,000",
//     },
//     {
//       id: 2,
//       img: "/assets/img/tour-card/2.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Panorama",
//       reviews: 22,
//       days: 8,
//       destinations: "8 Countries 12 Cities",
//       departures: "2 Dates",
//       emi: "₹8,363/mo",
//       price: "₹2,48,000",
//     },
//   ],
//   "Majestic Madhya Pradesh": [
//     {
//       id: 2,
//       img: "/assets/img/tour-card/2.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Panorama",
//       reviews: 22,
//       days: 8,
//       destinations: "8 Countries 12 Cities",
//       departures: "2 Dates",
//       emi: "₹8,363/mo",
//       price: "₹2,48,000",
//     },
//     {
//       id: 3,
//       img: "/assets/img/tour-card/3.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Wonders",
//       reviews: 39,
//       days: 13,
//       destinations: "11 Countries 21 Cities",
//       departures: "5 Dates",
//       emi: "₹10,858/mo",
//       price: "₹3,22,000",
//     },
//     {
//       id: 4,
//       img: "/assets/img/tour-card/4.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Jewels with Versailles",
//       reviews: 197,
//       days: 15,
//       destinations: "12 Countries 23 Cities",
//       departures: "4 Dates",
//       emi: "₹12,982/mo",
//       price: "₹3,85,000",
//     },
//   ],
//   "Exotic Kerela": [
//     {
//       id: 1,
//       img: "/assets/img/tour-card/1.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Splendours",
//       reviews: 40,
//       days: 10,
//       destinations: "10 Countries 16 Cities",
//       departures: "7 Dates",
//       emi: "₹8,835/mo",
//       price: "₹2,62,000",
//     },
//     {
//       id: 2,
//       img: "/assets/img/tour-card/2.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Panorama",
//       reviews: 22,
//       days: 8,
//       destinations: "8 Countries 12 Cities",
//       departures: "2 Dates",
//       emi: "₹8,363/mo",
//       price: "₹2,48,000",
//     },
//     {
//       id: 3,
//       img: "/assets/img/tour-card/3.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Wonders",
//       reviews: 39,
//       days: 13,
//       destinations: "11 Countries 21 Cities",
//       departures: "5 Dates",
//       emi: "₹10,858/mo",
//       price: "₹3,22,000",
//     },
//     {
//       id: 4,
//       img: "/assets/img/tour-card/4.avif",
//       tag: "Durga Puja Spl.Departures",
//       badge: "GROUP Tour EUEP",
//       title: "European Jewels with Versailles",
//       reviews: 197,
//       days: 15,
//       destinations: "12 Countries 23 Cities",
//       departures: "4 Dates",
//       emi: "₹12,982/mo",
//       price: "₹3,85,000",
//     },
//   ],
// };

// const PodcastList = () => {
//   const [activeMonth, setActiveMonth] = useState("Oct");

//   const [formData, setFormData] = useState({
//     name: "",
//     mono: "",
//   });

//   const [createEnquiry, { isLoading: isSubmitting }] =
//     useCreateEnquiryMutation();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const submitData = {
//         name: formData.name,
//         mono: formData.mono,
//         destinations: "-",
//         email: "-",
//         message: "-",
//         modeOfCommunication: "call",
//       };

//       await createEnquiry(submitData).unwrap();

//       // Reset form
//       setFormData({
//         name: "",
//         mono: "",
//       });

//       alert("Call back request submitted successfully!");
//     } catch (error) {
//       console.error("Failed to submit request:", error);
//       alert(error?.data?.message || "Failed to submit. Please try again.");
//     }
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen relative">
//       {/* Header Section */}
//       <div className="relative bg-gradient-to-r from-[#0a2a66] to-[#4a1f8d] text-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between py-14 relative z-10">
//           {/* Left Content */}
//           <div className="max-w-2xl">
//             <p className="text-sm mb-3">
//               <span className="opacity-75">Home &gt;</span>{" "}
//               <span className="font-semibold">Podcast</span>
//             </p>
//             <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-snug">
//               Explore the World through Our Travel Podcast!
//             </h1>
//             <p className="text-base opacity-90">
//               Embark the wonders of India and the world through Heaven Holiday's
//               podcasts.
//             </p>

//             {/* Search */}
//             <div className="mt-8 flex items-center bg-white rounded-full shadow-md overflow-hidden">
//               <input
//                 type="text"
//                 placeholder="Search for a podcast episodes"
//                 className="flex-1 px-5 py-3 text-gray-600 text-sm outline-none rounded-l-full"
//               />
//               <button className="px-5 py-3 bg-gray-100 text-gray-500 rounded-r-full hover:bg-gray-200 transition">
//                 <FaSearch />
//               </button>
//             </div>
//           </div>

//           {/* Right Sidebar (Request Call Back) */}
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mt-10 lg:mt-0">
//             <h3 className="text-gray-900 font-semibold text-lg mb-4">
//               Request Call Back
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name */}
//               <input
//                 type="text"
//                 placeholder="Full Name*"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 disabled={isSubmitting}
//                 required
//                 className="w-full border rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />

//               {/* Phone Input with Flag */}
//               <div className="flex items-center border rounded-md overflow-hidden">
//                 <div className="flex items-center px-3 py-2 border-r bg-gray-50 min-w-[70px]">
//                   <img
//                     src="https://flagcdn.com/w20/in.png"
//                     alt="India Flag"
//                     className="w-5 h-4 mr-2"
//                   />
//                   <span className="text-sm text-gray-700">+91</span>
//                   <FiChevronDown className="ml-1 text-gray-500" />
//                 </div>
//                 <input
//                   type="tel"
//                   placeholder="Mobile Number"
//                   name="mono"
//                   value={formData.mono}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   pattern="[0-9]{10}"
//                   maxLength={10}
//                   required
//                   className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
//                 />
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full cursor-pointer text-sm bg-red-700 text-white font-semibold py-2.5 rounded-md hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Submitting..." : "Send Request"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Smooth Curve Bottom */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//           <svg
//             viewBox="0 0 1440 120"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//             className="w-full h-24"
//           >
//             <path
//               d="M0,60 C360,140 1080,-20 1440,60 L1440,120 L0,120 Z"
//               fill="#f9fafb"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Body Section */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT PODCAST LIST */}
//         <PodcastLeftList />

//         {/* RIGHT SIDEBAR (Popular Travel Months) */}
//         <div>
//           <h3 className="text-gray-900 font-semibold text-base mb-3">
//             Popular Travel Months
//           </h3>
//           {/* Tabs */}
//           <div className="flex gap-6 border-b text-sm">
//             {["Oct", "Nov", "Dec"].map((m) => (
//               <button
//                 key={m}
//                 className={`pb-2 ${
//                   activeMonth === m
//                     ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveMonth(m)}
//               >
//                 {m}
//               </button>
//             ))}
//           </div>

//           <p className="text-xs text-gray-600 mt-2 mb-4">
//             We have 126 packages for this month s
//             <a href="#" className="text-blue-600 hover:underline">
//               View All
//             </a>
//           </p>

//           {/* Render tours for selected month */}
//           <div className="space-y-6">
//             {toursData["Vibrant North East"].slice(0, 2).map((tour) => (
//               <div
//                 key={tour.id}
//                 className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden"
//               >
//                 <div className="flex">
//                   {/* Left Image */}
//                   <div className="relative w-1/2">
//                     <img
//                       src={tour.img}
//                       alt={tour.title}
//                       className="w-full h-full object-cover p-2 rounded-2xl"
//                     />

//                     {/* Tag */}
//                     <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded">
//                       {tour.tag.slice(0, 16)}...
//                     </span>
//                   </div>

//                   {/* Right Content */}
//                   <div className="w-2/2 p-2">
//                     <p className="bg-orange-500 text-white border border-red-500 inline-block py-0.6 px-2 text-[10px] rounded-2xl">
//                       {tour.badge}
//                     </p>
//                     <h3 className="font-bold text-lg">
//                       {tour.title.slice(0, 20)}...
//                     </h3>

//                     {/* Reviews */}
//                     <div className="flex items-center text-yellow-500 text-sm my-2">
//                       {"★".repeat(5)}{" "}
//                       <span className="ml-2 text-gray-600">
//                         {tour.reviews} Reviews
//                       </span>
//                     </div>

//                     {/* All Inclusive */}
//                     <p className="text-blue-600 text-sm mb-2">
//                       ∞ All Inclusive
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-4 pt-0">
//                   {/* Info */}
//                   <div className="text-sm text-gray-600 space-y-1 mb-4 flex justify-between">
//                     <div className="text-xs">
//                       <p className="font-semibold">Days:</p>
//                       <p className="text-black font-bold">{tour.days}</p>
//                     </div>
//                     <div className="text-xs">
//                       <p className="font-semibold">Destinations:</p>
//                       <p className="text-blue-900 font-bold">
//                         {tour.destinations}
//                       </p>
//                     </div>
//                     <div className="text-xs">
//                       <p className="font-semibold">Departures:</p>
//                       <p className="text-blue-900 font-bold">
//                         {tour.departures}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
//                     {/* Price */}
//                     <div className="text-xs text-gray-600 mb-3 flex justify-between">
//                       <div>
//                         <p>EMI from</p>
//                         <span className="text-blue-600 font-bold">
//                           {tour.emi}
//                         </span>
//                       </div>
//                       <div>
//                         <p>
//                           Starts from{" "}
//                           <span className="font-bold">{tour.price}</span>
//                         </p>
//                         <p>per person on twin sharing</p>
//                       </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-between gap-2">
//                       <Link
//                         href="tour-details"
//                         className="flex-1 border border-blue-600 text-center font-bold text-blue-600 px-2 py-2 rounded-md text-sm"
//                       >
//                         View Tour Details
//                       </Link>
//                       <Link
//                         href="tour-details"
//                         className="flex-1 bg-red-700 text-center text-white font-bold px-2 py-2 rounded-md text-sm"
//                       >
//                         Book Online
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PodcastList;

"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import PodcastLeftList from "./PodcastLeftList";

import { useCreateEnquiryMutation } from "../../../../store/enquiryApi/enquiryApi";
import { useGetTourPackageQuery } from "../../../../store/toursManagement/toursPackagesApi";

const MONTH_MAP = {
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const PodcastList = () => {
  const [activeMonth, setActiveMonth] = useState("Oct");

  const { data, isLoading } = useGetTourPackageQuery();

  const [formData, setFormData] = useState({
    name: "",
    mono: "",
  });

  const [createEnquiry, { isLoading: isSubmitting }] =
    useCreateEnquiryMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEnquiry({
        name: formData.name,
        mono: formData.mono,
        destinations: "-",
        email: "-",
        message: "-",
        modeOfCommunication: "call",
      }).unwrap();

      setFormData({ name: "", mono: "" });

      alert("Call back request submitted successfully!");
    } catch (error) {
      alert(error?.data?.message || "Failed to submit.");
    }
  };

  /* ================= FILTER TOURS BY MONTH ================= */

  const filteredTours = useMemo(() => {
    if (!data?.data) return [];

    const monthIndex = MONTH_MAP[activeMonth];

    return data.data.filter((tour) =>
      tour.departures?.some(
        (dep) => new Date(dep.date).getMonth() === monthIndex
      )
    );
  }, [data, activeMonth]);

  if (isLoading) {
    return <p className="p-10">Loading tours...</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen relative">
      {/* HEADER (UNCHANGED) */}
      <div className="relative bg-gradient-to-r from-[#0a2a66] to-[#4a1f8d] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between py-14">

          <div className="max-w-2xl">
            <p className="text-sm mb-3">
              <span className="opacity-75">Home &gt;</span>{" "}
              <span className="font-semibold">Podcast</span>
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Explore the World through Our Travel Podcast!
            </h1>

            <div className="mt-8 flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for a podcast episodes"
                className="flex-1 px-5 py-3 text-gray-600 text-sm outline-none"
              />
              <button className="px-5 py-3 bg-gray-100 text-gray-500">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* CALLBACK FORM (UNCHANGED) */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mt-10 lg:mt-0">
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Request Call Back
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                className="w-full border rounded-md px-4 py-2 text-sm"
              />

              <div className="flex items-center border rounded-md overflow-hidden">
                <div className="flex items-center px-3 py-2 border-r bg-gray-50">
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="India Flag"
                    className="w-5 h-4 mr-2"
                  />
                  <span className="text-sm">+91</span>
                  <FiChevronDown className="ml-1 text-gray-500" />
                </div>

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  name="mono"
                  value={formData.mono}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  className="flex-1 px-3 py-2 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm bg-red-700 text-white py-2.5 rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PodcastLeftList />

        {/* POPULAR MONTHS */}
        <div>
          <h3 className="text-gray-900 font-semibold text-base mb-3">
            Popular Travel Months
          </h3>

          <div className="flex gap-6 border-b text-sm">
            {["Oct", "Nov", "Dec"].map((m) => (
              <button
                key={m}
                className={`pb-2 ${
                  activeMonth === m
                    ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveMonth(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-2 mb-4">
            We have {filteredTours.length} packages for this month
          </p>

          {/* TOURS */}
          <div className="space-y-6">
            {filteredTours.slice(0, 2).map((tour) => {
              const monthIndex = MONTH_MAP[activeMonth];

              const monthDepartures = tour.departures.filter(
                (dep) => new Date(dep.date).getMonth() === monthIndex
              );

              const price =
                monthDepartures[0]?.fullPackagePrice ||
                tour.baseFullPackagePrice;

              const emi = Math.round(price / 12);

              const destinations = tour.states
                ?.map((s) => s.name)
                .join(", ");

              return (
                <div
                  key={tour._id}
                  className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{tour.title}</h3>

                    <div className="text-xs text-gray-600 mt-2 flex justify-between">
                      <div>
                        <p className="font-semibold">Days</p>
                        <p className="font-bold">{tour.days}</p>
                      </div>

                      <div>
                        <p className="font-semibold">Destinations</p>
                        <p className="font-bold">{destinations}</p>
                      </div>

                      <div>
                        <p className="font-semibold">Departures</p>
                        <p className="font-bold">
                          {monthDepartures.length} Dates
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-2xl mt-4">
                      <div className="text-xs flex justify-between">
                        <div>
                          <p>EMI from</p>
                          <span className="text-blue-600 font-bold">
                            ₹{emi}/mo
                          </span>
                        </div>

                        <div>
                          <p>
                            Starts from{" "}
                            <span className="font-bold">₹{price}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Link
                          href={`/tour-details/${tour._id}`}
                          className="flex-1 border border-blue-600 text-center font-bold text-blue-600 px-2 py-2 rounded-md text-sm"
                        >
                          View Tour Details
                        </Link>

                        <Link
                          href={`/tour-details/${tour._id}`}
                          className="flex-1 bg-red-700 text-center text-white font-bold px-2 py-2 rounded-md text-sm"
                        >
                          Book Online
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastList;

