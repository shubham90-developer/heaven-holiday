"use client";
import React, { useState } from "react";
import Breadcrumb from "@/app/components/Breadcum";
import { Grid, List } from "lucide-react";
import Filter from "./Filter";
import TourCardList from "./TourCardList";
import TopBar from "./TopBar";

const TourList = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Search Holiday Package", href: null },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-6 bg-gray-100">
        <div className="max-w-6xl mx-auto ">
          <TopBar />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT FILTERS */}
            <div className="lg:col-span-1">
              <Filter />
            </div>

            {/* RIGHT TOUR LIST/GRID */}
            <div className="lg:col-span-3">
              <TourCardList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourList;
