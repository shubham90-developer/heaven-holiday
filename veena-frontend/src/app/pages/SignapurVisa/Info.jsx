"use client";
import React from "react";
import { useGetVisaInfoQuery } from "../../../../store/singaporeVisaApi/singaporevisaApi";

const Info = () => {
  const { data, isLoading, error } = useGetVisaInfoQuery();
  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <p
              className="text-xs md:text-sm font-medium text-black mb-4"
              dangerouslySetInnerHTML={{
                __html: data?.data?.heading || "",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
