"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Car, Plane, Ship, Compass, Gift, Users } from "lucide-react";

export default function CustomizedHolidays() {
  return (
    <div className="left-0 top-full w-full lg:w-[650px] bg-white shadow-lg border-t border-gray-200 z-50 overflow-hidden">
      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-8">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 space-y-5 text-sm">
          <Link
            href="#"
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left font-semibold text-blue-800 mb-2 sm:mb-3 transition"
          >
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <Image
                src="/customized-header-icon.webp"
                alt="Holiday Illustration"
                width={40}
                height={40}
                className="object-contain"
              />
              <p className="text-xs md:text-base leading-snug">
                THEMED EXPERIENCES – Find your reason!
              </p>
            </div>
          </Link>

          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">Family Fun</span>
            </li>
            <li className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">Romantic Holidays</span>
            </li>
            <li className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">Getaways</span>
            </li>
            <li className="flex items-center gap-3 flex-wrap">
              <Gift className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm flex items-center flex-wrap gap-1">
                Hidden Gems
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">
                  Newly Launched
                </span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Car className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">Self Drive Holidays</span>
            </li>
            <li className="flex items-center gap-3">
              <Plane className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">
                Air Inclusive Holidays
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Ship className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="text-gray-700 text-sm">Cruise Holidays</span>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-5">
          {/* Card 1 */}
          <Link
            href="/tour-list"
            className="flex flex-col items-start hover:shadow-md rounded-lg p-2 sm:p-3 transition border border-gray-100 hover:border-gray-200"
          >
            <Image
              src="/customized-1.avif"
              alt="Luxury Holidays"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-32 sm:h-36"
            />
            <div className="mt-3">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Luxury Holidays →
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Choose the right tailor-made luxury travel vacations
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href="/tour-list"
            className="flex flex-col items-start hover:shadow-md rounded-lg p-2 sm:p-3 transition border border-gray-100 hover:border-gray-200"
          >
            <Image
              src="/customized-2.avif"
              alt="Island Getaways"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-32 sm:h-36"
            />
            <div className="mt-3">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Island Getaways →
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Explore the tropical island getaways
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
