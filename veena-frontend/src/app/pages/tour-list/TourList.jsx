"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/app/components/Breadcum";
import { Grid, List } from "lucide-react";
import Filter from "./Filter";
import TourCardList from "./TourCardList";
import TopBar from "./TopBar";
import { useParams } from "next/navigation";
import { useGetCategoriesQuery } from "store/toursManagement/toursPackagesApi";

const TourList = () => {
  const { id: categoryId } = useParams();
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [sortedPackages, setSortedPackages] = useState([]);

  const { data: categories } = useGetCategoriesQuery();
  const category = categories?.data?.find((item) => item._id === categoryId);

  // When filters change, update sorted packages
  useEffect(() => {
    setSortedPackages(filteredPackages);
  }, [filteredPackages]);

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
          <TopBar
            total={sortedPackages.length}
            packages={filteredPackages}
            onSort={setSortedPackages}
          />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT FILTERS */}
            <div className="lg:col-span-1">
              <Filter
                onFilterChange={setFilteredPackages}
                categoryName={category?.name}
              />
            </div>

            {/* RIGHT TOUR LIST/GRID */}
            <div className="lg:col-span-3">
              <TourCardList filteredPackages={sortedPackages} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourList;
