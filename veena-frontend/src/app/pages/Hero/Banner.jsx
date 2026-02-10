"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetOfferBannerQuery } from "store/offer-banner/offer-bannerApi";

//Banner Loading Skeleton
const BannerSkeleton = () => {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-[300px] sm:h-[400px] bg-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const Banner = () => {
  const { data, isLoading, error } = useGetOfferBannerQuery();
  if (isLoading) {
    return <BannerSkeleton />;
  }
  if (error) {
    return <p className="text-center text-red-500">Failed to load banner</p>;
  }

  return (
    <>
      <section className="py-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/tour-list">
            <Image
              src={data?.data[0]?.banners[0].image || ""}
              alt=""
              width={1000}
              height={600}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Banner;
