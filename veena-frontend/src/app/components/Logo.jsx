import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="block">
      <div className="relative w-24 h-10 sm:w-28 sm:h-12 md:w-30 md:h-15 lg:w-36 lg:h-15">
        <Image
          src="/assets/img/logo.png"
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
