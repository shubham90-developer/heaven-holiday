"use client";
import React from "react";
import Image from "next/image";
import { useGetGalleryQuery } from "../../../../store/galleryApi/galleryApi";

const LifeAtVeenaWorld = () => {
  const { data, isLoading, error } = useGetGalleryQuery();

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
  const icons = responce?.images || [];
  const filteredIcons = icons.filter((icon) => {
    return icon.status == "active";
  });

  return (
    <section className="py-10 text-center bg-gray-100">
      {/* Heading */}
      <h3 className="text-gray-500 text-sm">{responce?.title || ""}</h3>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {responce?.subtitle || ""}
      </h2>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {filteredIcons.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Image
              src={item.url}
              alt={`Life at Heaven Holiday ${item._id + 1}`}
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeAtVeenaWorld;
