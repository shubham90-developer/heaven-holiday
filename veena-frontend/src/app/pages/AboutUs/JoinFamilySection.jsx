"use client";
import Link from "next/link";
import React from "react";
import { useGetContentQuery } from "../../../../store/aboutUsApi/joinUsApi";

const JoinFamilySection = () => {
  const { data, isLoading, error } = useGetContentQuery();

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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            {responce?.title || ""}
          </h2>
        </div>

        {/* Right Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {responce?.subtile || ""}
          </h3>
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <li
              dangerouslySetInnerHTML={{ __html: responce?.description || "" }}
            />
          </ul>

          {/* CTA Button */}
          <Link
            href={responce?.button.link || "#"}
            className="inline-block mt-6 bg-red-700 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-md transition"
          >
            {responce?.button.text || ""}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinFamilySection;
