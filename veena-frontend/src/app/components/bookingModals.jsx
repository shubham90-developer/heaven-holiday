"use client";
import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaCalendar,
  FaInfoCircle,
} from "react-icons/fa";
import { useCreateBookingMutation } from "store/bookingApi/bookingApi";
import DepartureSelector from "../pages/TourDetails/DepartureSelector";

const BookingStepperModal = ({ isOpen, onClose, tourData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createBooking, { isLoading, isSuccess, data: bookingData }] =
    useCreateBookingMutation();
  const userId = localStorage.getItem("userId");
  console.log("userId", userId);
  const [formData, setFormData] = useState({
    // Step 1: Departure & City
    selectedDeparture: null,
    packageType: "Joining Package",

    // Step 2: Traveler Count
    travelerCount: {
      adults: 1,
      children: 0,
      infants: 0,
      total: 1,
    },

    // Step 3: Traveler Details
    travelers: [],

    // Pricing
    pricing: {
      totalAmount: 0,
      advanceAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
      pricePerPerson: 0,
    },
  });

  const [errors, setErrors] = useState({});

  // Calculate pricing when departure or traveler count changes
  useEffect(() => {
    if (formData.selectedDeparture) {
      const basePrice =
        formData.packageType === "Full Package"
          ? tourData?.baseFullPackagePrice || 30000
          : tourData?.baseJoiningPrice || 25000;

      const totalAmount = basePrice * formData.travelerCount.total;
      const advanceAmount = Math.ceil(totalAmount * 0.25); // 25% advance

      setFormData((prev) => ({
        ...prev,
        pricing: {
          totalAmount,
          advanceAmount,
          paidAmount: 0,
          pendingAmount: totalAmount,
          pricePerPerson: basePrice,
        },
      }));
    }
  }, [
    formData.selectedDeparture,
    formData.travelerCount,
    formData.packageType,
  ]);

  // Initialize travelers array when count changes
  useEffect(() => {
    const { adults, children, infants } = formData.travelerCount;
    const travelers = [];

    for (let i = 0; i < adults; i++) {
      travelers.push({
        type: "Adult",
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        isLeadTraveler: i === 0,
        email: i === 0 ? "" : undefined,
        phone: i === 0 ? "" : undefined,
      });
    }

    for (let i = 0; i < children; i++) {
      travelers.push({
        type: "Child",
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        isLeadTraveler: false,
      });
    }

    for (let i = 0; i < infants; i++) {
      travelers.push({
        type: "Infant",
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        isLeadTraveler: false,
      });
    }

    setFormData((prev) => ({ ...prev, travelers }));
  }, [formData.travelerCount]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateEndDate = (startDate, days) => {
    if (!startDate || !days) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  };

  // Step 1: Departure Selection Handler
  const handleDepartureSelect = (departure) => {
    setFormData((prev) => ({
      ...prev,
      selectedDeparture: {
        departureId: departure._id,
        departureCity: departure.city,
        departureDate: departure.date,
        packageType: prev.packageType,
      },
    }));
  };

  // Step 2: Traveler Count Handler
  const handleCountChange = (type, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);

    setFormData((prev) => {
      const newCount = { ...prev.travelerCount };

      if (type === "adults") {
        newCount.adults = Math.max(1, newValue); // At least 1 adult
      } else {
        newCount[type] = newValue;
      }

      newCount.total = newCount.adults + newCount.children + newCount.infants;

      return { ...prev, travelerCount: newCount };
    });
  };

  // Step 3: Traveler Details Handler
  const handleTravelerChange = (index, field, value) => {
    setFormData((prev) => {
      const travelers = [...prev.travelers];
      travelers[index] = { ...travelers[index], [field]: value };

      // Auto-calculate age from date of birth
      if (field === "dateOfBirth" && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        travelers[index].age = age;
      }

      return { ...prev, travelers };
    });
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.selectedDeparture) {
      newErrors.departure = "Please select a departure date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.travelerCount.total < 1) {
      newErrors.count = "At least 1 traveler is required";
    }
    if (formData.selectedDeparture) {
      const departure = tourData?.departures?.find(
        (d) => d._id === formData.selectedDeparture.departureId,
      );
      if (
        departure &&
        formData.travelerCount.total > departure.availableSeats
      ) {
        newErrors.count = `Only ${departure.availableSeats} seats available`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    formData.travelers.forEach((traveler, index) => {
      if (!traveler.title) newErrors[`traveler_${index}_title`] = "Required";
      if (!traveler.firstName)
        newErrors[`traveler_${index}_firstName`] = "Required";
      if (!traveler.lastName)
        newErrors[`traveler_${index}_lastName`] = "Required";
      if (!traveler.dateOfBirth)
        newErrors[`traveler_${index}_dob`] = "Required";
      if (!traveler.gender) newErrors[`traveler_${index}_gender`] = "Required";

      if (traveler.isLeadTraveler) {
        if (!traveler.email) newErrors[`traveler_${index}_email`] = "Required";
        if (!traveler.phone) newErrors[`traveler_${index}_phone`] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) isValid = validateStep1();
    if (currentStep === 2) isValid = validateStep2();
    if (currentStep === 3) isValid = validateStep3();

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login first!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please login again.");
      return;
    }

    try {
      // Find the lead traveler
      const leadTraveler = formData.travelers.find((t) => t.isLeadTraveler);
      if (!leadTraveler) {
        alert("Please select a lead traveler");
        return;
      }

      // Build payload
      const bookingPayload = {
        user: userId,
        tourPackage: tourData._id,
        selectedDeparture: {
          departureId: formData.selectedDeparture.departureId,
          departureCity: formData.selectedDeparture.departureCity,
          departureDate: formData.selectedDeparture.departureDate,
          packageType: formData.selectedDeparture.packageType,
        },
        travelers: formData.travelers.map((t) => ({
          type: t.type,
          title: t.title,
          firstName: t.firstName,
          lastName: t.lastName,
          dateOfBirth: t.dateOfBirth,
          age: parseInt(t.age),
          gender: t.gender,
          isLeadTraveler: t.isLeadTraveler,
          email: t.email || undefined,
          phone: t.phone || undefined,
        })),
        travelerCount: formData.travelerCount,
        pricing: formData.pricing,
        leadTraveler: {
          name: `${leadTraveler.firstName} ${leadTraveler.lastName}`,
          email: leadTraveler.email || undefined,
          phone: leadTraveler.phone || undefined,
        },
      };

      // Call backend API
      const result = await createBooking(bookingPayload).unwrap();

      alert("Booking created successfully!");
      onClose();
    } catch (error) {
      alert(`Booking failed: ${error?.data?.message || "Please try again"}`);
    }
  };

  // Handle successful booking
  useEffect(() => {
    if (isSuccess && bookingData) {
      alert("Booking created successfully! Redirecting to payment...");
      // Here you can redirect to payment page or open payment modal
      onClose();
    }
  }, [isSuccess, bookingData]);

  if (!isOpen) return null;

  const steps = [
    { id: 1, name: "Departure & City" },
    { id: 2, name: "Traveler Count" },
    { id: 3, name: "Traveler Details" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-7xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            Complete Your Booking
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Stepper */}
        <div className="border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {currentStep > step.id ? <FaCheckCircle /> : step.id}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left: Form Steps */}
            <div className="lg:col-span-2">
              {/* Step 1: Departure & City */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Select Departure City & Date
                  </h3>

                  {/* Package Type Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Package Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="packageType"
                          value="Joining Package"
                          checked={formData.packageType === "Joining Package"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packageType: e.target.value,
                              selectedDeparture: prev.selectedDeparture
                                ? {
                                    ...prev.selectedDeparture,
                                    packageType: e.target.value,
                                  }
                                : null,
                            }))
                          }
                          className="mr-2"
                        />
                        Joining Package
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="packageType"
                          value="Full Package"
                          checked={formData.packageType === "Full Package"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              packageType: e.target.value,
                              selectedDeparture: prev.selectedDeparture
                                ? {
                                    ...prev.selectedDeparture,
                                    packageType: e.target.value,
                                  }
                                : null,
                            }))
                          }
                          className="mr-2"
                        />
                        Full Package
                      </label>
                    </div>
                  </div>

                  {/* Departure Selector */}
                  <DepartureSelector
                    departures={tourData?.departures}
                    onDateSelect={handleDepartureSelect}
                  />

                  {errors.departure && (
                    <p className="text-red-600 text-sm mt-2">
                      {errors.departure}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Traveler Count */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Number of Travelers
                  </h3>

                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-600">12+ years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleCountChange(
                              "adults",
                              formData.travelerCount.adults - 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {formData.travelerCount.adults}
                        </span>
                        <button
                          onClick={() =>
                            handleCountChange(
                              "adults",
                              formData.travelerCount.adults + 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-600">2-11 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleCountChange(
                              "children",
                              formData.travelerCount.children - 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {formData.travelerCount.children}
                        </span>
                        <button
                          onClick={() =>
                            handleCountChange(
                              "children",
                              formData.travelerCount.children + 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-sm text-gray-600">Below 2 years</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleCountChange(
                              "infants",
                              formData.travelerCount.infants - 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {formData.travelerCount.infants}
                        </span>
                        <button
                          onClick={() =>
                            handleCountChange(
                              "infants",
                              formData.travelerCount.infants + 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <FaInfoCircle className="inline mr-2" />
                        Total Travelers: {formData.travelerCount.total}
                      </p>
                    </div>
                  </div>

                  {errors.count && (
                    <p className="text-red-600 text-sm mt-2">{errors.count}</p>
                  )}
                </div>
              )}

              {/* Step 3: Traveler Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Traveler Details
                  </h3>

                  {formData.travelers.map((traveler, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <FaUser className="text-blue-600" />
                        <h4 className="font-semibold">
                          {traveler.type} {index + 1}
                          {traveler.isLeadTraveler && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Lead Traveler
                            </span>
                          )}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={traveler.title}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Master">Master</option>
                            <option value="Miss">Miss</option>
                          </select>
                          {errors[`traveler_${index}_title`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors[`traveler_${index}_title`]}
                            </p>
                          )}
                        </div>

                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={traveler.firstName}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "firstName",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            placeholder="First Name"
                          />
                          {errors[`traveler_${index}_firstName`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors[`traveler_${index}_firstName`]}
                            </p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={traveler.lastName}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "lastName",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Last Name"
                          />
                          {errors[`traveler_${index}_lastName`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors[`traveler_${index}_lastName`]}
                            </p>
                          )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date of Birth{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={traveler.dateOfBirth}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "dateOfBirth",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                          {errors[`traveler_${index}_dob`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors[`traveler_${index}_dob`]}
                            </p>
                          )}
                        </div>

                        {/* Age */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={traveler.age}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-50"
                            placeholder="Auto-calculated"
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Gender <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={traveler.gender}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "gender",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors[`traveler_${index}_gender`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {errors[`traveler_${index}_gender`]}
                            </p>
                          )}
                        </div>

                        {/* Email (Lead Traveler Only) */}
                        {traveler.isLeadTraveler && (
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={traveler.email || ""}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "email",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border rounded"
                              placeholder="email@example.com"
                            />
                            {errors[`traveler_${index}_email`] && (
                              <p className="text-red-600 text-xs mt-1">
                                {errors[`traveler_${index}_email`]}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Phone (Lead Traveler Only) */}
                        {traveler.isLeadTraveler && (
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={traveler.phone || ""}
                              onChange={(e) =>
                                handleTravelerChange(
                                  index,
                                  "phone",
                                  e.target.value,
                                )
                              }
                              className="w-full p-2 border rounded"
                              placeholder="+91 9876543210"
                            />
                            {errors[`traveler_${index}_phone`] && (
                              <p className="text-red-600 text-xs mt-1">
                                {errors[`traveler_${index}_phone`]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Booking Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-xl shadow border border-gray-200 sticky top-4">
                <h2 className="flex items-center gap-2 font-semibold text-lg mb-4 border-b pb-2">
                  <FaCalendar className="text-blue-600" />
                  BOOKING SUMMARY
                </h2>

                {/* Tour Title */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800">
                    {tourData?.title}
                  </p>
                  <p className="text-xs text-gray-600">{tourData?.subtitle}</p>
                </div>

                {/* Departure City */}
                {formData.selectedDeparture && (
                  <div className="mb-2 flex justify-between text-sm text-gray-700">
                    <span>Dept. city</span>
                    <span className="font-medium">
                      {formData.selectedDeparture.departureCity}
                    </span>
                  </div>
                )}

                {/* Departure Date */}
                {formData.selectedDeparture && (
                  <div className="mb-2 flex justify-between text-sm text-gray-700">
                    <span>Dept. date</span>
                    <span className="font-semibold text-black">
                      {formatDate(formData.selectedDeparture.departureDate)} →{" "}
                      {calculateEndDate(
                        formData.selectedDeparture.departureDate,
                        tourData?.days,
                      )}
                    </span>
                  </div>
                )}

                {/* Package Type */}
                <div className="mb-2 flex justify-between text-sm text-gray-700">
                  <span>Package Type</span>
                  <span className="font-medium">{formData.packageType}</span>
                </div>

                {/* Travelers */}
                <div className="mb-2 flex justify-between text-sm text-gray-700">
                  <span>Travelers</span>
                  <span>
                    {formData.travelerCount.adults} Adult(s) |{" "}
                    {formData.travelerCount.children} Child |{" "}
                    {formData.travelerCount.infants} Infant
                  </span>
                </div>

                {/* Price Section */}
                <div className="border-t border-dashed pt-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-black">
                      Total Amount
                    </span>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold text-xl">
                        ₹{formData.pricing.totalAmount.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹
                        {formData.pricing.pricePerPerson.toLocaleString(
                          "en-IN",
                        )}{" "}
                        per person
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-700">Advance (25%)</span>
                    <span className="font-semibold">
                      ₹{formData.pricing.advanceAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Balance</span>
                    <span className="font-semibold">
                      ₹
                      {(
                        formData.pricing.totalAmount -
                        formData.pricing.advanceAmount
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Traveler List (Step 3 only) */}
                {currentStep === 3 && formData.travelers.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Travelers:</h4>
                    <div className="space-y-1">
                      {formData.travelers.map((traveler, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          {traveler.firstName && traveler.lastName ? (
                            <>
                              {index + 1}. {traveler.title} {traveler.firstName}{" "}
                              {traveler.lastName}
                              {traveler.isLeadTraveler && (
                                <span className="text-green-600 ml-1">
                                  (Lead)
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              {index + 1}. {traveler.type} - Pending
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-4 flex justify-between items-center flex-shrink-0 bg-gray-50">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Back
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? "Creating Booking..." : "Proceed to Payment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingStepperModal;
