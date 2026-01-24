"use client";
import React from "react";
import {
  Building2,
  Phone,
  Mail,
  Share2,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { useGetFooterContactApiQuery } from "../../../store/footer-info/footer-contactApi";
const FooterContactInfo = () => {
  const { data, isLoading, error } = useGetFooterContactApiQuery();

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

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Our Offices */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-gray-800" />
            <h3 className="font-semibold text-lg">
              {responce?.offices.title || ""}
            </h3>
          </div>
          <p
            className="text-xs mb-2"
            dangerouslySetInnerHTML={{
              __html: responce?.offices.description || "",
            }}
          ></p>
          <Link
            href={responce?.offices?.mapLink || "#"}
            className="text-blue-800 font-semibold hover:underline"
          >
            Locate Us
          </Link>
        </div>

        {/* Call Us */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-gray-800" />
            <h3 className="font-semibold text-lg">
              {responce?.callUs.title || ""}
            </h3>
          </div>
          <p className="text-xs mb-2">
            Request a quote or chat – we’re here to help anytime!
          </p>
          <Link
            href={`tel:${responce?.callUs.phoneNumbers[0]}` || "#"}
            className="text-blue-800 font-semibold hover:underline"
          >
            {responce?.callUs.phoneNumbers[0] || ""}
          </Link>{" "}
          or{" "}
          <Link
            href={`tel:${responce?.callUs.phoneNumbers[1]}` || "#"}
            className="text-blue-800 font-semibold hover:underline"
          >
            {responce?.callUs.phoneNumbers[1] || ""}
          </Link>
        </div>

        {/* Write to Us */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-gray-800" />
            <h3 className="font-semibold text-lg">
              {responce?.writeToUs.title || ""}
            </h3>
          </div>
          <p className="text-sm mb-2">We’re always happy to help!</p>
          <p className="text-xs">
            For Feedback:{" "}
            <Link
              href={`mailto:${responce?.writeToUs.emails[0]}` || "#"}
              className="text-blue-800 font-semibold hover:underline"
            >
              feedback@{responce?.writeToUs.emails[0]}
            </Link>
          </p>
          <p className="text-xs">
            For Enquiries:{" "}
            <Link
              href={`mailto:${responce?.writeToUs.emails[1]}` || "#"}
              className="text-blue-800 font-semibold hover:underline"
            >
              travel@{responce?.writeToUs.emails[1]}
            </Link>
          </p>
        </div>

        {/* Connect with Us */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5 text-gray-800" />
            <h3 className="font-semibold text-lg">Connect with us</h3>
          </div>
          <p className="text-xs mb-4">Reviews, podcasts, blogs and more...</p>
          <div className="flex gap-3">
            <Link
              href={responce?.socialLinks.facebook || "#"}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-600"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href={responce?.socialLinks.youtube || "#"}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-600"
            >
              <Youtube className="w-4 h-4" />
            </Link>
            <Link
              href={responce?.socialLinks.linkedin || "#"}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-600"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href={responce?.socialLinks.instagram || "#"}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-600"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterContactInfo;
