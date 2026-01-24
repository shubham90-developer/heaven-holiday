"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useCreateEnquiryMutation } from "store/enquiryApi/enquiryApi";
import { useGetContactDetailsQuery } from "store/aboutUsApi/contactApi";
const slides = [
  { id: 1, img: "/assets/img/discover-world/1.avif" },
  { id: 2, img: "/assets/img/discover-world/2.avif" },
  { id: 3, img: "/assets/img/discover-world/3.avif" },
  { id: 4, img: "/assets/img/discover-world/4.avif" },
  { id: 5, img: "/assets/img/discover-world/5.avif" },
];

const DiscoverWorldSlide = () => {
  const {
    data: contactDetails,
    isLoading: contactDetailsLoading,
    error: contactDetailsError,
  } = useGetContactDetailsQuery();
  if (contactDetailsLoading) {
    return <p>loading</p>;
  }
  if (contactDetailsError) {
    return <p>error</p>;
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={800}
            className="rounded-lg"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative rounded-xl overflow-hidden px-4">
                  <img
                    src={slide.img}
                    alt={`Discover ${slide.id}`}
                    className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Buttons */}
          <button className="custom-prev absolute top-1/2 -left-3 sm:-left-6 -translate-y-1/2 bg-white border p-2 sm:p-3 rounded-full shadow hover:bg-gray-100 text-xs sm:text-base">
            ❮
          </button>
          <button className="custom-next absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 bg-white border p-2 sm:p-3 rounded-full shadow hover:bg-gray-100 text-xs sm:text-base">
            ❯
          </button>
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Discover the World,{" "}
            <span className="text-gray-800">specially curated for you!</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
            Our exclusive customized holidays division can cater to every travel
            need: hotel, air tickets, VISA, sightseeing, transfer or the entire
            package, all designed keeping in mind your interests!
          </p>

          <p className="text-black font-semibold mb-4 text-sm sm:text-base">
            Tell us what you want and we will design it for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="/enquiry-now"
              className="bg-red-700 hover:bg-red-500 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded shadow text-sm sm:text-base"
            >
              Enquire Now
            </Link>
            <span className="text-gray-600 text-sm sm:text-base">or</span>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm sm:text-base">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <Link
                href={`tel:${contactDetails?.data?.callUs?.phoneNumbers[0] || ""}`}
              >
                {contactDetails?.data?.callUs?.phoneNumbers[0] || ""} /{" "}
                {contactDetails?.data?.callUs?.phoneNumbers[1] || ""}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverWorldSlide;
