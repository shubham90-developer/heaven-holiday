"use client";
import Link from "next/link";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { useGetAnnualReturnQuery } from "../../../../store/annualReturn/annualReturnApi";

const AnnualReturn = () => {
  const {
    data: AnnualReturn,
    isLoading: AnnualReturnLoading,
    error: AnnualReturnError,
  } = useGetAnnualReturnQuery();

  if (AnnualReturnLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (AnnualReturnError) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600">
            Failed to load data. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const annualReturnData = AnnualReturn?.data;
  const items = annualReturnData?.items || [];

  return (
    <>
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(/assets/img/annual-return/1.avif)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-white">
            <p className="text-5xl font-bold">Annual Return</p>
          </div>
        </div>
      </section>

      {/* table */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              {/* Table Head */}
              <thead>
                <tr className="bg-blue-900 text-white text-left">
                  <th className="px-6 py-3 text-white font-semibold">Title</th>
                  <th className="px-6 py-3 text-white font-semibold">
                    Particulars
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr
                      key={item._id}
                      className={
                        index !== items.length - 1
                          ? "border-b hover:bg-gray-50"
                          : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={item.particulars}
                          className="flex items-center cursor-pointer gap-2 text-red-600 hover:text-red-800"
                          target="_blank"
                        >
                          <FaFilePdf /> View PDF
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No annual returns available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnnualReturn;
