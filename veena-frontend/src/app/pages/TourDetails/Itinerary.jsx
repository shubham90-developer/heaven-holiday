"use client";
import { useState } from "react";
import { MapPin, Minus, Plus } from "lucide-react";
import {
  FaBalanceScale,
  FaEnvelope,
  FaPrint,
  FaWhatsapp,
} from "react-icons/fa";
import TourActions from "./TourActions";
import TourDetailsTabs from "./TourDetailsTabs";

const itineraryData = [
  {
    day: "Day 1 | 19 Nov, 25",
    title: "Arrival at Johannesburg – Sun City (1 Night)",
    content: `As your much-awaited journey with Heaven Holiday begins, here’s how your first day will unfold... 
Guests Departing from Mumbai will meet at the airport four hours before departure. 
Upon arrival in Johannesburg, the Tour Manager will assist you with airport formalities and onward travel to Sun City.
In the evening, explore the glamour of Sun City, known as the ‘Kingdom of Pleasure’.`,
  },
  {
    day: "Day 2 | 20 Nov, 25",
    title: "Sun City – Johannesburg (1 Night)",
    content: `After breakfast, enjoy the beauty of Sun City – from Valley of Waves water park to golf courses. 
Later, proceed to Johannesburg and check in to the hotel. Evening free for leisure.`,
  },
  {
    day: "Day 3 | 21 Nov, 25",
    title:
      "Johannesburg – Port Elizabeth – Tsitsikamma NP – Bloukrans Bridge – Knysna – George (2 Nights)",
    content: `Morning flight to Port Elizabeth. Visit Tsitsikamma National Park and cross the Bloukrans Bridge, 
the highest bungee jumping bridge in the world. Proceed to Knysna Lagoon and then George.`,
  },
  {
    day: "Day 4 | 22 Nov, 25",
    title: "George – Oudtshoorn – George",
    content: `Day trip to Oudtshoorn: visit Cango Caves, Ostrich Farm, and Cheetah Ranch. Return to George.`,
  },
  {
    day: "Day 5 | 23 Nov, 25",
    title: "George – Mossel Bay – Cape Town (3 Nights)",
    content: `Proceed to Mossel Bay, visit the Post Office Tree and enjoy scenic views. Later drive to Cape Town.`,
  },
  {
    day: "Day 6 | 24 Nov, 25",
    title: "Cape Town – Hermanus – Stellenbosch – Cape Town",
    content: `Excursion to Hermanus (famous for whale watching). Visit Stellenbosch wine estates before returning to Cape Town.`,
  },
  {
    day: "Day 7 | 25 Nov, 25",
    title: "Cape Town",
    content: `City tour of Cape Town: Table Mountain (weather permitting), Cape Point, Hout Bay, and V&A Waterfront.`,
  },
  {
    day: "Day 8 | 26 Nov, 25",
    title: "Cape Town – Victoria Falls (1 Night)",
    content: `Fly to Victoria Falls. Guided tour of the falls and enjoy local cultural performances.`,
  },
  {
    day: "Day 9 | 27 Nov, 25",
    title: "Victoria Falls – Nairobi (1 Night)",
    content: `Morning free at Victoria Falls. Later, fly to Nairobi. Evening at leisure.`,
  },
  {
    day: "Day 10 | 28 Nov, 25",
    title: "Nairobi (1 Night)",
    content: `Visit Giraffe Centre and Nairobi National Museum. Overnight stay in Nairobi.`,
  },
  {
    day: "Day 11 | 29 Nov, 25",
    title: "Lake Naivasha – Hell’s Gate NP – Lake Nakuru (1 Night)",
    content: `Drive to Lake Naivasha for a boat ride. Visit Hell’s Gate National Park and continue to Lake Nakuru.`,
  },
  {
    day: "Day 12 | 30 Nov, 25",
    title: "Lake Nakuru – Rhino Sanctuary – Masai Mara (2 Nights)",
    content: `Morning game drive at Lake Nakuru to spot flamingos and rhinos. Proceed to Masai Mara.`,
  },
  {
    day: "Day 13 | 01 Dec, 25",
    title: "Masai Mara",
    content: `Full-day game drive in Masai Mara. Spot lions, elephants, cheetahs, and more in the Great Migration season.`,
  },
  {
    day: "Day 14 | 02 Dec, 25",
    title: "Masai Mara – Nairobi (1 Night)",
    content: `Morning game drive in Masai Mara. Later, drive back to Nairobi.`,
  },
  {
    day: "Day 15 | 03 Dec, 25",
    title: "Nairobi – Departure",
    content: `After breakfast, transfer to the airport for departure. Tour concludes with happy memories!`,
  },
];

const Itinerary = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const toggleDay = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="itinerary" className="min-h-screen p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Itinerary <span className="text-gray-500 text-xs">(Day Wise)</span>
      </h2>
      <div>
        <div className="space-y-6">
          {itineraryData.map((item, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline Line (hide on last child) */}
              <div className="absolute left-5 top-2 bottom-0 w-px border-l-2 border-dashed border-gray-300 last:hidden"></div>

              {/* Pin icon */}
              <div className="absolute left-1 top-2 z-10">
                <div className="w-8 h-8 rounded-full border-2 border-blue-800 flex items-center justify-center bg-white">
                  <MapPin className="w-4 h-4 text-blue-800" />
                </div>
              </div>

              {/* Collapsible Card */}
              <div>
                <button
                  className="w-full flex justify-between items-center p-4 text-left cursor-pointer"
                  onClick={() => toggleDay(index)}
                >
                  <div>
                    <p className="text-sm text-gray-500">{item.day}</p>
                    <p className="text-base font-medium text-gray-800">
                      {item.title}
                    </p>
                  </div>
                  {openIndex === index ? (
                    <Minus className="text-gray-600" />
                  ) : (
                    <Plus className="text-gray-600" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="p-4 border-t text-gray-600 text-sm">
                    {item.content}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* read more  */}
        <div className="bg-blue-50 p-6 rounded-xl mt-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">
              Know, before you book
            </h3>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Collapsible content */}
          {expanded && (
            <div className="mt-4 text-gray-700 text-sm leading-relaxed space-y-2">
              <p>
                <strong>Please note:</strong>
              </p>
              <p>
                Airline: On group tours, we generally fly with airlines that are
                group-friendly.
              </p>
              <p>
                Group tours are based on economy class, if you wish to travel by
                Premium Economy / Business Class / First Class, we can arrange
                the same at an additional cost subject to availability.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;
