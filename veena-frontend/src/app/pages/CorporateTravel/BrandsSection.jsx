"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useGetBrandsQuery } from "../../../../store/corporateBrands/corporateBrandsApi";

const BrandsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetBrandsQuery();

  if (isLoading || !data?.data?.length) return null;

  const section = data.data[0];
  const { heading, brands = [], industries = [] } = section;

  return (
    <>
      <section className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            {heading}
          </h2>

          <div className="flex flex-col items-center text-gray-600 mt-2">
            <p className="italic">Industries</p>

            <div className="overflow-hidden w-full">
              <div className="flex animate-marquee whitespace-nowrap">
                {brands.map((b, i) => (
                  <span
                    key={i}
                    className="not-italic text-blue-900 font-semibold mx-8 text-lg"
                  >
                    {b.industry}
                  </span>
                ))}
                {brands.map((b, i) => (
                  <span
                    key={`dup-${i}`}
                    className="not-italic text-blue-900 font-semibold mx-8 text-lg"
                  >
                    {b.industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
              }}
            >
              {industries.map((ind, i) => (
                <SwiperSlide key={i}>
                  <div className="flex items-center justify-center">
                    <Image
                      src={ind.image}
                      alt="Brand Logo"
                      width={150}
                      height={80}
                      className="object-contain opacity-90"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-3 rounded-md"
            >
              View All Brands
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-5xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-2xl"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold text-center mb-6">
              All Corporate Brands
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {industries.map((ind, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center border rounded-lg p-4"
                >
                  <Image
                    src={ind.image}
                    alt="Brand"
                    width={120}
                    height={70}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandsSection;
