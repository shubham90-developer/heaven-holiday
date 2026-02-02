"use client";
import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import PhoneDropdown from "./TopNum";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import SignInModal from "./SignInModal";
import ProfileDropdown from "./ProfileDroupdown";
import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const TopNavBar = () => {
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  const timeoutRef = useRef(null);

  // Auth state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Ensure token is in localStorage
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("authToken", token);
        console.log("User logged in:", firebaseUser.phoneNumber);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
        console.log("User logged out");
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPhoneInfo(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPhoneInfo(false), 500);
  };

  return (
    <header className="w-full bg-[#0d1b29] text-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-2">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Search Box (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5 relative">
          <Link
            href="/travel-planner-details"
            target="_blank"
            className="hidden sm:inline-block text-yellow-400 font-semibold hover:underline text-xs"
          >
            Travel Planner 2025
          </Link>
          |
          <PhoneDropdown />
          {/* Conditional Rendering Based on Auth State */}
          {loading ? (
            // Loading state
            <div className="flex items-center gap-1 text-xs">
              <User className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Loading...</span>
            </div>
          ) : user ? (
            // User is authenticated - Show ProfileDropdown with user prop
            <ProfileDropdown user={user} />
          ) : (
            // User is not authenticated - Show SignInModal
            <SignInModal />
          )}
        </div>
      </div>

      {/* Mobile Search (always full width) */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar mobile />
      </div>
    </header>
  );
};

export default TopNavBar;
