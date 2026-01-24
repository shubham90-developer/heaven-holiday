"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetPodcastsQuery } from "store/podcasts/podcastApi";

const PodcastAllList = () => {
  const [search, setSearch] = useState("");
  const { id: podcastId } = useParams();
  const { data, isLoading, error } = useGetPodcastsQuery();

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  // Fix: Handle array properly and get first item
  const podcastDetail = data?.data?.find((item) => item._id === podcastId);

  // Fix: Return early if no podcast found
  if (!podcastDetail) {
    return <p>Podcast not found</p>;
  }

  console.log(podcastDetail);

  // Fix: Access episodesList correctly from podcastDetail object
  const filteredEpisodes = podcastDetail?.episodesList?.filter((ep) =>
    ep.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative">
      {/* 🔵 Curved Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-800 rounded-b-[80px]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow relative z-10">
          {/* Podcast Image */}
          <div className="w-full md:w-1/4">
            <img
              src={podcastDetail.cover}
              alt={podcastDetail.title}
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Podcast Info */}
          <div className="w-full md:w-3/4">
            <span className="mt-2 mb-4 inline-block px-3 py-1 bg-blue-200 text-xs font-medium rounded-full">
              {podcastDetail.language}
            </span>
            <h1 className="text-2xl font-bold mb-3">{podcastDetail.title}</h1>
            <p className="text-gray-700 text-sm leading-relaxed">
              {/* Fix: Strip HTML tags from description or use dangerouslySetInnerHTML */}
              <span
                dangerouslySetInnerHTML={{ __html: podcastDetail.description }}
              />
            </p>
          </div>
        </div>

        {/* Episodes Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-4 gap-3 relative z-10">
          <h2 className="text-lg font-semibold">
            {podcastDetail?.episodesList?.length || 0} Episodes{" "}
            <span className="text-gray-500 text-sm ml-1">
              Showing 1 - {filteredEpisodes?.length || 0} of{" "}
              {podcastDetail?.episodesList?.length || 0}
            </span>
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search Episode"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm w-48 focus:ring focus:ring-blue-300"
            />
            <select className="border rounded px-3 py-1 text-sm">
              <option value="latest">Sort by: Latest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="popular">Sort by: Popular</option>
            </select>
          </div>
        </div>

        {/* Episodes List */}
        <div className="space-y-4 relative z-10">
          {filteredEpisodes?.map((ep, index) => (
            <div
              key={ep._id || index}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={ep.thumbnail || podcastDetail.cover}
                  alt={ep.title || "Episode thumbnail"}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs rounded-md">
                  ▶
                </button>
              </div>

              {/* Episode Info */}
              <Link
                href={`/podcast/podcast-details/${ep._id}`}
                className="flex-1"
              >
                <h3 className="font-medium text-sm">{ep.title}</h3>
                <div className="text-xs text-gray-500 flex gap-3 mt-1">
                  <span className="text-black text-xs">Ep: {ep.order + 1}</span>
                  <span className="text-black text-xs">{ep.duration}</span>
                  <span className="text-black text-xs">
                    {ep.views || 0} views
                  </span>
                  <span className="text-black text-xs">
                    {new Date(ep.date).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastAllList;
