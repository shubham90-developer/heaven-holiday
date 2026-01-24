"use client";
import React from "react";
import { useGetPreambleQuery } from "../../../../store/csrPolicy/preamble";

const Preamble = () => {
  const { data, isLoading, error } = useGetPreambleQuery();

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600">
            Failed to load team members. Please try again later.
          </p>
        </div>
      </section>
    );
  }
  const responce = data.data;
  const table = responce?.tableRows || [];
  const filteredTable = table.filter((item) => {
    return item.status == "Active";
  });

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-2xl text-center font-bold mb-3">
          {responce?.heading || ""}
        </h2>

        {/* Underline Image */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/img/header-bottom.svg" // 👉 replace with your underline image path
            alt="underline"
            className="w-40 md:w-50"
          />
        </div>
        {/* Paragraph */}
        <p
          className="text-gray-700 text-sm md:text-base leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: responce?.paragraph || "" }}
        ></p>

        {/* Subtitle */}
        <p className="text-gray-600 mb-4">{responce?.subtitle || ""}</p>

        {/* Table */}
        <div className="overflow-x-auto max-w-4xl mx-auto rounded-lg shadow">
          <table className="w-full border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white text-left">
                <th className="py-3 px-4 text-sm font-medium border border-gray-300">
                  Title
                </th>
                <th className="py-3 px-4 text-sm font-medium border border-gray-300">
                  Particulars
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredTable.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="py-2 px-4 font-medium border border-gray-300">
                      {item.title}
                    </td>
                    <td
                      className="py-2 px-4 border border-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: item.particulars || "",
                      }}
                    ></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Preamble;
