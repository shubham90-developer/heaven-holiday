"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const reviews = [
    {
      text: "We had an amazing experience on the tour! The arrangements were well-organized and the managers provided excellent support.",
      author: "Rajan",
      date: "Jul 2025",
    },
    {
      text: "Fantastic trip! Everything was smooth, and the tour managers were very professional.",
      author: "Sneha",
      date: "Aug 2025",
    },
    {
      text: "It was a memorable journey. Great planning and execution by the team!",
      author: "Amit",
      date: "Jun 2025",
    },
  ];

  // Refs for custom navigation
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg max-w-xs">
      <div className="flex justify-between border-b border-gray-300 px-2">
        <div className="flex items-center text-xs text-black mb-2 gap-x-2">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-600" />
            <span className="font-bold">5</span>
          </div>
          <p>856+ Guests already travelled</p>
        </div>

        {/* Custom Arrows */}
        <div className="flex justify-end gap-2 p-2">
          <button
            ref={prevRef}
            className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            ref={nextRef}
            className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <p className="text-sm text-gray-600">{review.text}</p>
              <p className="mt-2 text-xs text-black">
                - {review.author}, {review.date}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
