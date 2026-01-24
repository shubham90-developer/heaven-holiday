"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import Link from "next/link";

const SignInModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const isMobileValid = mobile.length === 10;
  const isOtpValid = otp.length === 4;

  const handleNext = () => {
    if (step === 1 && isMobileValid) setStep(2);
    else if (step === 2 && isOtpValid) setStep(3);
    else if (step === 3) {
      console.log("Account created:", userData);
      setIsOpen(false);
      setStep(1);
      setMobile("");
      setOtp("");
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 hover:text-yellow-400 text-xs cursor-pointer"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Modal box */}
          <div className="bg-white text-black rounded-2xl shadow-lg w-full max-w-md mx-4 relative p-6">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-gray-200 p-2 rounded-full cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setStep(1);
                setMobile("");
                setOtp("");
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step 1: Mobile number */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Welcome to Heaven Holiday
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Please enter your mobile number to receive a verification code
                </p>

                <div className="flex items-center border rounded-lg overflow-hidden mb-4">
                  {/* Country code dropdown (simple for now) */}
                  <select className="px-2 py-2 bg-gray-100 text-sm">
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={10}
                    placeholder="Enter 10 digit mobile number"
                    className="flex-1 px-3 py-2 text-sm outline-none"
                  />
                </div>

                <button
                  disabled={!isMobileValid}
                  onClick={handleNext}
                  className={`w-full py-2 rounded-lg text-white font-semibold cursor-pointer ${
                    isMobileValid
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Request OTP
                </button>
              </>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Verify OTP
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Enter the 4-digit code sent to your number
                </p>

                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  placeholder="Enter 4-digit OTP"
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg tracking-widest mb-4 outline-none"
                />

                <button
                  disabled={!isOtpValid}
                  onClick={handleNext}
                  className={`w-full py-2 rounded-lg text-white font-semibold cursor-pointer ${
                    isOtpValid
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Verify & Continue
                </button>
              </>
            )}

            {/* Step 3: Account creation */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Create Your Account
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Please provide your details
                </p>
                <label htmlFor="firstName" className="text-xs">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-3 outline-none"
                />
                <label htmlFor="lastName" className="text-xs">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-3 outline-none"
                />
                <label htmlFor="email" className="text-xs">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full border border-gray-400 rounded-lg px-3 py-2 mb-4 outline-none"
                />

                <button
                  onClick={handleNext}
                  className="w-full py-2 cursor-pointer rounded-lg text-white font-semibold bg-yellow-500 hover:bg-yellow-600"
                >
                  Create Account
                </button>
              </>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-600 text-center mt-4">
              By continuing you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
