// "use client";
// import React, { useEffect, useState } from "react";
// import { Mic, Search, X } from "lucide-react";
// import Image from "next/image";

// const SearchBar = ({ mobile = false }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("month");
//   const [selectedYear, setSelectedYear] = useState(2025);
//   const [filters, setFilters] = useState([]);

//   const bestSeasons = [
//     "Europe",
//     "Seniors' Special",
//     "Phuket",
//     "Women's Special",
//     "New Zealand",
//     "Dubai",
//   ];

//   const hotDestinations = [
//     {
//       name: "Europe",
//       tours: 127,
//       departures: 115,
//       img: "/assets/img/search/1.avif",
//     },
//     {
//       name: "South East Asia",
//       tours: 95,
//       departures: 217,
//       img: "/assets/img/search/2.avif",
//     },
//     {
//       name: "America",
//       tours: 36,
//       departures: 45,
//       img: "/assets/img/search/3.avif",
//     },
//     {
//       name: "Australia New Zealand",
//       tours: 55,
//       departures: 33,
//       img: "/assets/img/search/4.webp",
//     },
//     {
//       name: "Africa",
//       tours: 20,
//       departures: 15,
//       img: "/assets/img/search/5.avif",
//     },
//     {
//       name: "Japan China Korea",
//       tours: 18,
//       departures: 12,
//       img: "/assets/img/search/6.webp",
//     },
//   ];

//   const months = [
//     { label: "Jan", tours: 0 },
//     { label: "Feb", tours: 0 },
//     { label: "Mar", tours: 0 },
//     { label: "Apr", tours: 0 },
//     { label: "May", tours: 0 },
//     { label: "Jun", tours: 0 },
//     { label: "Jul", tours: 0 },
//     { label: "Aug", tours: 0 },
//     { label: "Sep", tours: 54 },
//     { label: "Oct", tours: 443 },
//     { label: "Nov", tours: 422 },
//     { label: "Dec", tours: 329 },
//   ];

//   const priceRanges = [
//     "Below ₹35,000",
//     "₹35,000 - ₹50,000",
//     "₹50,000 - 1L",
//     "₹1L - ₹2L",
//     "₹2L - ₹3L",
//     "₹3L & above",
//   ];

//   const toggleFilter = (value) => {
//     setFilters((prev) =>
//       prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
//     );
//   };

//   const placeholders = [
//     'Search "Gulmarg"',
//     'Search "Europe Tours"',
//     'Search "Dubai"',
//     'Search "Phuket"',
//     'Search "New Zealand"',
//   ];

//   const [index, setIndex] = useState(0);
//   const [displayText, setDisplayText] = useState(placeholders[0]);

//   // Smooth placeholder rotation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % placeholders.length);
//     }, 3000); // change every 3 sec
//     return () => clearInterval(interval);
//   }, []);

//   // Animate placeholder transition
//   useEffect(() => {
//     setDisplayText(placeholders[index]);
//   }, [index]);

//   return (
//     <>
//       {/* SearchBar (desktop only) */}
//       <div
//         className={`
//         ${mobile ? "flex w-full" : "hidden md:flex flex-1 justify-center px-6"}
//       `}
//       >
//         <div
//           className="flex items-center w-full max-w-md bg-white/10 border border-gray-300 text-white rounded-full px-4 py-1.5 shadow-sm cursor-pointer"
//           onClick={() => setIsOpen?.(true)}
//         >
//           <Search className="text-gray-400 w-3 h-3" />
//           <input
//             type="search"
//             placeholder={displayText}
//             className="flex-1 px-2 text-xs text-white placeholder-gray-300 focus:outline-none cursor-pointer transition-all duration-500"
//             readOnly
//           />
//           <button className="text-blue-500 bg-gray-300 rounded-full p-2 cursor-pointer">
//             <Mic className="w-3 h-3" />
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-6xl bg-white text-black rounded-xl shadow-lg flex flex-col max-h-[95vh]">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b gap-3">
//               <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
//                 <Search className="text-gray-400 w-5 h-5" />
//                 <input
//                   type="search"
//                   placeholder="Search tours, destinations..."
//                   className="flex-1 px-2 text-sm text-gray-800 focus:outline-none bg-transparent"
//                 />
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="bg-gray-200 p-2 rounded-full cursor-pointer"
//               >
//                 <X className="w-5 h-5 text-gray-500 hover:text-black" />
//               </button>
//             </div>

//             {/* Filters pills */}
//             {filters.length > 0 && (
//               <div className="flex flex-wrap gap-2 p-4 border-b">
//                 {filters.map((f) => (
//                   <span
//                     key={f}
//                     className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
//                   >
//                     {f}
//                     <X
//                       className="w-3 h-3 cursor-pointer"
//                       onClick={() => toggleFilter(f)}
//                     />
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Scrollable content */}
//             <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* LEFT */}
//               <div className="space-y-6 bg-yellow-50 p-4 rounded-lg">
//                 <div>
//                   <h3 className="font-bold text-sm border-b pb-2 mb-4">
//                     BEST SEASON TOURS
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {bestSeasons.map((item) => (
//                       <button
//                         key={item}
//                         onClick={() => toggleFilter(item)}
//                         className={`px-4 py-1 rounded-full border text-xs ${
//                           filters.includes(item)
//                             ? "bg-blue-900 text-white"
//                             : "hover:bg-blue-100"
//                         }`}
//                       >
//                         {item}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-bold text-sm border-b pb-2 mb-4">
//                     HOT SELLING DESTINATIONS
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {hotDestinations.map((d) => (
//                       <div
//                         key={d.name}
//                         className="flex items-center gap-3 p-2 border rounded-lg hover:shadow cursor-pointer"
//                         onClick={() => toggleFilter(d.name)}
//                       >
//                         <Image
//                           src={d.img}
//                           alt={d.name}
//                           width={70}
//                           height={50}
//                           className="rounded-md object-cover"
//                         />
//                         <div>
//                           <p className="font-semibold">{d.name}</p>
//                           <p className="text-xs text-gray-500">
//                             {d.tours} tours • {d.departures} departures
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT */}
//               <div className="space-y-6">
//                 {/* Months / Occasions */}
//                 <div>
//                   <h3 className="font-bold text-sm border-b pb-2 mb-4">
//                     When do you wish to travel?
//                   </h3>
//                   <div className="flex gap-2 mb-3">
//                     {["month", "occasion"].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-4 py-1 rounded-full text-xs ${
//                           activeTab === tab
//                             ? "bg-blue-900 text-white"
//                             : "border hover:bg-gray-100"
//                         }`}
//                       >
//                         {tab[0].toUpperCase() + tab.slice(1)}
//                       </button>
//                     ))}
//                   </div>

//                   <div className="flex gap-4 mb-3">
//                     {[2025, 2026].map((year) => (
//                       <button
//                         key={year}
//                         onClick={() => setSelectedYear(year)}
//                         className={`px-3 py-1 rounded-md text-sm ${
//                           selectedYear === year
//                             ? "bg-blue-900 text-white"
//                             : "bg-gray-100 hover:bg-gray-200"
//                         }`}
//                       >
//                         {year}
//                       </button>
//                     ))}
//                   </div>

//                   {activeTab === "month" ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                       {months.map((m) => (
//                         <button
//                           key={m.label}
//                           disabled={m.tours === 0}
//                           onClick={() =>
//                             toggleFilter(`${m.label} ${selectedYear}`)
//                           }
//                           className={`px-3 py-2 rounded-lg border text-xs text-center ${
//                             m.tours === 0
//                               ? "text-gray-400 bg-gray-50 cursor-not-allowed"
//                               : filters.includes(`${m.label} ${selectedYear}`)
//                               ? "bg-blue-900 text-white"
//                               : "hover:bg-blue-100"
//                           }`}
//                         >
//                           {m.label}
//                           <br />
//                           {m.tours} tour{m.tours > 1 ? "s" : ""}
//                         </button>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap gap-2">
//                       {[
//                         "Honeymoon",
//                         "Family Trip",
//                         "Adventure",
//                         "Solo Trip",
//                       ].map((o) => (
//                         <button
//                           key={o}
//                           onClick={() => toggleFilter(o)}
//                           className={`px-4 py-1 rounded-full border text-xs ${
//                             filters.includes(o)
//                               ? "bg-blue-900 text-white"
//                               : "hover:bg-blue-100"
//                           }`}
//                         >
//                           {o}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Price Ranges */}
//                 <div>
//                   <h3 className="font-bold text-sm border-b pb-2 mb-4">
//                     Popular Range
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {priceRanges.map((range) => (
//                       <button
//                         key={range}
//                         onClick={() => toggleFilter(range)}
//                         className={`px-4 py-1 rounded-full border text-xs ${
//                           filters.includes(range)
//                             ? "bg-blue-900 text-white"
//                             : "hover:bg-blue-100"
//                         }`}
//                       >
//                         {range}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;

"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Mic, Search, X } from "lucide-react";
import Image from "next/image";

// 1. Mock Master Data (In a real app, this comes from an API)
const TOUR_DATA = [
  { id: 1, name: "Swiss Alps Magic", region: "Europe", price: 250000, month: "Sep 2025", tags: ["Europe"] },
  { id: 2, name: "Paris Getaway", region: "Europe", price: 150000, month: "Oct 2025", tags: ["Europe", "Seniors' Special"] },
  { id: 3, name: "Thai Island Hopper", region: "South East Asia", price: 45000, month: "Nov 2025", tags: ["Phuket"] },
  { id: 4, name: "Dubai Luxury", region: "Africa", price: 120000, month: "Dec 2025", tags: ["Dubai"] },
  // ... add more mock items to test
];

const SearchBar = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("month");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [filters, setFilters] = useState([]);

  // Filter definitions
  const bestSeasons = ["Europe", "Seniors' Special", "Phuket", "Women's Special", "New Zealand", "Dubai"];
  const priceRanges = ["Below ₹35,000", "₹35,000 - ₹50,000", "₹50,000 - 1L", "1L - 2L", "2L - 3L", "3L & above"];
  const months = [
    { label: "Jan", tours: 0 }, { label: "Feb", tours: 0 }, { label: "Mar", tours: 0 },
    { label: "Apr", tours: 0 }, { label: "May", tours: 0 }, { label: "Jun", tours: 0 },
    { label: "Jul", tours: 0 }, { label: "Aug", tours: 0 }, { label: "Sep", tours: 54 },
    { label: "Oct", tours: 443 }, { label: "Nov", tours: 422 }, { label: "Dec", tours: 329 },
  ];

  const destinationBase = [
    { name: "Europe", img: "/assets/img/search/1.avif" },
    { name: "South East Asia", img: "/assets/img/search/2.avif" },
    { name: "America", img: "/assets/img/search/3.avif" },
    { name: "Australia New Zealand", img: "/assets/img/search/4.webp" },
    { name: "Africa", img: "/assets/img/search/5.avif" },
    { name: "Japan China Korea", img: "/assets/img/search/6.webp" },
  ];

  // 2. Dynamic Filtering Logic
  const filteredDestinations = useMemo(() => {
    return destinationBase.map((dest) => {
      const matchingTours = TOUR_DATA.filter((tour) => {
        // Must match the region
        if (tour.region !== dest.name) return false;

        // Apply active filters (Best Season, Months, Price)
        return filters.every((filter) => {
          // If filter is a month (e.g., "Sep 2025")
          if (filter.includes(selectedYear.toString())) {
            return tour.month === filter;
          }
          // If filter is a Best Season tag
          if (bestSeasons.includes(filter)) {
            return tour.tags.includes(filter);
          }
          // If filter is a Price Range
          if (priceRanges.includes(filter)) {
            const p = tour.price;
            if (filter === "Below ₹35,000") return p < 35000;
            if (filter === "₹35,000 - ₹50,000") return p >= 35000 && p <= 50000;
            if (filter === "₹50,000 - 1L") return p > 50000 && p <= 100000;
            if (filter === "1L - 2L") return p > 100000 && p <= 200000;
            if (filter === "2L - 3L") return p > 200000 && p <= 300000;
            if (filter === "3L & above") return p > 300000;
          }
          return true;
        });
      });

      return {
        ...dest,
        tours: matchingTours.length,
        departures: Math.floor(matchingTours.length * 1.2), // Mock logic for departures
      };
    });
  }, [filters, selectedYear]);

  const toggleFilter = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const placeholders = ['Search "Gulmarg"', 'Search "Europe"', 'Search "Dubai"'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % placeholders.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Search Input Trigger */}
      <div className={`${mobile ? "flex w-full" : "hidden md:flex flex-1 justify-center px-6"}`}>
        <div
          className="flex items-center w-full max-w-md bg-white/10 border border-gray-300 text-white rounded-full px-4 py-1.5 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Search className="text-gray-400 w-3 h-3" />
          <input readOnly placeholder={placeholders[index]} className="flex-1 px-2 text-xs bg-transparent outline-none cursor-pointer" />
          <button className="text-blue-500 bg-gray-300 rounded-full p-2"><Mic className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-6xl bg-white text-black rounded-xl shadow-lg flex flex-col max-h-[90vh]">
            {/* Header & Pills */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <Search className="text-gray-400 w-5 h-5" />
                  <input className="flex-1 px-2 text-sm bg-transparent outline-none" placeholder="Search destinations..." />
                </div>
                <button onClick={() => setIsOpen(false)} className="bg-gray-200 p-2 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              {filters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {filters.map((f) => (
                    <span key={f} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      {f} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter(f)} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT SIDE: Dynamic Destinations */}
              <div className="space-y-6 bg-yellow-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-bold text-sm border-b pb-2 mb-4">BEST SEASON TOURS</h3>
                  <div className="flex flex-wrap gap-2">
                    {bestSeasons.map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleFilter(item)}
                        className={`px-4 py-1 rounded-full border text-xs ${filters.includes(item) ? "bg-blue-900 text-white" : "hover:bg-blue-100"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm border-b pb-2 mb-4">HOT SELLING DESTINATIONS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDestinations.map((d) => (
                      <div key={d.name} className={`flex items-center gap-3 p-2 border rounded-lg hover:shadow cursor-pointer transition-opacity ${d.tours === 0 ? 'opacity-50' : 'opacity-100'}`}>
                        <Image src={d.img} alt={d.name} width={70} height={50} className="rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-sm">{d.name}</p>
                          <p className="text-xs text-gray-500">{d.tours} tours • {d.departures} departures</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm border-b pb-2 mb-4">When do you wish to travel?</h3>
                  <div className="flex gap-4 mb-3">
                    {[2025, 2026].map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1 rounded-md text-sm ${selectedYear === year ? "bg-blue-900 text-white" : "bg-gray-100"}`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {months.map((m) => {
                      const filterKey = `${m.label} ${selectedYear}`;
                      return (
                        <button
                          key={m.label}
                          onClick={() => toggleFilter(filterKey)}
                          className={`px-3 py-2 rounded-lg border text-xs text-center ${filters.includes(filterKey) ? "bg-blue-900 text-white" : "hover:bg-blue-100"}`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm border-b pb-2 mb-4">Popular Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => toggleFilter(range)}
                        className={`px-4 py-1 rounded-full border text-xs ${filters.includes(range) ? "bg-blue-900 text-white" : "hover:bg-blue-100"}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;



