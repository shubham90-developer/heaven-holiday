"use client";

import React, { useState } from "react";
import Link from "next/link";

const TABS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

const INDIA_DATA = {
  Africa: [
    {
      region: "Delhi & NCR",
      cities: [
        "Delhi",
        "Gurgaon",
        "Noida",
        "Faridabad",
        "Ghaziabad",
        "Meerut",
        "Greater Noida",
      ],
    },
    {
      region: "Uttarakhand",
      cities: [
        "Dehradun",
        "Mussoorie",
        "Nainital",
        "Rishikesh",
        "Haridwar",
        "Pithoragarh",
      ],
    },
    {
      region: "Himachal Pradesh",
      cities: ["Shimla", "Manali", "Kasauli", "Mandi", "Chamba", "Kullu"],
    },
    {
      region: "Rajasthan",
      cities: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Ajmer"],
    },
  ],
  Asia: [
    { region: "Kerala", cities: ["Kochi", "Alleppey", "Munnar", "Kovalam"] },
    {
      region: "Tamil Nadu",
      cities: ["Chennai", "Madurai", "Ooty", "Kodaikanal"],
    },
  ],
  Europe: [
    { region: "West Bengal", cities: ["Kolkata", "Darjeeling", "Siliguri"] },
    { region: "Assam", cities: ["Guwahati", "Kaziranga", "Majuli"] },
  ],
  "North America": [
    {
      region: "Rajasthan",
      cities: ["Jaipur", "Udaipur", "Jodhpur", "Pushkar"],
    },
    { region: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Khajuraho"] },
  ],
  Oceania: [
    {
      region: "New Zealand",
      cities: ["Auckland", "Wellington", "Christchurch"],
    },
    { region: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"] },
  ],
  "South America": [
    { region: "Brazil", cities: ["Rio de Janeiro", "Sao Paulo", "Salvador"] },
    { region: "Argentina", cities: ["Buenos Aires", "Cordoba", "Mendoza"] },
  ],
};

export default function WorldMenu() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <div className="left-0 w-full lg:w-[850px] bg-white text-black shadow-lg border-t border-gray-200 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 py-0">
        {/* Desktop Menu */}
        <div className="hidden lg:grid grid-cols-5 text-xs md:text-sm leading-6">
          <nav className="col-span-1 border-r border-gray-200" role="tablist">
            <ul className="space-y-1">
              {TABS.map((tab) => {
                const active = tab === activeTab;
                return (
                  <li key={tab}>
                    <button
                      onMouseEnter={() => setActiveTab(tab)}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left px-4 py-2 flex items-center justify-between text-xs cursor-pointer transition-all ${
                        active
                          ? "bg-gray-200 text-blue-900 font-semibold"
                          : "text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                      }`}
                    >
                      <span>{tab}</span>
                      <span className="text-gray-400">›</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="col-span-4 p-4 bg-gray-100 max-h-[420px] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {INDIA_DATA[activeTab].map((group) => (
                <div key={group.region}>
                  <h4 className="text-xs font-semibold text-gray-600  border-b border-gray-400  pb-2 mb-2">
                    {group.region}
                  </h4>
                  {/* <div className="w-12 h-[1px] bg-gray-300 my-2" /> */}
                  <ul className="flex flex-col gap-1 text-[11px] md:text-xs font-medium">
                    {group.cities.map((city) => (
                      <li key={city}>
                        <Link
                          href={`/tour-list?city=${encodeURIComponent(city)}`}
                          className="hover:text-red-600 hover:font-semibold transition"
                        >
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="block lg:hidden">
          <div className="divide-y divide-gray-200 overflow-hidden">
            {TABS.map((tab) => {
              const isOpen = openAccordion === tab;
              return (
                <div key={tab} className="py-1">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : tab)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    <span
                      className={isOpen ? "text-blue-700 font-semibold" : ""}
                    >
                      {tab}
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        isOpen
                          ? "rotate-90 text-blue-600"
                          : "rotate-0 text-gray-400"
                      }`}
                    >
                      ›
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2 px-4 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {INDIA_DATA[tab].map((group) => (
                        <div key={group.region}>
                          <h4 className="text-xs font-semibold text-gray-800">
                            {group.region}
                          </h4>
                          <div className="w-10 h-[1px] bg-gray-300 my-1" />
                          <ul className="flex flex-col gap-1 text-xs">
                            {group.cities.map((city) => (
                              <li key={city}>
                                <Link
                                  href={`/tour-list?city=${encodeURIComponent(
                                    city
                                  )}`}
                                  className="hover:text-blue-900"
                                >
                                  {city}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
