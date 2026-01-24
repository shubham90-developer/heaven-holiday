"use client";
import Link from "next/link";
import React from "react";
import { useGetAllBlogsQuery } from "store/blogs/blogsApi";

const TravalTips = () => {
  const { data, isLoading, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  console.log("blogs", data);

  // Filter only published blogs and map to the required format
  const activeBlogs =
    data?.data
      ?.filter((item) => item.status === "published")
      ?.map((blog) => ({
        id: blog._id,
        img: blog.hero,
        title: blog.title,
        link: `/blog/${blog._id}`, // or use blog.slug if available
        category: blog.category?.name,
        readTime: blog.readTime,
        tags: blog.tags,
      })) || [];

  // Fallback if no published blogs
  if (activeBlogs.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-2xl text-center font-bold mb-3">
            Travel tips, hacks, tricks and a whole lot more...{" "}
          </h2>
          <div className="flex justify-center mb-8">
            <img
              src="/assets/img/header-bottom.svg"
              alt="underline"
              className="w-40 md:w-50"
            />
          </div>
          <p className="text-gray-500">
            No published blogs available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-2xl text-center font-bold mb-3">
          Travel tips, hacks, tricks and a whole lot more...{" "}
        </h2>

        {/* Underline Image */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/img/header-bottom.svg"
            alt="underline"
            className="w-40 md:w-50"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {activeBlogs.map((tip) => (
            <Link href={tip.link} key={tip.id} className="text-center">
              <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img
                  src={tip.img}
                  alt={tip.title}
                  className="w-full h-40 object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-bold text-black">{tip.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravalTips;
