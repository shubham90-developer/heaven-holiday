"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import Link from "next/link";

import { auth, sendOtp } from "@/app/config/firebase";
import {
  useVerifyPhoneAndRegisterMutation,
  useCompleteBasicInfoMutation,
} from "store/authApi/authApi";

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
  const [loading, setLoading] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);

  const isMobileValid = mobile.length === 10;
  const isOtpValid = otp.length === 6;

  // RTK mutations
  const [verifyPhoneAndRegister] = useVerifyPhoneAndRegisterMutation();
  const [completeBasicInfo] = useCompleteBasicInfoMutation();

  const handleNext = async () => {
    try {
      // Step 1: Send OTP
      if (step === 1 && isMobileValid) {
        setLoading(true);
        const phoneNumber = `+91${mobile}`;

        // Use your sendOtp function
        const confirmation = await sendOtp(phoneNumber);

        setConfirmResult(confirmation);
        setStep(2);
        setLoading(false);
      }

      // Step 2: Verify OTP
      else if (step === 2 && isOtpValid) {
        setLoading(true);

        if (!confirmResult) {
          throw new Error("No confirmation result found");
        }

        // Verify OTP with Firebase
        const result = await confirmResult.confirm(otp);
        console.log("Firebase user verified:", result.user);

        // Get Firebase ID token
        const idToken = await result.user.getIdToken();
        console.log("ID Token obtained");

        // Call backend to register/login
        const response = await verifyPhoneAndRegister({
          phone: `+91${mobile}`,
        }).unwrap();

        // Check if user is new or existing
        if (
          response.data.isNewUser &&
          response.data.requiresProfileCompletion
        ) {
          setStep(3); // Go to profile completion
        } else {
          // User already exists, close modal
          alert("Login successful! Welcome back.");
          resetForm();
          setIsOpen(false);
        }

        setLoading(false);
      }

      // Step 3: Complete Profile
      else if (step === 3) {
        setLoading(true);

        if (!userData.firstName || !userData.lastName || !userData.email) {
          alert("Please fill all required fields");
          setLoading(false);
          return;
        }

        const response = await completeBasicInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        }).unwrap();

        console.log("Profile completed:", response);

        alert("Account created successfully! Welcome to Heaven Holiday.");

        // Reset and close modal
        resetForm();
        setIsOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid OTP. Please check and try again.";
      } else if (error.code === "auth/code-expired") {
        errorMessage = "OTP expired. Please request a new one.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setMobile("");
    setOtp("");
    setUserData({ firstName: "", lastName: "", email: "" });
    setConfirmResult(null);
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const phoneNumber = `+91${mobile}`;
      const confirmation = await sendOtp(phoneNumber);
      setConfirmResult(confirmation);
      alert("OTP resent successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert("Failed to resend OTP. Please try again.");
      setLoading(false);
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
                resetForm();
                setIsOpen(false);
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
                  <select className="px-2 py-2 bg-gray-100 text-sm outline-none">
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
                  disabled={!isMobileValid || loading}
                  onClick={handleNext}
                  className={`w-full py-2 rounded-lg text-white font-semibold cursor-pointer ${
                    isMobileValid && !loading
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Sending OTP..." : "Request OTP"}
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
                  Enter the 6-digit code sent to +91{mobile}
                </p>

                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border rounded-lg px-3 py-2 text-center text-lg tracking-widest mb-4 outline-none"
                  autoFocus
                />

                <button
                  disabled={!isOtpValid || loading}
                  onClick={handleNext}
                  className={`w-full py-2 rounded-lg text-white font-semibold cursor-pointer mb-2 ${
                    isOtpValid && !loading
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setStep(1);
                      setOtp("");
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Change Number
                  </button>
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Account creation */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Complete Your Profile
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Please provide your details to continue
                </p>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-xs block mb-1 font-medium"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-xs block mb-1 font-medium"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs block mb-1 font-medium"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={
                    loading ||
                    !userData.firstName ||
                    !userData.lastName ||
                    !userData.email
                  }
                  className={`w-full py-2 mt-4 cursor-pointer rounded-lg text-white font-semibold ${
                    userData.firstName &&
                    userData.lastName &&
                    userData.email &&
                    !loading
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Creating Account..." : "Complete Profile"}
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

      {/* Hidden reCAPTCHA container - required by Firebase */}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default SignInModal;
