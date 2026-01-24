"use client";
import React from "react";
import Image from "next/image";
import { useGetTourManagerQuery } from "../../../../store/toursManagement/tourManagerHeader";

const TourManager = () => {
  const { data, isLoading, error } = useGetTourManagerQuery();

  console.log(data);
  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600">
            Failed to load team members. Please try again later.
          </p>
        </div>
      </section>
    );
  }
  const responce = data?.data;

  return (
    <section className="pt-10 pb-0 text-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {responce?.title || ""}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          {responce?.subtitle || ""}
        </p>

        {/* Description */}
        <p
          className="text-gray-600 text-sm md:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: responce?.description || "" }}
        ></p>
      </div>

      {/* Bottom Illustration */}
      <div className="mt-12 w-full">
        <Image
          src="/assets/img/tour-manager/1.svg"
          alt="Tour Managers Illustration"
          width={1600}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default TourManager;
