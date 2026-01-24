"use client";
import React from "react";
import Image from "next/image";

const ContactForm = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Planning a trip! Have queries?
          </h2>
          <p className="text-gray-600 mb-6">
            Stay relaxed, our expert Travel Advisors are here and ready to help.
          </p>
          <Image
            src="/assets/img/contact/contact.avif" // replace with your illustration
            alt="Relax illustration"
            width={400}
            height={300}
            className="mx-auto md:mx-0"
          />
        </div>

        {/* Right Section: Form */}
        <div className="bg-white">
          <form className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name*"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />

            {/* Phone Input with Country Code */}
            <div className="flex">
              <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50 text-sm">
                <span className="mr-2">🇮🇳</span>
                +91
              </div>
              <input
                type="text"
                placeholder="Mobile Number*"
                className="flex-1 border border-gray-300 rounded-r-md px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email ID*"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />

            {/* Description */}
            <textarea
              placeholder="Description*"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-red-700 hover:bg-yellow-500 text-black font-medium py-3 rounded-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
