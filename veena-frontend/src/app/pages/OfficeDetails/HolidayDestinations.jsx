"use client";
import Image from "next/image";

const destinations = [
  {
    id: 1,
    title: "Europe",
    image: "/assets/img/contact/h1.avif",
    tours: 127,
    departures: 110,
    guests: 100429,
  },
  {
    id: 2,
    title: "South East Asia",
    image: "/assets/img/contact/h2.avif",
    tours: 94,
    departures: 208,
    guests: 144394,
  },
  {
    id: 3,
    title: "America",
    image: "/assets/img/contact/h3.webp",
    tours: 32,
    departures: 37,
    guests: 13758,
  },
  {
    id: 4,
    title: "Africa",
    image: "/assets/img/contact/h4.avif",
    tours: 17,
    departures: 19,
    guests: 2869,
  },
  {
    id: 5,
    title: "Australia",
    image: "/assets/img/contact/h5.avif",
    tours: 55,
    departures: 82,
    guests: 13589,
  },
];

const HolidayDestinations = () => {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Scrollable Cards */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="relative min-w-[240px] h-[320px] rounded-xl overflow-hidden shadow-lg group"
            >
              {/* Background Image */}
              <Image
                src={dest.image}
                alt={dest.title}
                width={300}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Title */}
              <h3 className="absolute top-4 left-4 text-white text-lg font-bold drop-shadow-md">
                {dest.title}
              </h3>

              {/* Stats Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-md shadow p-3 text-xs text-gray-800 font-medium">
                <p>
                  <span className="font-bold">{dest.tours}</span> tours |{" "}
                  <span className="font-bold">{dest.departures}</span>{" "}
                  departures
                </p>
                <p>
                  <span className="font-bold">{dest.guests}</span> guests
                  travelled
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidayDestinations;
