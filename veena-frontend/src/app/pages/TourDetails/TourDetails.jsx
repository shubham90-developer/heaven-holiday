"use client";

import React from "react";
import { FaStar } from "react-icons/fa";
import Testimonials from "./Testimonials";
import Breadcrumb from "@/app/components/Breadcum";
import Image from "next/image";
import {
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Download,
  Heart,
  Hotel,
  Mail,
  Map,
  Phone,
  PlaneTakeoff,
  Share2,
  User,
  User2,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import TourActions from "./TourActions";
import PricingModal from "./PricingModal";
import TourGallery from "./TourGallery";
import DepartureBooking from "./DepartureBooking";
import StickyNavbar from "./StickyNavbar";
import Itinerary from "./Itinerary";
import TourDetailsTabs from "./TourDetailsTabs";
import NeedToKnow from "./NeedToKnow";
import TourInformation from "./TourInformation";
import CancellationPolicy from "./CancellationPolicy";
import Upgrades from "./Upgrades";
import RightMap from "./RightMap";
import TourReview from "@/app/components/TourReview";
import { useParams } from "next/navigation";
import { useGetTourPackageQuery } from "store/toursManagement/toursPackagesApi";

const TourDetails = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Search Holiday Package", href: null },
  ];

  const { id: packageId } = useParams();
  const {
    data: tourPackage,
    isLoading: tourPackageLoading,
    error: tourPackageError,
  } = useGetTourPackageQuery();

  const packages = tourPackage?.data?.filter((item) => {
    return item._id === packageId;
  });

  const tourData = packages?.[0];

  console.log("packages", packages);

  const handleScroll = () => {
    const section = document.getElementById("departure-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Loading state
  if (tourPackageLoading) {
    return <div className="text-center py-20">Loading tour details...</div>;
  }

  // Error state
  if (tourPackageError || !tourData) {
    return (
      <div className="text-center py-20 text-red-500">
        Tour not found or error loading details.
      </div>
    );
  }

  // Calculate total states and cities
  const totalStates = tourData.states?.length || 0;
  const totalCities =
    tourData.metadata?.uniqueCities || tourData.cityDetails?.length || 0;

  // Format route display
  const routeDisplay =
    tourData.states
      ?.map((state) => {
        const cities = state.cities?.join(", ") || "";
        return `${state.name}: ${cities}`;
      })
      .join(" → ") ||
    tourData.route ||
    "Route information not available";

  // Format city nights display
  const cityNightsDisplay =
    tourData.cityDetails
      ?.map((city) => `${city.name} (${city.nights}N)`)
      .join(" → ") || "";

  // Calculate EMI
  const basePrice =
    tourData.baseJoiningPrice || tourData.baseFullPackagePrice || 0;
  const emiAmount = Math.ceil(basePrice / 12);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Main Tour Image */}
            <div className="relative group">
              <Image
                width={600}
                height={600}
                src={
                  tourData.galleryImages?.[0] || "/assets/img/tour-list/1.webp"
                }
                alt={tourData.title}
                className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg shadow cursor-pointer"
              />
              {/* Review Card */}
              <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <Testimonials />
              </div>
            </div>

            {/* Info + Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Tour Info */}
              <div>
                <span className="text-orange-500 border border-orange-500 text-[10px] px-2 py-1 rounded">
                  {tourData.tourType?.toUpperCase() || "GROUP TOUR"}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold mt-3 leading-snug">
                  {tourData.title}
                </h1>

                {/* Ratings */}
                <div className="flex items-center mt-2 text-yellow-500 flex-wrap">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    25 Reviews
                  </span>
                  <span
                    id="tour-reviews"
                    className="ml-2 text-xs sm:text-sm text-blue-600 font-bold underline cursor-pointer"
                  >
                    85 Reviews
                  </span>
                </div>

                {/* Duration, Location */}
                <p className="mt-3 text-gray-900 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-black" />
                    <strong>{tourData.days} </strong>Days
                  </span>
                  <span className="flex items-center gap-1">
                    <Map className="w-4 h-4 text-black" />
                    <strong>{totalStates}</strong>{" "}
                    {totalStates === 1 ? "State" : "States"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-black" />
                    <strong>{totalCities}</strong>{" "}
                    {totalCities === 1 ? "City" : "Cities"}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-2">
                  <Map className="w-4 h-4 text-black" />
                  {cityNightsDisplay || routeDisplay}
                </p>

                <Link
                  href="#itinerary"
                  id="view-daywise-tour-itinerary"
                  className="text-blue-600 font-bold underline text-xs sm:text-sm mt-2 inline-block"
                >
                  View daywise tour itinerary
                </Link>
              </div>

              {/* Enquiry Form */}
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-blue-50">
                <h3 className="text-sm font-semibold mb-3">
                  Want us to call you?
                </h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-400 p-3 text-xs rounded-xl mb-3"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full border border-gray-400 text-xs p-3 rounded-xl mb-3"
                />
                <button className="bg-red-700 w-full py-2 text-sm rounded-lg text-white font-semibold hover:bg-red-500 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Request Call Back
                </button>
              </div>
            </div>

            {/* Why Travel Section */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tourData.tourManagerIncluded && (
                <div className="flex items-start gap-3">
                  <User className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">
                      Heaven Holiday Tour Manager
                    </h3>
                    <div
                      className="text-gray-600 text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{
                        __html:
                          tourData.tourManagerNote ||
                          "This tour includes the services of Heaven Holiday's Tour Manager...",
                      }}
                    />
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Why travel with Heaven Holiday
                </h3>
                <ul className="list-disc ml-5 text-gray-600 text-xs sm:text-sm space-y-1">
                  {tourData.whyTravel && tourData.whyTravel.length > 0 ? (
                    tourData.whyTravel.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))
                  ) : (
                    <>
                      <li>Expert tour manager all throughout the tour.</li>
                      <li>All meals included in tour price.</li>
                      <li>Music, fun and games every day.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Card */}
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-5 w-full h-fit">
            <TourGallery galleryImages={tourData.galleryImages} />
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-blue-50 mt-4">
              {/* Pricing Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-black text-xs">
                    {tourData.departures?.[0]?.city || "Mumbai"} to{" "}
                    {tourData.departures?.[0]?.city || "Mumbai"}
                    <br />
                    Starts from
                  </p>
                  <p className="text-lg font-bold">
                    ₹{tourData.baseFullPackagePrice?.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-black text-xs">
                    All-inclusive tour from
                    <br />
                    {tourData.departures?.[0]?.city || "Mumbai"} to{" "}
                    {tourData.departures?.[0]?.city || "Mumbai"}
                  </p>
                </div>
              </div>
              {/* Joining/Leaving */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-black text-xs">
                    Joining/Leaving
                    <br />
                    Starts from
                  </p>
                  <p className="text-lg font-semibold">
                    ₹{tourData.baseJoiningPrice?.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-black text-xs">
                    Book your own flights & join at destination.
                  </p>
                </div>
              </div>

              {/* Twin-sharing note */}
              <div className="bg-gray-900 py-2 px-3 rounded mb-2 text-center">
                <p className="text-[10px] text-white">
                  Mentioned prices are on a twin-sharing basis.
                </p>
                <button
                  onClick={handleScroll}
                  className="bg-red-700 w-full py-2 rounded-full text-sm font-semibold hover:bg-red-500 text-white cursor-pointer"
                >
                  Dates & Prices
                </button>
              </div>

              {/* EMI */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 rounded-md bg-gray-600 text-xs mt-2">
                <span className="text-white text-center sm:text-left">
                  EMI start at{" "}
                  <span className="font-semibold underline">
                    ₹{emiAmount.toLocaleString("en-IN")}/mo
                  </span>
                </span>
                <PricingModal />
              </div>

              {/* Tour Includes */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold mb-2">Tour Includes</h4>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-700">
                  {tourData.tourIncludes && tourData.tourIncludes.length > 0 ? (
                    tourData.tourIncludes.map((include, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <Image
                          src={include.image}
                          alt={include.title}
                          width={20}
                          height={20}
                          className="w-5 h-5 mb-1 object-cover"
                        />
                        {include.title}
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex flex-col items-center">
                        <Hotel className="w-5 h-5 mb-1 text-yellow-600" />
                        Hotel
                      </div>
                      <div className="flex flex-col items-center">
                        <Utensils className="w-5 h-5 mb-1 text-yellow-600" />
                        Meals
                      </div>
                      <div className="flex flex-col items-center">
                        <PlaneTakeoff className="w-5 h-5 mb-1 text-yellow-600" />
                        Flight
                      </div>
                      <div className="flex flex-col items-center">
                        <Camera className="w-5 h-5 mb-1 text-yellow-600" />
                        Sightseeing
                      </div>
                      <div className="flex flex-col items-center">
                        <Bus className="w-5 h-5 mb-1 text-yellow-600" />
                        Transport
                      </div>
                    </>
                  )}
                  {tourData.tourManagerIncluded && (
                    <div className="flex flex-col items-center">
                      <User2 className="w-5 h-5 mb-1 text-yellow-600" />
                      Tour Manager
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <TourActions />
          </div>
        </div>
      </section>

      <DepartureBooking tourData={tourData} />
      <StickyNavbar />

      <section className="py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative">
              <Itinerary itinerary={tourData.itinerary} />
              <TourDetailsTabs tourData={tourData} />
              <TourInformation tourData={tourData} />
              <NeedToKnow tourData={tourData} />
              <CancellationPolicy tourData={tourData} />
              <Upgrades />
            </div>
            <div className="lg:col-span-1">
              <RightMap />
            </div>
          </div>
        </div>
      </section>

      <TourReview />
    </>
  );
};

export default TourDetails;
