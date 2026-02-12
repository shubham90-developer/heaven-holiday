"use client";

import React, { useState } from "react";;
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Breadcrumb from "@/app/components/Breadcum";
import { FiPhone } from "react-icons/fi";
import Image from "next/image";
import { useCreateContractMutation } from "../../../../store/contact-us/contact"
import toast from "react-hot-toast";

const CorporateTravel = () => {

  const [createContract, { isLoading }] = useCreateContractMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Corporate Travel Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() ||
      !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please enter all the required details");
    }

    // if (!formData.name.trim()) {
    //   toast.error("Full Name is required");
    //   return;
    // }

    // if (!formData.email.trim()) {
    //   toast.error("Email is required");
    //   return;
    // }

    // if (!formData.phone.trim()) {
    //   toast.error("Phone Number is required");
    //   return;
    // }

    // if (!formData.message.trim()) {
    //   toast.error("Please enter your message");
    //   return;
    // }

    try {
      const res = await createContract(formData).unwrap();
      toast.success(res.message || "Request submitted successfully 🎉");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Corporate Travel Inquiry",
        message: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Corporate Travel", href: null },
        ]}
      />

      {/* ====== Full Background Slider Section ====== */}
      <section className="relative w-full h-[600px] md:h-[500px] overflow-hidden">
        {/* Background Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          loop
          className="w-full h-full"
        >
          {[
            "/assets/img/corporate-travel/1.webp",
            "/assets/img/corporate-travel/2.avif",
          ].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`Corporate Slide ${index + 1}`}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== Fixed Form on Top Right ===== */}
        <div className="absolute top-10 right-10 bg-white shadow-2xl rounded-xl p-6 md:p-8 w-[90%] md:w-[380px] z-20">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Request a Call Back
            </h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name*"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email ID*"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="flex items-center gap-1 px-2">
                <span className="text-sm text-gray-700">+91</span>
              </div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              <FiPhone className="text-lg" />
              {isLoading ? "Submitting..." : "Request Call Back"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CorporateTravel;
