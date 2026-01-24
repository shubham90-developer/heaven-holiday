"use client";
import React from "react";
import { useGetAllServicesQuery } from "store/aboutUsApi/servicesApi";
const features = [
  {
    id: 1,
    title: "Accommodation",
    text: "Comfortable & convenient hotels cherry picked by our hotel management team",
    icon: "/assets/img/tour-inclusive/1.svg",
  },
  {
    id: 2,
    title: "All meals",
    text: "Eat to your heart's content Breakfast. Lunch. Dinner.",
    icon: "/assets/img/tour-inclusive/2.svg",
  },
  {
    id: 3,
    title: "On-tour transport",
    text: "Our itineraries include all rail, sea and road transport as part of the itinerary so you can enjoy tension free",
    icon: "/assets/img/tour-inclusive/3.svg",
  },
  {
    id: 4,
    title: "Tour managers",
    text: "We have an exclusive team of 350 tour managers specialising in India and World tours",
    icon: "/assets/img/tour-inclusive/4.svg",
  },
  {
    id: 5,
    title: "Best value itinerary",
    text: "Our dedicated product & destination research team spends hours curating the best value for money itineraries",
    icon: "/assets/img/tour-inclusive/5.svg",
  },
  {
    id: 6,
    title: "To and fro airfare",
    text: "Heaven Holiday tours are inclusive of airfare from many hubs within India unless you pick the joining-leaving option",
    icon: "/assets/img/tour-inclusive/6.svg",
  },
];

const AllInclusive = () => {
  const { data, isLoading, error } = useGetAllServicesQuery();
  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  const services = data?.data[0]?.items || [];
  const activeServices = services.filter((item) => {
    return item.status == "active";
  });
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-2xl font-bold mb-3">
          All inclusive tours,{" "}
          <span className="text-gray-800">Chalo Bag Bharo Nikal Pado!</span>
        </h2>

        {/* Underline Image */}
        <div className="flex justify-center mb-12">
          <img
            src="/assets/img/header-bottom.svg" // 👉 replace with your underline image path
            alt="underline"
            className="w-40 md:w-50"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {activeServices.map((item) => (
            <div key={item._id} className="flex items-start gap-4 text-left">
              {/* Icon */}
              <div className="flex-shrink-0">
                <img
                  src={item.icon}
                  alt={item.iconTitle}
                  className="w-14 h-14 rounded-full bg-gray-100 p-2"
                />
              </div>
              {/* Text */}
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.iconTitle}</h3>
                <p
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: item.iconDescription }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllInclusive;
