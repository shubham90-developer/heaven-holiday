"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcum";
import DekhoApnaDesh from "@/app/pages/Hero/DekhoApnaDesh";
import TourReview from "@/app/components/TourReview";
import HolidayDestinations from "./HolidayDestinations";
import ContactForm from "./ContactForm";
import { useCreateEnquiryMutation } from "../../../../store/enquiryApi/enquiryApi";
import toast from "react-hot-toast";
import { useGetOfficeByIdQuery } from "../../../../store/contact-office/contactOfficeApi";
import { useParams } from "next/navigation";

const OfficeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOfficeByIdQuery(id);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [createEnquiry, { isLoading: isSubmitting }] =
    useCreateEnquiryMutation();

  const [formData, setFormData] = useState({
    name: "",
    mono: "",
    email: "",
    destinations: "-",
  });

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: null },
  ];

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);

    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    return `${formattedHour}:${minute} ${ampm}`;
  };

  const office = data?.data;

  const hours =
    office?.timings?.length > 0
      ? office.timings.map((t) => ({
        day: t.day.slice(0, 3),
        time: t.closed
          ? "Closed"
          : `${formatTime(t.open)} - ${formatTime(t.close)}`,
      }))
      : [
        { day: "Mon", time: "Closed" },
        { day: "Tue", time: "Closed" },
        { day: "Wed", time: "Closed" },
        { day: "Thu", time: "Closed" },
        { day: "Fri", time: "Closed" },
        { day: "Sat", time: "Closed" },
        { day: "Sun", time: "Closed" },
      ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

  const todayHours = hours.find((h) => h.day === today);

  const isClosed =
    office?.status === "inactive" || todayHours?.time === "Closed";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.mono)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      await createEnquiry({
        ...formData,
        message: "Request Call Back",
      }).unwrap();

      toast.success("Call back request submitted successfully!");

      setFormData({
        name: "",
        mono: "",
        email: "",
        destinations: "-",
      });
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to submit request. Please try again."
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-10 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4">

          {isLoading ? (
            <div className="text-white text-center p-10">
              Loading office...
            </div>
          ) : isError || !office ? (
            <div className="text-white text-center p-10">
              Failed to load office
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">

              {/* Office Info */}
              <div className="bg-white rounded-lg shadow p-6 flex-1">
                <span className="inline-block bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Virtual Sales Office
                </span>

                <h2 className="text-2xl font-bold mt-3 flex items-center">
                  <span>{office.city}</span>

                  <span
                    className={`border-l-2 border-gray-300 pl-2 ml-2 font-semibold text-lg ${isClosed ? "text-red-600" : "text-green-600"
                      }`}
                  >
                    {isClosed ? "CLOSED" : "OPEN"}
                  </span>
                </h2>

                <p className="text-gray-600 mt-2">{office.address}</p>

                <div className="mt-5 space-y-3 text-gray-800">

                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span className="font-medium">{office.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <span className="font-medium">
                      travel@heavenHoliday.com
                    </span>
                  </div>

                  {/* ✅ NEW MAP ROW */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={office.mapUrl || "#"}
                      target="_blank"
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                    >
                      <MapPin size={18} />
                      <span className="font-medium">
                        {office.city}, India
                      </span>
                    </Link>
                  </div>

                </div>

                {/* Working Hours */}
                <div ref={dropdownRef} className="relative inline-block mt-6">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1 font-medium"
                  >
                    Working Hours: {today} {todayHours?.time}
                    <ChevronDown size={16} />
                  </button>

                  {open && (
                    <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg p-3 z-20">
                      {hours.map((h) => (
                        <div
                          key={h.day}
                          className={`flex justify-between py-1 text-sm ${h.day === today ? "font-bold" : "text-gray-700"
                            }`}
                        >
                          <span>{h.day}</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="bg-gray-100 shadow rounded-lg p-6 w-full md:w-1/3">
                <h3 className="font-semibold text-base mb-4">
                  Want us to call you?
                </h3>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Full Name*"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-xl p-3 text-sm mb-3"
                  />

                  <input
                    type="tel"
                    placeholder="Mobile Number*"
                    name="mono"
                    value={formData.mono}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-xl p-3 text-sm mb-3"
                  />

                  <input
                    type="email"
                    placeholder="Email Address*"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-xl p-3 text-sm mb-4"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-red-700 py-3 rounded"
                  >
                    {isSubmitting ? "Submitting..." : "Request Call Back"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <DekhoApnaDesh />
      <HolidayDestinations />
      <TourReview />
      <ContactForm />
    </>
  );
};

export default OfficeDetails;

