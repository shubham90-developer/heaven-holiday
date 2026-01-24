"use client";
import React, { useState } from "react";
import { useGetGalleryQuery } from "../../../../store/galleryApi/galleryApi";
import {
  useCreateFeedbackMutation,
  useGetAllFeedbacksQuery,
} from "../../../../store/reviewsFeedback/reviewsApi";

const ReviewsAndTestimonialTab = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryPage, setGalleryPage] = useState(1);

  // ✅ Dummy reviews data
  const reviews = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    tag: "Seniors' Special",
    title: "Seniors' Special Sri Lanka",
    text: "Great tour experience, well managed by Heaven Holiday!",
    author: `Traveller ${i + 1}`,
    date: "Sep, 2025",
  }));

  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // ✅ Slice reviews for pagination
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const {
    data: galleryData,
    isLoading: galleryLoading,
    error: galleryError,
  } = useGetGalleryQuery();

  if (galleryLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (galleryError) {
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

  // Filter only active images
  const galleryImages = (galleryData?.data?.images || []).filter(
    (img) => img.status === "active",
  );

  // Gallery pagination
  const imagesPerPage = 10;
  const totalGalleryPages = Math.ceil(galleryImages.length / imagesPerPage);
  const galleryStartIndex = (galleryPage - 1) * imagesPerPage;
  const currentGalleryImages = galleryImages.slice(
    galleryStartIndex,
    galleryStartIndex + imagesPerPage,
  );

  const goToGalleryPage = (page) => {
    if (page > 0 && page <= totalGalleryPages) setGalleryPage(page);
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2 rounded-md text-sm font-medium border cursor-pointer ${
              activeTab === "reviews"
                ? "bg-blue-800 text-white border-blue-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            All reviews
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-2 rounded-md text-sm font-medium border cursor-pointer ${
              activeTab === "gallery"
                ? "bg-blue-800 text-white border-blue-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Photo gallery
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "reviews" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Showing {startIndex + 1}-{startIndex + currentReviews.length} of{" "}
                <span className="font-semibold">{reviews.length}</span> total
                reviews
              </p>

              {/* Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-100 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-xs text-pink-600 font-medium bg-pink-100 px-2 py-1 rounded">
                      {review.tag}
                    </span>
                    <h3 className="mt-2 font-semibold text-gray-800">
                      {review.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      "{review.text}"
                    </p>
                    <p className="text-sm font-medium mt-3">{review.author}</p>
                    <p className="text-xs text-gray-500">
                      Travelled in {review.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-6">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {/* Previous */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`px-3 py-1 border rounded text-xs whitespace-nowrap ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Showing {galleryStartIndex + 1}-
                {galleryStartIndex + currentGalleryImages.length} of{" "}
                <span className="font-semibold">{galleryImages.length}</span>{" "}
                total photos & videos
              </p>

              {/* Dynamic Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {currentGalleryImages.length > 0 ? (
                  currentGalleryImages.map((image) => (
                    <div
                      key={image._id}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={image.url}
                        alt="gallery"
                        className="w-full h-full object-cover hover:scale-105 transition"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'>Image</text></svg>";
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No gallery images available</p>
                  </div>
                )}
              </div>

              {/* Gallery Pagination */}
              {totalGalleryPages > 1 && (
                <div className="flex items-center justify-center mt-6">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {/* Previous */}
                    <button
                      onClick={() => goToGalleryPage(galleryPage - 1)}
                      disabled={galleryPage === 1}
                      className="px-3 py-1 border text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalGalleryPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => goToGalleryPage(i + 1)}
                        className={`px-3 py-1 border rounded text-xs whitespace-nowrap ${
                          galleryPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    {/* Next */}
                    <button
                      onClick={() => goToGalleryPage(galleryPage + 1)}
                      disabled={galleryPage === totalGalleryPages}
                      className="px-3 py-1 border text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndTestimonialTab;
