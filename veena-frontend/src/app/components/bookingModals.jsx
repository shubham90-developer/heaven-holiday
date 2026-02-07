"use client";
import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaCalendar,
  FaInfoCircle,
} from "react-icons/fa";
import {
  useCreateBookingMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useHandlePaymentFailureMutation,
} from "store/bookingApi/bookingApi";
import DepartureSelector from "../pages/TourDetails/DepartureSelector";
import toast from "react-hot-toast";

const BookingStepperModal = ({
  isOpen,
  onClose,
  tourData,
  preSelectedDeparture = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createBooking, { isLoading, isSuccess, data: bookingData }] =
    useCreateBookingMutation();
  const [createPaymentOrder, { isLoading: isCreatingOrder }] =
    useCreatePaymentOrderMutation();
  const [verifyPayment, { isLoading: isVerifying }] =
    useVerifyPaymentMutation();
  const [handlePaymentFailure] = useHandlePaymentFailureMutation();

  const userId = localStorage.getItem("userId");

  const [openTravelerForms, setOpenTravelerForms] = useState([]);
  const [paymentType, setPaymentType] = useState("advance");

  const [formData, setFormData] = useState({
    selectedDeparture: null,
    packageType: "Joining Package",

    travelerCount: {
      adults: 1,
      children: 0,
      infants: 0,
      total: 1,
    },

    travelers: [],

    pricing: {
      totalAmount: 0,
      advanceAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
      pricePerPerson: 0,
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.selectedDeparture) {
      const selectedDeparture = tourData?.departures?.find(
        (d) => d._id === formData.selectedDeparture.departureId,
      );

      const basePrice =
        formData.packageType === "Full Package"
          ? selectedDeparture?.fullPackagePrice ||
            tourData?.baseFullPackagePrice
          : selectedDeparture?.joiningPrice || tourData?.baseJoiningPrice;

      const totalAmount = basePrice * formData.travelerCount.total;
      const advanceAmount = Math.ceil(totalAmount * 0.5);

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
    tourData,
  ]);

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
    setOpenTravelerForms([]);
  }, [formData.travelerCount]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess && bookingData) {
      setCurrentStep(5);
    }
  }, [isSuccess, bookingData]);

  useEffect(() => {
    if (
      currentStep === 3 &&
      openTravelerForms.length === 0 &&
      formData.travelers.length > 0
    ) {
      setOpenTravelerForms([0]);
    }
  }, [currentStep, formData.travelers.length]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  useEffect(() => {
    if (isOpen && preSelectedDeparture) {
      console.log("Pre-filling departure:", preSelectedDeparture);

      setFormData((prev) => ({
        ...prev,
        selectedDeparture: {
          departureId: preSelectedDeparture._id,
          departureCity: preSelectedDeparture.city,
          departureDate: preSelectedDeparture.date,
          packageType: prev.packageType,
        },
      }));
    }
  }, [isOpen, preSelectedDeparture]);

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
        newCount.adults = Math.max(1, newValue);
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

  const toggleTravelerForm = (index) => {
    if (openTravelerForms.includes(index)) {
      setOpenTravelerForms(openTravelerForms.filter((i) => i !== index));
    } else {
      setOpenTravelerForms([...openTravelerForms, index]);
    }
  };

  const closeTravelerForm = (index) => {
    setOpenTravelerForms(openTravelerForms.filter((i) => i !== index));
  };

  const isTravelerFormFilled = (traveler) => {
    const basicFieldsFilled =
      traveler.firstName &&
      traveler.lastName &&
      traveler.dateOfBirth &&
      traveler.title &&
      traveler.gender;

    if (traveler.isLeadTraveler) {
      return basicFieldsFilled && traveler.email && traveler.phone;
    }

    return basicFieldsFilled;
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
        newErrors[`traveler_${index}_firstName`] = "First Name Required";
      if (!traveler.lastName)
        newErrors[`traveler_${index}_lastName`] = "Last Name Required";
      if (!traveler.dateOfBirth)
        newErrors[`traveler_${index}_dob`] = "DOB Required";
      if (!traveler.gender)
        newErrors[`traveler_${index}_gender`] = "Gender Required";

      if (traveler.isLeadTraveler) {
        if (!traveler.email)
          newErrors[`traveler_${index}_email`] = "Email Required";
        if (!traveler.phone)
          newErrors[`traveler_${index}_phone`] = "Phone Required";
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

    if (isValid) {
      if (currentStep === 3) {
        // Go to review step
        setCurrentStep(4);
      } else if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      selectedDeparture: null,
      packageType: "Joining Package",
      travelerCount: {
        adults: 1,
        children: 0,
        infants: 0,
        total: 1,
      },
      travelers: [],
      pricing: {
        totalAmount: 0,
        advanceAmount: 0,
        paidAmount: 0,
        pendingAmount: 0,
        pricePerPerson: 0,
      },
    });
    setOpenTravelerForms([]);
    setErrors({});
    setPaymentType("advance");
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleConfirmAndPay = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in. Please login again.");
      return;
    }

    try {
      const leadTraveler = formData.travelers.find((t) => t.isLeadTraveler);
      if (!leadTraveler) {
        toast.error("Please select a lead traveler");
        return;
      }

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

      await createBooking(bookingPayload).unwrap();
      toast.success("Booking created successfully!");
      // Step changes to 5 via useEffect
    } catch (error) {
      toast.error(
        `Booking failed: ${error?.data?.message || "Please try again"}`,
      );
    }
  };

  // Razorpay Payment Handler
  const handleRazorpayPayment = async () => {
    if (!bookingData?.data?.booking?.bookingId) {
      toast.error("Booking ID not found");
      return;
    }

    const bookingId = bookingData.data.booking.bookingId;
    const amount =
      paymentType === "advance"
        ? formData.pricing.advanceAmount
        : formData.pricing.totalAmount;

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await createPaymentOrder({
        bookingId,
        amount,
      }).unwrap();

      if (!orderResponse.success) {
        toast.error("Failed to create payment order");
        return;
      }

      const { orderId, amount: orderAmount, keyId } = orderResponse.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: keyId,
        amount: orderAmount,
        currency: "INR",
        name: "Heaven Holiday",
        description: `Payment for Booking ${bookingId}`,
        order_id: orderId,

        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyResponse = await verifyPayment({
              bookingId,
              paymentData: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                amount: orderAmount,
              },
            }).unwrap();

            if (verifyResponse.success) {
              toast.success("Payment successful!");
              resetForm();
              onClose();
              // Optionally redirect to booking success page
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: bookingData.data.booking.leadTraveler?.name || "",
          email: bookingData.data.booking.leadTraveler?.email || "",
          contact: bookingData.data.booking.leadTraveler?.phone || "",
        },

        theme: {
          color: "#dc2626", // red-600
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", async function (response) {
        try {
          await handlePaymentFailure({
            bookingId,
            failureData: {
              razorpayOrderId: response.error.metadata.order_id,
              error: {
                description: response.error.description,
              },
            },
          }).unwrap();
        } catch (error) {
          console.error("Failed to log payment failure:", error);
        }

        toast.error(`Payment Failed: ${response.error.description}`);
      });

      razorpay.open();
    } catch (error) {
      toast.error("Error processing payment");
      console.error("Payment error:", error);
    }
  };

  if (!isOpen) return null;

  const steps = [
    { id: 1, name: "Departure & City" },
    { id: 2, name: "Traveler Count" },
    { id: 3, name: "Traveler Details" },
    { id: 4, name: "Review & Confirm" },
    { id: 5, name: "Payment" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-8xl w-full my-8 max-h-[100vh] overflow-hidden flex flex-col hidden:scrollbar">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            Complete Your Booking
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Stepper */}
        <div className="border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > step.id
                        ? "bg-green-300 text-white"
                        : currentStep === step.id
                          ? "bg-red-600 text-white"
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
                      currentStep > step.id ? "bg-green-300" : "bg-gray-300"
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

                  {/* Departure Selector Component */}
                  <DepartureSelector
                    departures={tourData?.departures}
                    onDateSelect={handleDepartureSelect}
                    packageType={formData.packageType}
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

                  {formData.travelers.map((traveler, index) => {
                    const isFormOpen = openTravelerForms.includes(index);
                    const isFormFilled = isTravelerFormFilled(traveler);

                    return (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        {!isFormOpen && (
                          <button
                            onClick={() => toggleTravelerForm(index)}
                            className={`w-full p-4 rounded-lg border-2 border-dashed flex items-center justify-between transition-all ${
                              isFormFilled
                                ? "bg-green-50 border-green-300 hover:bg-green-100"
                                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isFormFilled
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 text-gray-600"
                                }`}
                              >
                                {isFormFilled ? <FaCheckCircle /> : <FaUser />}
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-gray-800">
                                  {traveler.type} {index + 1}
                                  {traveler.isLeadTraveler && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      Lead Traveler
                                    </span>
                                  )}
                                </p>
                                {isFormFilled && (
                                  <p className="text-sm text-gray-600">
                                    {traveler.title} {traveler.firstName}{" "}
                                    {traveler.lastName}
                                  </p>
                                )}
                                {!isFormFilled && (
                                  <p className="text-sm text-gray-500">
                                    Click to add details
                                  </p>
                                )}
                              </div>
                            </div>
                            <span
                              className={`font-medium ${
                                isFormFilled
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {isFormFilled
                                ? "✓ Edit Details"
                                : "+ Add Details"}
                            </span>
                          </button>
                        )}

                        {isFormOpen && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b">
                              <div className="flex items-center gap-2">
                                <FaUser className="text-red-600" />
                                <h4 className="font-semibold text-gray-800">
                                  {traveler.type} {index + 1}
                                  {traveler.isLeadTraveler && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      Lead Traveler
                                    </span>
                                  )}
                                </h4>
                              </div>
                              <button
                                onClick={() => closeTravelerForm(index)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                                title="Close form"
                              >
                                <FaTimes size={18} />
                              </button>
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
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                  First Name{" "}
                                  <span className="text-red-500">*</span>
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
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                  Last Name{" "}
                                  <span className="text-red-500">*</span>
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
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                              {traveler.isLeadTraveler && (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">
                                      Email{" "}
                                      <span className="text-red-500">*</span>
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
                                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="email@example.com"
                                    />
                                    {errors[`traveler_${index}_email`] && (
                                      <p className="text-red-600 text-xs mt-1">
                                        {errors[`traveler_${index}_email`]}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium mb-1">
                                      Phone{" "}
                                      <span className="text-red-500">*</span>
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
                                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="+91 9876543210"
                                    />
                                    {errors[`traveler_${index}_phone`] && (
                                      <p className="text-red-600 text-xs mt-1">
                                        {errors[`traveler_${index}_phone`]}
                                      </p>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                              <button
                                onClick={() => closeTravelerForm(index)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  if (isTravelerFormFilled(traveler)) {
                                    closeTravelerForm(index);
                                  } else {
                                    toast.error(
                                      "Please fill all required fields before saving",
                                    );
                                  }
                                }}
                                className="w-50 py-2 bg-red-700 rounded-lg font-medium hover:bg-red-500 text-white transition cursor-pointer px-6"
                              >
                                Save Details
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Review Your Booking
                  </h3>

                  {/* Tour Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Tour Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tour Name:</span>
                        <span className="font-medium">{tourData?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {tourData?.days}D/{tourData?.nights}N
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Type:</span>
                        <span className="font-medium">
                          {formData.packageType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure City:</span>
                        <span className="font-medium">
                          {formData.selectedDeparture?.departureCity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure Date:</span>
                        <span className="font-medium">
                          {formatDate(
                            formData.selectedDeparture?.departureDate,
                          )}{" "}
                          →{" "}
                          {calculateEndDate(
                            formData.selectedDeparture?.departureDate,
                            tourData?.days,
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mt-3 text-sm text-blue-600 hover:underline"
                    >
                      Edit Departure Details
                    </button>
                  </div>

                  {/* Travelers Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Travelers ({formData.travelerCount.total})
                    </h4>
                    <div className="space-y-3">
                      {formData.travelers.map((traveler, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {index + 1}. {traveler.title}{" "}
                                {traveler.firstName} {traveler.lastName}
                                {traveler.isLeadTraveler && (
                                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Lead
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-600">
                                {traveler.type} • {traveler.gender} • Age{" "}
                                {traveler.age}
                              </p>
                              {traveler.isLeadTraveler && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {traveler.email} • {traveler.phone}
                                </p>
                              )}
                            </div>
                            <FaCheckCircle className="text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="mt-3 text-sm text-blue-600 hover:underline"
                    >
                      Edit Traveler Details
                    </button>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Price Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person:</span>
                        <span className="font-medium">
                          ₹
                          {formData.pricing.pricePerPerson.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total travelers:</span>
                        <span className="font-medium">
                          {formData.travelerCount.total}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-base border-t pt-2">
                        <span>Total Amount:</span>
                        <span className="text-green-600">
                          ₹
                          {formData.pricing.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-orange-600">
                        <span>Advance Amount (50%):</span>
                        <span className="font-semibold">
                          ₹
                          {formData.pricing.advanceAmount.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Balance Amount:</span>
                        <span className="font-medium">
                          ₹
                          {(
                            formData.pricing.totalAmount -
                            formData.pricing.advanceAmount
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Note */}
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <FaInfoCircle className="inline mr-2" />
                      By clicking "Confirm & Proceed to Payment", you agree to
                      our terms and conditions. Your booking will be confirmed
                      after successful payment.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Payment */}
              {currentStep === 5 && bookingData && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <FaCheckCircle className="text-green-600 text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your booking ID:{" "}
                      <span className="font-semibold text-blue-600">
                        {bookingData.data.booking.bookingId}
                      </span>
                    </p>
                  </div>

                  {/* Payment Options */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Complete Your Payment
                    </h4>

                    {/* Payment Type Selection */}
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition">
                        <div>
                          <input
                            type="radio"
                            name="paymentType"
                            value="advance"
                            checked={paymentType === "advance"}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="mr-3"
                          />
                          <span className="font-medium">Pay Advance (50%)</span>
                          <p className="text-sm text-gray-600 ml-6">
                            Pay ₹
                            {formData.pricing.advanceAmount.toLocaleString(
                              "en-IN",
                            )}{" "}
                            now, rest before departure
                          </p>
                        </div>
                        <span className="font-bold text-orange-600">
                          ₹
                          {formData.pricing.advanceAmount.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </label>

                      <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-white transition">
                        <div>
                          <input
                            type="radio"
                            name="paymentType"
                            value="full"
                            checked={paymentType === "full"}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="mr-3"
                          />
                          <span className="font-medium">Pay Full Amount</span>
                          <p className="text-sm text-gray-600 ml-6">
                            Complete payment now
                          </p>
                        </div>
                        <span className="font-bold text-green-600">
                          ₹
                          {formData.pricing.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </label>
                    </div>

                    {/* Payment Button */}
                    <button
                      onClick={handleRazorpayPayment}
                      disabled={isCreatingOrder || isVerifying}
                      className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                    >
                      {isCreatingOrder || isVerifying
                        ? "Processing..."
                        : `Pay ₹${
                            paymentType === "advance"
                              ? formData.pricing.advanceAmount.toLocaleString(
                                  "en-IN",
                                )
                              : formData.pricing.totalAmount.toLocaleString(
                                  "en-IN",
                                )
                          }`}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      Secure payment powered by Razorpay
                    </p>
                  </div>

                  {/* Skip Payment Option */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        toast.success(
                          "Booking saved! You can complete payment later.",
                        );
                        resetForm();
                        onClose();
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                      Skip for now, I'll pay later
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Booking Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-xl shadow border border-gray-200 sticky top-4">
                <h2 className="flex items-center gap-2 font-semibold text-lg mb-4 border-b pb-2">
                  <FaCalendar className="text-red-500" />
                  BOOKING SUMMARY
                </h2>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800">
                    {tourData?.title}
                  </p>
                  <p className="text-xs text-gray-600">{tourData?.subtitle}</p>
                </div>

                {formData.selectedDeparture && (
                  <>
                    <div className="mb-2 flex justify-between text-sm text-gray-700">
                      <span>Dept. city</span>
                      <span className="font-medium">
                        {formData.selectedDeparture.departureCity}
                      </span>
                    </div>

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
                  </>
                )}

                <div className="mb-2 flex justify-between text-sm text-gray-700">
                  <span>Package Type</span>
                  <span className="font-medium">{formData.packageType}</span>
                </div>

                <div className="mb-2 flex justify-between text-sm text-gray-700">
                  <span>Travelers</span>
                  <span>
                    {formData.travelerCount.adults} Adult(s) |{" "}
                    {formData.travelerCount.children} Child |{" "}
                    {formData.travelerCount.infants} Infant
                  </span>
                </div>

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
                    <span className="text-gray-700">Advance (50%)</span>
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

                {currentStep >= 3 && formData.travelers.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-2">Travelers:</h4>
                    <div className="space-y-1">
                      {formData.travelers.map((traveler, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-600 flex items-center gap-2"
                        >
                          {isTravelerFormFilled(traveler) && (
                            <FaCheckCircle className="text-green-500 flex-shrink-0" />
                          )}
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

                {/* Show booking ID in payment step */}
                {currentStep === 5 && bookingData && (
                  <div className="border-t pt-4 mt-4">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Booking ID</p>
                      <p className="font-semibold text-green-700">
                        {bookingData.data.booking.bookingId}
                      </p>
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
            disabled={currentStep === 1 || currentStep === 5}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1 || currentStep === 5
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Back
          </button>

          {currentStep < 4 && (
            <button
              onClick={handleNext}
              className="py-2 w-50 bg-red-700 rounded-lg font-medium hover:bg-red-500 text-white transition cursor-pointer px-6"
            >
              Next
            </button>
          )}

          {currentStep === 4 && (
            <button
              onClick={handleConfirmAndPay}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading
                ? "Creating Booking..."
                : "Confirm & Proceed to Payment"}
            </button>
          )}

          {currentStep === 5 && (
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingStepperModal;
