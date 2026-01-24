"use client";
import Breadcrumb from "@/app/components/Breadcum";
import React from "react";
import { useGetAllBlogsQuery } from "../../../../../store/blogs/blogsApi";
import { useParams } from "next/navigation";
import { useCreateCommentMutation } from "store/commentApi/commentApi";
import { useGetAllCommentsQuery } from "store/commentApi/commentApi";
import { useState } from "react";
const Tag = ({ children }) => (
  <span className="inline-block text-sm px-3 py-1 mr-2 mb-2 rounded-full bg-gray-100 text-gray-700">
    {children}
  </span>
);

export default function BlogDetails() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  // Replace this dummy data with props or fetched content
  const post = {
    title: "How to Travel India: 12 Insider Tips",
    author: {
      name: "Admin",
      avatar: "/assets/img/blog/1.avif",
    },
    date: "September 25, 2025",
    readTime: "6 min read",
    hero: "/assets/img/blog/1.avif",
    tags: ["Travel", "India", "Tips"],
    content: `
## Introduction

India is a land of contrasts — vibrant cities, tranquil backwaters, and mountain ranges. In this guide we'll cover planning, safety, transport and cultural tips you should know before you go.

### Planning your trip

Start by choosing a region and season. North India and the Himalayas are best in summer (May–Sept) while the south is pleasant year-round. 

### Getting around

Trains are an experience — book in advance for long journeys. For short distances, autorickshaws and rideshares are convenient.

### Food & Health

Enjoy street food, but prefer busy stalls. Carry oral rehydration sachets and basic meds.

### Final tips

Pack a reusable water bottle, respect local dress codes, and learn a few basic phrases in Hindi.
`,
  };

  const related = [
    {
      id: 1,
      title: "Top 10 Destinations in India",
      img: "/assets/img/blog/1.avif",
    },
    { id: 2, title: "Budget Backpacking Tips", img: "/assets/img/blog/2.avif" },
  ];

  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useGetAllBlogsQuery();
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useGetAllCommentsQuery();

  if (blogsLoading || commentsLoading) {
    return <p>loading</p>;
  }
  if (blogsError || commentsError) {
    return <p>error</p>;
  }

  const { id } = useParams();
  const podcast = blogs?.data?.filter((item) => {
    return item._id == id;
  });
  console.log("comments", comments);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComment({ name, comment }).unwrap();
      setName("");
      setComment("");
      alert("Comment posted successfully!");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: "/blog/1" },
        ]}
      />

      <div className="bg-white">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
          <header className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main column */}
            <article className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img
                  src={podcast[0].hero}
                  alt="Hero"
                  className="w-full h-64 object-cover sm:h-96"
                />
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900">
                {podcast[0].title}
              </h1>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {podcast[0].tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  <button
                    className="ml-2 inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium text-gray-700 border-gray-200 hover:bg-gray-50"
                    aria-label="Share"
                  >
                    Share
                  </button>
                </div>
              </div>

              {/* Content */}
              <section className="prose prose-lg max-w-none mt-8 dark:prose-invert">
                <div
                  dangerouslySetInnerHTML={{
                    __html: podcast[0].content,
                  }}
                />
              </section>

              {/* Comments skeleton */}
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4">Comments</h4>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded">
                    <p className="text-sm font-medium">
                      Ravi Patel{" "}
                      <span className="text-xs text-gray-500">
                        • Sept 26, 2025
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      Great tips — the autorickshaw bargaining tip helped a lot!
                    </p>
                  </div>

                  {/* Comment form */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 p-4 border border-gray-100 rounded grid gap-3"
                  >
                    <input
                      className="border border-gray-100 rounded px-3 py-2"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      className="border border-gray-100 rounded px-3 py-2"
                      rows={4}
                      placeholder="Write a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="text-right">
                      <button className="px-4 py-2 bg-yellow-600 text-xs cursor-pointer text-white rounded">
                        Post comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="p-4 border border-gray-100 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">
                    Search posts
                  </label>
                  <div className="mt-2 flex">
                    <input
                      className="flex-1 border border-gray-100 rounded-l px-3 py-2"
                      placeholder="Search..."
                    />
                    <button className="px-4 py-2 bg-gray-100 border-l rounded-r">
                      Go
                    </button>
                  </div>
                </div>

                {/* Table of contents (basic) */}
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h5 className="text-sm font-semibold mb-3">On this page</h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      <a href="#introduction" className="hover:underline">
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a href="#planning" className="hover:underline">
                        Planning
                      </a>
                    </li>
                    <li>
                      <a href="#transport" className="hover:underline">
                        Getting around
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Related posts */}
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h5 className="text-sm font-semibold mb-3">Related posts</h5>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <a
                        key={r.id}
                        className="flex items-center gap-3"
                        href="#"
                      >
                        <img
                          src={r.img}
                          alt={r.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <span className="text-sm text-gray-800">{r.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </header>
        </main>
      </div>
    </>
  );
}
