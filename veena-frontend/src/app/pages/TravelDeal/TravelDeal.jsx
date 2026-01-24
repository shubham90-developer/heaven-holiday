"use client";
import Breadcrumb from "@/app/components/Breadcum";
import React from "react";
import { useGetTravelDealBannerQuery } from "../../../../store/travelDealApi/banner";
const TravelDeal = () => {
  const { data, isLoading, error } = useGetTravelDealBannerQuery();
  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Special offers", href: "/travel-deals" },
        ]}
      />

      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${data?.data?.image || ""})`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-white">
            <p className="text-5xl font-bold">Special offers</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TravelDeal;
