import React from "react";
import Image from "next/image";
import Link from "next/link";

const travelPlans = [
  {
    id: 1,
    title: "Dalhousie Dharamshala",
    days: "8 Days",
    price: "₹50,000 /pp twin sharing",
    img: "/assets/img/tour-card/1.avif",
    link: "/tour-details",
  },
  {
    id: 2,
    title: "Hong Kong Macao",
    days: "7 Days",
    price: "₹1,70,000 /pp twin sharing",
    img: "/assets/img/tour-card/2.avif",
    link: "/tour-details",
  },
  {
    id: 3,
    title: "Kashmir Escape",
    days: "5 Days",
    price: "₹30,000 /pp twin sharing",
    img: "/assets/img/tour-card/3.avif",
    link: "/tour-details",
  },
  {
    id: 4,
    title: "Highlights of Gujarat",
    days: "7 Days",
    price: "₹35,000 /pp twin sharing",
    img: "/assets/img/tour-card/4.avif",
    link: "/tour-details",
  },
];

const TravalPlanCards = () => {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 bg-gray-50 py-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6">
          Hey Raj,{" "}
          <span className="font-normal">Continue your travel plan</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelPlans.map((plan) => (
            <Link
              href={plan.link}
              key={plan.id}
              className="bg-white flex gap-3 items-center rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition p-3"
            >
              {/* Left Image */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={plan.img}
                  alt={plan.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">
                  {plan.title}
                </h3>
                <p className="text-xs text-gray-500">{plan.days}</p>
                <p className="text-xs font-bold text-gray-900">
                  {plan.price.slice(0, 20)}...
                </p>

                <p className="inline-block text-black text-sm font-bold hover:underline mt-1">
                  Book Now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravalPlanCards;
