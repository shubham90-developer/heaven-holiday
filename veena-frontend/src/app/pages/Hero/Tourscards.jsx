"use client";

import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetCategoriesQuery } from "store/toursManagement/toursPackagesApi";

const Tourscards = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  if (categoriesLoading) {
    return <p>loading</p>;
  }
  if (categoriesError) {
    return <p>error</p>;
  }
  const categoriesCard = categories?.data || [];
  const activeCategories = categoriesCard.filter((item) => {
    return item.status == "Active";
  });
  console.log("active", activeCategories);
  return (
    <section className="py-5 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {activeCategories.map((tour) => (
            <Link
              href={`tour-list/${tour._id}`}
              target="_blank"
              key={tour._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div>
                {/* Image */}
                <div className="relative">
                  {/* Image */}
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    width={600}
                    height={600}
                    className="w-full h-30 object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

                  {/* Price */}
                  <span className="absolute bottom-7 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                    {tour.badge}
                  </span>

                  {/* Days */}
                  <span className="absolute bottom-1 left-1 font-bold text-white text-xs px-2 py-1 rounded">
                    {tour.categoryType} | {tour.guests} Travelled
                  </span>
                </div>

                {/* Content */}
                <div className="p-2">
                  <h3 className="text-gray-800 text-xs font-semibold">
                    {tour.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <CustomBtn href="/tour-list">More Diwali Tours</CustomBtn>
        </div>
      </div>
    </section>
  );
};

export default Tourscards;
