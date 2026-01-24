"use client";
import Image from "next/image";
import Link from "next/link";

export default function SpecialityTours() {
  return (
    <div className="left-10 top-full  w-full lg:w-[900] max-h-[500px] bg-white shadow-lg border border-gray-200 py-6 px-6 overflow-y-auto z-50">
      <section className="mb-8 bg-blue-50 px-4 py-2">
        <h2 className="text-md font-semibold text-blue-800 mb-4 uppercase tracking-wide">
          BESTSELLING TOURS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Link
            href="#"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <Image
              src="/Womens-Special.webp"
              alt="Women's Special"
              width={300}
              height={180}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Women's Special
              </h3>
              <p className="text-xs text-blue-600 mt-1">110 Departures →</p>
            </div>
          </Link>

          <Link
            href="#"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <Image
              src="/Seniors-Special.webp"
              alt="Senior's Special"
              width={300}
              height={180}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Senior's Special
              </h3>
              <p className="text-xs text-blue-600 mt-1">83 Departures →</p>
            </div>
          </Link>

          <Link
            href="#"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <Image
              src="/family-tours.webp"
              alt="Family Tours"
              width={300}
              height={180}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Family Tour Packages
              </h3>
              <p className="text-xs text-blue-600 mt-1">1272 Departures →</p>
            </div>
          </Link>

          <Link
            href="#"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <Image
              src="/Womens-Special.webp"
              alt="Women's Special"
              width={300}
              height={180}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Women's Special
              </h3>
              <p className="text-xs text-blue-600 mt-1">110 Departures →</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
          SOMETHING NEW TO TRY
        </h2>

        {/* Top Grid: Icon + Title + Departures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            {
              title: "Couples Only",
              dep: "4 Departures",
              img: "/couples-only.svg",
            },
            {
              title: "Luxury Group Tours",
              dep: "2 Departures",
              img: "/luxury-tours-icon.svg",
            },
            { title: "Post Tour Holidays", img: "/post-tour-holidays.svg" },
            {
              title: "Short Trips",
              dep: "96 Departures",
              img: "/road-trip-icon.svg",
            },
            {
              title: "YOLO Outdoors",
              dep: "9 Departures",
              img: "/yolo-outdoors-icon.svg",
            },
          ].map((item) => (
            <Link
              href="#"
              key={item.title}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              {item.img && (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-10 h-10 object-contain"
                />
              )}
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">{item.title}</span>
                {item.dep && (
                  <span className="text-xs text-gray-500">{item.dep}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Grid: Newly Launched Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {[
            "Women's Special with Kids",
            "Women's Special Shopping and Food Tours",
            "Women's Special Spiritual Tours",
            "Grandparents and Grandchildren Special Tours",
          ].map((item) => (
            <Link
              href="#"
              key={item}
              className="flex items-start gap-3 bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition"
            >
              <span className="inline-block bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full mt-1">
                Newly Launched
              </span>
              <span className="text-sm font-medium text-gray-800 hover:text-blue-600">
                {item}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
          Departures to launch soon
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {[
            "One Week One Place",
            "Road Trips",
            "Treks & Hikes",
            "City Walks & Day Trips",
            "Students' Special",
            "Women's Special YOLO Tours",
          ].map((link) => (
            <Link
              href="#"
              key={link}
              className="text-gray-800 hover:text-blue-700 transition"
            >
              {link}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
