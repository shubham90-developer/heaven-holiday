"use client";
import React, { useState } from "react";
import { useGetFooterInfoQuery } from "../../../store/footer-info/footer-infoApi";

const FooterInfo = () => {
  const [expanded, setExpanded] = useState(false);
  const { data, isLoading, error } = useGetFooterInfoQuery();

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

  const responce = data.data;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-gray-700 leading-relaxed">
        <h2 className="text-xl md:text-xl font-bold">
          {responce?.title || ""}
        </h2>

        <p
          className="whitespace-pre-line text-sm text-black"
          dangerouslySetInnerHTML={{ __html: responce?.description || "" }}
        ></p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-black cursor-pointer font-semibold hover:underline flex items-center gap-1"
        >
          {expanded ? "Read Less ▲" : "Read More ▼"}
        </button>
      </div>
    </section>
  );
};

export default FooterInfo;
