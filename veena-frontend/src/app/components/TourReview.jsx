"use client";
import React from "react";
import { Star } from "lucide-react";
import CustomBtn from "@/app/components/CustomBtn";
import TourReviewModal from "./TourReviewModal";
import { useGetTourReviewQuery } from "../../../store/reviewsApi/reviewsApi";

// const reviews = [
//   {
//     id: 1,
//     rating: 5,
//     tag: "Seniors’ Special",
//     title: "Seniors' Special Sri Lanka",
//     text: `"Each and every department was on toes to support and result oriented. No complaints or regards..."`,
//     author: "Ashish",
//     date: "Sep, 2025",
//     guides: ["Amit Kene", "Siddharth Kore"],
//   },
//   {
//     id: 2,
//     tag: "Family",
//     title: "Mathura Vrindavan Gokul Govardhan",
//     text: `"I went to Mathura, Vrindavan with my family from Veena Tour, had a great experience..."`,
//     author: "Dhananjay",
//     date: "Sep, 2025",
//     guides: ["Prakash Patange", "Shubham Vekhande", "+1 more"],
//   },
//   {
//     id: 3,
//     rating: 5,
//     tag: "Women’s Special",
//     title: "Women's Special Delhi Agra",
//     text: `"It was my first Solo trip, but I enjoyed a lot. Everything was very well managed..."`,
//     author: "Sonal",
//     date: "Sep, 2025",
//     guides: ["Sagar Chachad", "Prathamesh Salvi"],
//   },
// ];

const TourReview = () => {
  const { data, isLoading, error } = useGetTourReviewQuery();

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

  const responce = data?.data;
  const reviews = responce?.reviews || [];
  const filteredReviews = reviews.filter((item) => {
    return item.status == "active";
  });

  return (
    <section className="py-14 bg-[#0d1b29]">
      <div className="max-w-6xl mx-auto text-center text-white mb-10">
        <h2 className="text-3xl font-bold">{responce?.mainTitle || ""}</h2>
        <p className="text-lg mt-2">{responce?.mainSubtitle || ""}</p>
      </div>

      {/* Review Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-lg shadow-md p-5 relative"
          >
            {/* Rating + Tag */}
            <div className="flex items-center gap-2 mb-2">
              {review.rating && (
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span className="ml-1 font-bold">{review.rating || ""}</span>
                </div>
              )}
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded">
                {review.tag || ""}
              </span>
            </div>
            {/* Title */}
            <h3 className="text-lg font-semibold">{review.title || ""}</h3>
            {/* Description */}
            <p
              className="text-gray-600 text-sm mt-2"
              dangerouslySetInnerHTML={{ __html: review.text || "" }}
            />
            {/* Author */}
            <div className="mt-4">
              <p className="font-semibold">{review.author || ""}</p>
              <p className="text-xs text-gray-500">
                Travelled in {review.updatedAt || ""}
              </p>
            </div>
            {/* Guides */}
            <div className="mt-3 text-blue-600 text-sm">
              {review.guides.join(", ")}
            </div>
            Optional image
            {/* {review.img && (
              <img
                src={review.img}
                alt={review.title}
                className="absolute top-5 right-5 w-20 h-20 object-cover rounded-md"
              />
            )} */}
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <TourReviewModal />
      </div>
    </section>
  );
};

export default TourReview;
