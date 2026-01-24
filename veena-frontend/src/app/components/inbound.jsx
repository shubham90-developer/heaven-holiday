"use client";

import Image from "next/image";
import Link from "next/link";

export default function Inbound() {
  return (
    <div className="w-full lg:w-[800] bg-white text-gray-800 px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="bg-blue-50 p-4">
        <h2 className="text-md font-semibold mb-4">
          India: A Timeless Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <Link href="/tour-list" className="flex flex-col">
            <Image
              src="/inbound-1.webp"
              alt="Rajasthan Royale"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-28"
            />
            <h6 className="mt-2 text-sm font-semibold">Rajasthan Royale</h6>
            <p className="text-xs text-gray-500">Beyond The Forts</p>
          </Link>

          <Link href="/tour-list" className="flex flex-col">
            <Image
              src="/inbound-2.webp"
              alt="Rajasthan"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-28"
            />
            <h3 className="mt-2 text-sm font-semibold">Rajasthan</h3>
            <p className="text-xs text-gray-500">Roars & Royals</p>
          </Link>

          <Link href="/tour-list" className="flex flex-col">
            <Image
              src="/inbound-3.avif"
              alt="Golden Grandeur"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-28"
            />
            <h3 className="mt-2 text-sm font-semibold">Golden Grandeur</h3>
            <p className="text-xs text-gray-500">The Triangle of Royalty</p>
          </Link>

          <Link href="/tour-list" className="flex flex-col">
            <Image
              src="/inbound-4.avif"
              alt="Udaipur"
              width={200}
              height={120}
              className="rounded-md object-cover w-full h-28"
            />
            <h3 className="mt-2 text-sm font-semibold">Udaipur</h3>
            <p className="text-xs text-gray-500">The Triangle of Royalty</p>
          </Link>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div>
        <h2 className="text-md font-semibold mb-4">
          Explore Niche Experiences
        </h2>
        <div className="flex flex-col space-y-4">
          {[
            {
              title: "India Royale",
              desc: "Roots & Routes",
              img: "/inbound-5.webp",
              url: "/tour-list",
            },
            {
              title: "Sacred Trails",
              desc: "Ayodhya Prayagraj Varanasi",
              img: "/inbound-6.webp",
              url: "/tour-list",
            },
            {
              title: "On Buddha’s Trail",
              desc: "A pilgrimage route",
              img: "/inbound-7.avif",
              url: "/tour-list",
            },
            {
              title: "The Himalayan Kingdom",
              desc: "Mountain Range of Asia",
              img: "/inbound-8.avif",
              url: "/tour-list",
            },
          ].map((item, idx) => (
            <Link
              href={item.url}
              key={idx}
              className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50 transition"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={50}
                height={50}
                className="rounded-full object-cover w-12 h-12"
              />
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col space-y-4">
        {[
          {
            title: "Maharaja’s Express",
            desc: "The Indian Panorama",
            img: "/inbound-9.avif",
            url: "/tour-list",
          },
          {
            title: "Blissful Bhutan",
            desc: "Nature, Nirvana, Monks",
            img: "/inbound-10.webp",
            url: "/tour-list",
          },
          {
            title: "Nepal",
            desc: "Mountain Lakes & Wildlife",
            img: "/inbound-11.avif",
            url: "/tour-list",
          },
          {
            title: "Sri Lanka",
            desc: "Sacred Sites to Sandy Shores",
            img: "/inbound-12.webp",
            url: "/tour-list",
          },
        ].map((item, idx) => (
          <Link
            href={item.url}
            key={idx}
            className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50 transition"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={50}
              height={50}
              className="rounded-full object-cover w-12 h-12"
            />
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
