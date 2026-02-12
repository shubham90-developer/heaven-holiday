// "use client";
// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import Link from "next/link";
// import { useGetTourPackagesQuery } from "../../../../store/corporate-travel/tourPackages"

// const TravelPackages = () => {

//   const { data, isLoading } = useGetTourPackagesQuery();

//   console.log("RTK Data:", data);
//   // console.log("RTK Error:", error)
//   const query = useGetTourPackagesQuery();

//   console.log("RTK FULL QUERY:", query);

//   const packages = data?.data || [];

//   const indiaPackages = packages.filter(
//     (pkg) => pkg.type === "india"
//   );

//   const internationalPackages = packages.filter(
//     (pkg) => pkg.type === "international"
//   );

//   const renderCards = (packages) =>
//     packages.map((pkg) => (
//       <SwiperSlide key={pkg._id}>
//         <div className="relative rounded-xl overflow-hidden group shadow-md cursor-pointer">

//           <Image
//             src={pkg.galleryImages?.[0] || "/placeholder.jpg"}
//             alt={pkg.name}
//             width={300}
//             height={200}
//             className="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-110"
//           />

//           {/* Gradient overlay */}
//           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

//           {/* Normal Text */}
//           <div className="absolute bottom-2 left-2 text-white transition-opacity duration-300 group-hover:opacity-0 z-10">
//             <h4 className="font-semibold text-lg">{pkg.name}</h4>
//             <p className="text-sm">{pkg.nights}</p>
//             <p className="text-xs">
//               Starts from{" "}
//               <span className="font-bold">₹{pkg.price}</span>
//             </p>
//           </div>

//           {/* Hover Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 flex flex-col justify-center p-4 text-white transition-all duration-300 z-10">
//             <h4 className="font-semibold text-lg mb-2">{pkg.name}</h4>
//             <p className="text-sm mb-3">
//               Explore this amazing destination with our specially crafted
//               holiday package.
//             </p>
//             <Link
//               href={`/package/${pkg._id}`}
//               className="text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
//             >
//               Enquire Now <ChevronRight size={14} />
//             </Link>
//           </div>
//         </div>
//       </SwiperSlide>
//     ));

//   // ✅ Loading State
//   if (isLoading) {
//     return (
//       <section className="py-20 text-center">
//         <p>Loading packages...</p>
//       </section>
//     );
//   }

//   // ✅ Empty State
//   if (!packages.length) {
//     return (
//       <section className="py-20 text-center">
//         <p>No packages available</p>
//       </section>
//     );
//   }
//   // const indiaPackages = [
//   //   {
//   //     name: "Goa",
//   //     nights: "3N",
//   //     price: "₹20,000",
//   //     img: "/assets/img/tours/6.webp",
//   //   },
//   //   {
//   //     name: "Munnar",
//   //     nights: "3N",
//   //     price: "₹23,000",
//   //     img: "/assets/img/tours/1.avif",
//   //   },
//   //   {
//   //     name: "Hyderabad",
//   //     nights: "3N",
//   //     price: "₹19,000",
//   //     img: "/assets/img/tours/2.avif",
//   //   },
//   //   {
//   //     name: "Jaipur",
//   //     nights: "3N",
//   //     price: "₹22,000",
//   //     img: "/assets/img/tours/3.avif",
//   //   },
//   //   {
//   //     name: "Udaipur",
//   //     nights: "3N",
//   //     price: "₹24,000",
//   //     img: "/assets/img/tours/4.avif",
//   //   },
//   //   {
//   //     name: "Delhi Agra",
//   //     nights: "3N",
//   //     price: "₹21,000",
//   //     img: "/assets/img/tours/5.avif",
//   //   },
//   // ];

//   // const internationalPackages = [
//   //   {
//   //     name: "Hong Kong",
//   //     nights: "4N",
//   //     price: "₹50,000",
//   //     img: "/assets/img/tours/6.webp",
//   //   },
//   //   {
//   //     name: "Thailand",
//   //     nights: "4N",
//   //     price: "₹32,000",
//   //     img: "/assets/img/tours/7.avif",
//   //   },
//   //   {
//   //     name: "Malaysia",
//   //     nights: "4N",
//   //     price: "₹32,000",
//   //     img: "/assets/img/tours/5.avif",
//   //   },
//   //   {
//   //     name: "Dubai, UAE",
//   //     nights: "4N",
//   //     price: "₹40,000",
//   //     img: "/assets/img/tours/5.avif",
//   //   },
//   //   {
//   //     name: "Vietnam",
//   //     nights: "4N",
//   //     price: "₹38,000",
//   //     img: "/assets/img/tours/2.avif",
//   //   },
//   //   {
//   //     name: "Indonesia",
//   //     nights: "4N",
//   //     price: "₹34,000",
//   //     img: "/assets/img/tours/1.avif",
//   //   },
//   // ];

//   // const renderCards = (packages) =>
//   //   packages.map((pkg, i) => (
//   //     <SwiperSlide key={i}>
//   //       <div className="relative rounded-xl overflow-hidden group shadow-md cursor-pointer">
//   //         <Image
//   //           src={pkg.img}
//   //           alt={pkg.name}
//   //           width={300}
//   //           height={200}
//   //           className="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-110"
//   //         />

//   //         {/* Gradient overlay at bottom */}
//   //         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

//   //         {/* Normal bottom text */}
//   //         <div className="absolute bottom-2 left-2 text-white transition-opacity duration-300 group-hover:opacity-0 z-10">
//   //           <h4 className="font-semibold text-lg">{pkg.name}</h4>
//   //           <p className="text-sm">{pkg.nights}</p>
//   //           <p className="text-xs">
//   //             Starts from <span className="font-bold">{pkg.price}</span>
//   //           </p>
//   //         </div>

//   //         {/* Hover overlay */}
//   //         <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 flex flex-col justify-center p-4 text-white transition-all duration-300 z-10">
//   //           <h4 className="font-semibold text-lg mb-2">{pkg.name}</h4>
//   //           <p className="text-sm mb-3">
//   //             We at Veena World, handcraft our travel packages with most
//   //             remarkable locations that lie in every corner of the world. All
//   //             you...
//   //           </p>
//   //           <Link
//   //             href={"/enquiry-now"}
//   //             className="text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
//   //           >
//   //             Enquire Now <ChevronRight size={14} />
//   //           </Link>
//   //         </div>
//   //       </div>
//   //     </SwiperSlide>
//   //   ));

//   // return (
//   //   <section className="bg-gray-100 py-10">
//   //     <div className="max-w-6xl mx-auto px-4">
//   //       {/* Header */}
//   //       <div className="text-center mb-8">
//   //         <h2 className="text-lg font-semibold text-gray-800">
//   //           Incentive Corporate Tours for you and your team!
//   //         </h2>
//   //         <p className="text-gray-600 max-w-3xl mx-auto text-sm mt-2">
//   //           After celebrating life with more than 7,18,824 happy tourists, the
//   //           travel experts at Veena World have readymade Incentive Tour packages
//   //           designed for you and your team.
//   //         </p>
//   //       </div>

//   //       {/* Incredible India */}
//   //       <div className="relative mb-10">
//   //         <h3 className="font-bold text-lg mb-4">Incredible India</h3>
//   //         <Swiper
//   //           modules={[Navigation]}
//   //           navigation={{
//   //             nextEl: ".india-next",
//   //             prevEl: ".india-prev",
//   //           }}
//   //           spaceBetween={20}
//   //           slidesPerView={4}
//   //           loop
//   //           breakpoints={{
//   //             320: { slidesPerView: 1.3 },
//   //             640: { slidesPerView: 2.3 },
//   //             1024: { slidesPerView: 4 },
//   //           }}
//   //         >
//   //           {renderCards(indiaPackages)}
//   //         </Swiper>
//   //         <div className="absolute top-0 right-0 flex gap-2 -mt-8">
//   //           <button className="india-prev p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//   //             <ChevronLeft size={18} />
//   //           </button>
//   //           <button className="india-next p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//   //             <ChevronRight size={18} />
//   //           </button>
//   //         </div>
//   //       </div>

//   //       {/* Popular International Holiday Packages */}
//   //       <div className="relative mb-10">
//   //         <h3 className="font-bold text-lg mb-4">
//   //           Popular International Holiday Packages
//   //         </h3>
//   //         <Swiper
//   //           modules={[Navigation]}
//   //           navigation={{
//   //             nextEl: ".intl-next",
//   //             prevEl: ".intl-prev",
//   //           }}
//   //           spaceBetween={20}
//   //           slidesPerView={4}
//   //           loop
//   //           breakpoints={{
//   //             320: { slidesPerView: 1.3 },
//   //             640: { slidesPerView: 2.3 },
//   //             1024: { slidesPerView: 4 },
//   //           }}
//   //         >
//   //           {renderCards(internationalPackages)}
//   //         </Swiper>
//   //         <div className="absolute top-0 right-0 flex gap-2 -mt-8">
//   //           <button className="intl-prev p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//   //             <ChevronLeft size={18} />
//   //           </button>
//   //           <button className="intl-next p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//   //             <ChevronRight size={18} />
//   //           </button>
//   //         </div>
//   //       </div>

//   //       {/* CTA */}
//   //       <div className="text-center mt-10">
//   //         <h3 className="font-semibold text-gray-800">
//   //           Celebrate Life in Incredible India and around the world!
//   //         </h3>
//   //         <p className="text-gray-600 text-sm mt-2 mb-5">
//   //           Drop your contact, and our team will quickly call you with holidays
//   //           ideas!
//   //         </p>
//   //         <Link
//   //           href={"/enquiry-now"}
//   //           className="mt-4 bg-red-600 text-white  font-semibold px-6 py-2 rounded hover:bg-yellow-red"
//   //         >
//   //           Enquire Now
//   //         </Link>
//   //       </div>
//   //     </div>
//   //   </section>
//   // );

//   return (
//     <section className="bg-gray-100 py-10">
//       <div className="max-w-6xl mx-auto px-4">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Incentive Corporate Tours for you and your team!
//           </h2>
//           <p className="text-gray-600 max-w-3xl mx-auto text-sm mt-2">
//             After celebrating life with thousands of happy travelers,
//             explore our readymade Incentive Tour packages designed for
//             your team.
//           </p>
//         </div>

//         {/* Incredible India */}
//         {indiaPackages.length > 0 && (
//           <div className="relative mb-10">
//             <h3 className="font-bold text-lg mb-4">
//               Incredible India
//             </h3>

//             <Swiper
//               modules={[Navigation]}
//               navigation={{
//                 nextEl: ".india-next",
//                 prevEl: ".india-prev",
//               }}
//               spaceBetween={20}
//               slidesPerView={4}
//               loop
//               breakpoints={{
//                 320: { slidesPerView: 1.3 },
//                 640: { slidesPerView: 2.3 },
//                 1024: { slidesPerView: 4 },
//               }}
//             >
//               {renderCards(indiaPackages)}
//             </Swiper>

//             <div className="absolute top-0 right-0 flex gap-2 -mt-8">
//               <button className="india-prev p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <ChevronLeft size={18} />
//               </button>
//               <button className="india-next p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* International Packages */}
//         {internationalPackages.length > 0 && (
//           <div className="relative mb-10">
//             <h3 className="font-bold text-lg mb-4">
//               Popular International Holiday Packages
//             </h3>

//             <Swiper
//               modules={[Navigation]}
//               navigation={{
//                 nextEl: ".intl-next",
//                 prevEl: ".intl-prev",
//               }}
//               spaceBetween={20}
//               slidesPerView={4}
//               loop
//               breakpoints={{
//                 320: { slidesPerView: 1.3 },
//                 640: { slidesPerView: 2.3 },
//                 1024: { slidesPerView: 4 },
//               }}
//             >
//               {renderCards(internationalPackages)}
//             </Swiper>

//             <div className="absolute top-0 right-0 flex gap-2 -mt-8">
//               <button className="intl-prev p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <ChevronLeft size={18} />
//               </button>
//               <button className="intl-next p-2 bg-gray-200 rounded-full hover:bg-gray-300">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* CTA */}
//         <div className="text-center mt-10">
//           <h3 className="font-semibold text-gray-800">
//             Celebrate Life in Incredible India and around the world!
//           </h3>
//           <p className="text-gray-600 text-sm mt-2 mb-5">
//             Drop your contact, and our team will quickly call you with
//             holiday ideas!
//           </p>
//           <Link
//             href={"/enquiry-now"}
//             className="mt-4 bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700"
//           >
//             Enquire Now
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default TravelPackages;

"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

import { useGetTourPackagesQuery } from "../../../../store/corporate-travel/tourPackages"; // ✅ RTK Hook

const TravelPackages = () => {
  const { data, isLoading, isError } = useGetTourPackagesQuery();

  // ✅ SAFE DATA EXTRACTION
  const packages = data?.data || [];

  console.log("PACKAGES:", packages);

  // ✅ LOADING UI
  if (isLoading) {
    return (
      <section className="py-10 text-center">
        <p className="text-gray-500">Loading tour packages...</p>
      </section>
    );
  }

  // ✅ ERROR UI
  if (isError) {
    return (
      <section className="py-10 text-center">
        <p className="text-red-500">Failed to load tour packages</p>
      </section>
    );
  }

  // ✅ RENDER CARDS USING API DATA
  const renderCards = (packages) =>
    packages.map((pkg, i) => (
      <SwiperSlide key={pkg._id || i}>
        <div className="relative rounded-xl overflow-hidden group shadow-md cursor-pointer">
          
          {/* ✅ IMAGE FIX */}
          <Image
            src={pkg.galleryImages?.[0] || "/placeholder.jpg"}
            alt={pkg.title}
            width={300}
            height={200}
            className="object-cover w-full h-52"
            style={{ height: "auto" }} // ✅ Prevent Next warning
          />

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Normal bottom text */}
          <div className="absolute bottom-2 left-2 text-white z-10">
            <h4 className="font-semibold text-lg">{pkg.title}</h4>

            <p className="text-sm">
              {pkg.nights} Nights / {pkg.days} Days
            </p>

            <p className="text-xs">
              Starts from{" "}
              <span className="font-bold">
                ₹{pkg.baseFullPackagePrice}
              </span>
            </p>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 flex flex-col justify-center p-4 text-white transition-all duration-300 z-20">
            <h4 className="font-semibold text-lg mb-2">{pkg.title}</h4>

            <p className="text-sm mb-3 line-clamp-3">
              {pkg.subtitle}
            </p>

            <Link
              href={`/tour/${pkg._id}`}
              className="text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
            >
              Enquire Now <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            Incentive Corporate Tours for you and your team!
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-sm mt-2">
            Celebrate life with our best handcrafted travel packages.
          </p>
        </div>

        {/* ✅ SINGLE SWIPER USING API DATA */}
        <div className="relative mb-10">
          <h3 className="font-bold text-lg mb-4">
            Popular Tour Packages
          </h3>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            spaceBetween={20}
            slidesPerView={4}
            loop={packages.length > 4}   // ✅ FIX Swiper Warning
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {renderCards(packages)}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute top-0 right-0 flex gap-2 -mt-8">
            <button className="prev-btn p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <ChevronLeft size={18} />
            </button>

            <button className="next-btn p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="font-semibold text-gray-800">
            Start your next journey with us ✈️
          </h3>

          <p className="text-gray-600 text-sm mt-2 mb-5">
            Drop your enquiry and our travel experts will call you.
          </p>

          <Link
            href={"/enquiry-now"}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;

