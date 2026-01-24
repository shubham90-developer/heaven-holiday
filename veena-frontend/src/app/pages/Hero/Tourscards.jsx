"use  client";

import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const tours = [
  {
    id: 1,
    title: "Kashmir Escape",
    price: "₹30,000",
    days: "5 Days | 9 Dept.",
    image: "/assets/img/tours/1.avif",
    url: "tour-details",
  },
  {
    id: 2,
    title: "Rajasthan Mewad",
    price: "₹45,000",
    days: "8 Days | 25 Dept.",
    image: "/assets/img/tours/2.avif",
    url: "tour-details",
  },
  {
    id: 3,
    title: "Dalhousie Dharamshala",
    price: "₹50,000",
    days: "8 Days | 18 Dept.",
    image: "/assets/img/tours/3.avif",
    url: "tour-details",
  },
  {
    id: 4,
    title: "Varanasi Ayodhya Lucknow",
    price: "₹60,000",
    days: "8 Days | 17 Dept.",
    image: "/assets/img/tours/4.avif",
    url: "tour-details",
  },
  {
    id: 5,
    title: "Best of Bhutan",
    price: "₹91,000",
    days: "9 Days | 22 Dept.",
    image: "/assets/img/tours/5.avif",
    url: "tour-details",
  },
  {
    id: 6,
    title: "Bangkok Pattaya Phuket Krabi",
    price: "₹1,15,000",
    days: "8 Days | 13 Dept.",
    image: "/assets/img/tours/6.webp",
    url: "tour-details",
  },
  {
    id: 7,
    title: "Best of Vietnam",
    price: "₹1,39,000",
    days: "8 Days | 19 Dept.",
    image: "/assets/img/tours/7.avif",
    url: "tour-details",
  },
];

const Tourscards = () => {
  return (
    <section className="py-5 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {tours.map((tour) => (
            <Link
              href={tour.url}
              target="_blank"
              key={tour.id}
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
                    {tour.price}
                  </span>

                  {/* Days */}
                  <span className="absolute bottom-1 left-1 font-bold text-white text-xs px-2 py-1 rounded">
                    {tour.days}
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
