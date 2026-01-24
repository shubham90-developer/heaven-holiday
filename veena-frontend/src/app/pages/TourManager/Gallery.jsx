"use client";
import React from "react";
import Image from "next/image";
import { useGetGalleryQuery } from "../../../../store/galleryApi/galleryApi";

const Gallery = () => {
  const { data, isLoading, error } = useGetGalleryQuery();

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600">
            Failed to load gallery. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const responce = data?.data;

  const allImages = responce?.images || [];

  const images = allImages.filter((image) => image.status === "active");

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl text-gray-700">
          {responce?.title || ""}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {responce?.subtitle || ""}
        </h3>

        {/* Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {images.map((image, index) => (
              <div
                key={image._id}
                className={`overflow-hidden rounded-lg ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No images available.</p>
        )}
      </div>
    </section>
  );
};

export default Gallery;
