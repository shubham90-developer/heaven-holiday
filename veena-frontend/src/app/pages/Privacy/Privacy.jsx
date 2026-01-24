"use client";
import Breadcrumb from "@/app/components/Breadcum";
import React from "react";
import { useGetPrivacyPolicyQuery } from "../../../../store/privacyPolicyApi/privacyPolicyApi";
const PrivacyPolicy = () => {
  const { data, isError, isLoading } = useGetPrivacyPolicyQuery();
  if (isLoading) {
    return <p>loading</p>;
  }
  if (isError) {
    return <p>error</p>;
  }
  const responce = data?.data;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: null },
        ]}
      />
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 bg-red-700 p-5 text-white">
          <div>
            <p className="text-2xl font-bold bg-black text-white p-4 mb-10 text-center">
              Privacy Policy
            </p>
            <p
              className="text-md text-justify mb-4"
              dangerouslySetInnerHTML={{ __html: responce?.content || "" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
