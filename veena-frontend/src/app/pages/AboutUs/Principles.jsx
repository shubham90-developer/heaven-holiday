"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGetAllPrinciplesQuery } from "../../../../store/aboutUsApi/principlesApi";

const Principles = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data, isLoading, error } = useGetAllPrinciplesQuery();

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading principles ...</p>
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

  const principles = responce?.details || [];

  // Filter only active members if needed
  const activeprinciples = principles.filter(
    (principle) => principle.status === "Active",
  );
  return (
    <section className="py-16 bg-[#0b1a27] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            {responce?.title || "10 PRINCIPLES"}
          </h2>
          <p
            className="text-gray-300 mb-6 max-w-md"
            dangerouslySetInnerHTML={{ __html: responce?.description || "" }}
          />

          {/* Custom Navigation */}
          <div className="flex gap-4">
            <button
              ref={prevRef}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black shadow hover:bg-red-700 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black shadow hover:bg-red-700 hover:text-white transition"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Swiper Slider */}
        <div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              320: { slidesPerView: 1 }, // phones
              640: { slidesPerView: 1 }, // small tablets
              768: { slidesPerView: 2 }, // tablets
              1024: { slidesPerView: 2 }, // desktops
              1280: { slidesPerView: 3 }, // xl desktops
            }}
          >
            {activeprinciples.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className={`min-h-[220px] p-6 rounded-2xl shadow-lg flex flex-col bg-purple-400`}
                >
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm md:text-base whitespace-pre-line flex-1"
                    dangerouslySetInnerHTML={{
                      __html: item.principleDescription || "",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Principles;
