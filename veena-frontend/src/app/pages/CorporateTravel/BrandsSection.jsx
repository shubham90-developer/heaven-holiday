// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// const brands = [
//   "/assets/img/corporate-travel/1.svg",
//   "/assets/img/corporate-travel/2.svg",
//   "/assets/img/corporate-travel/3.svg",
//   "/assets/img/corporate-travel/4.svg",
//   "/assets/img/corporate-travel/5.svg",
//   "/assets/img/corporate-travel/6.svg",
//   "/assets/img/corporate-travel/7.svg",
// ];

// const BrandsSection = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       {/* ===== Heading ===== */}
//       <section className="py-12 bg-white text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
//             Veena World has proudly served 350+ corporates to date...
//           </h2>
//           <div className="flex flex-col items-center text-gray-600 mt-2">
//             <p className="italic">Industries</p>
//             <div className="overflow-hidden w-full">
//               <div className="flex animate-marquee whitespace-nowrap">
//                 {[
//                   "Agriculture",
//                   "Finance",
//                   "Technology",
//                   "Healthcare",
//                   "Education",
//                   "Hospitality",
//                   "Manufacturing",
//                   "Retail",
//                   "Real Estate",
//                   "Automobile",
//                 ].map((industry, i) => (
//                   <span
//                     key={i}
//                     className="not-italic text-blue-900 font-semibold mx-8 text-lg"
//                   >
//                     {industry}
//                   </span>
//                 ))}
//                 {/* Duplicate for seamless looping */}
//                 {[
//                   "Agriculture",
//                   "Finance",
//                   "Technology",
//                   "Healthcare",
//                   "Education",
//                   "Hospitality",
//                   "Manufacturing",
//                   "Retail",
//                   "Real Estate",
//                   "Automobile",
//                 ].map((industry, i) => (
//                   <span
//                     key={`dup-${i}`}
//                     className="not-italic text-blue-900 font-semibold mx-8 text-lg"
//                   >
//                     {industry}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ===== Logo Slider ===== */}
//           <div className="mt-8">
//             <Swiper
//               modules={[Autoplay]}
//               autoplay={{ delay: 2500, disableOnInteraction: false }}
//               loop
//               slidesPerView={2}
//               spaceBetween={20}
//               breakpoints={{
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 5 },
//                 1024: { slidesPerView: 6 },
//               }}
//               className="mySwiper"
//             >
//               {brands.slice(0, 7).map((logo, i) => (
//                 <SwiperSlide key={i}>
//                   <div className="flex items-center justify-center">
//                     <Image
//                       src={logo}
//                       alt={`Brand ${i + 1}`}
//                       width={150}
//                       height={80}
//                       className="object-contain opacity-90 hover:opacity-100 transition-all"
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* ===== View All Button ===== */}
//           <div className="mt-8">
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-3 rounded-md transition-all"
//             >
//               View All Brands
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ===== Modal ===== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//               All Corporate Brands
//             </h3>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {brands.map((logo, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-center border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all"
//                 >
//                   <Image
//                     src={logo}
//                     alt={`Brand ${i + 1}`}
//                     width={120}
//                     height={70}
//                     className="object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BrandsSection;

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
