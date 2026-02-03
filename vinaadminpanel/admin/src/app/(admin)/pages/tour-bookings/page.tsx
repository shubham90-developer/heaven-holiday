"use client";

import React, { useState } from "react";
import {
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
} from "@/app/redux/api/bookingsApi/bookingApi";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Row, Col, Alert, Modal, Button } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

type ModalType = "view" | null;
type AlertType = {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
};

const BookingEnquiriesPage: React.FC = () => {
  const { data: bookingsData, isLoading } = useGetAllBookingsQuery(undefined);
  const [deleteBooking] = useDeleteBookingMutation();

  const bookings = bookingsData?.data?.bookings || [];

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    variant: "success",
  });

  const showAlert = (message: string, variant: AlertType["variant"]) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "success" });
    }, 5000);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedBooking(null);
  };

  const handleOpenViewModal = (booking: any) => {
    setSelectedBooking(booking);
    setModalType("view");
  };

  const handleDelete = async (id: string, bookingId: string) => {
    if (!confirm(`Are you sure you want to delete booking "${bookingId}"?`))
      return;

    try {
      await deleteBooking(id).unwrap();
      showAlert("Booking deleted successfully!", "success");
    } catch (err: any) {
      showAlert(err?.data?.message || "Failed to delete booking.", "danger");
    }
  };

  const getBookingStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      Pending: "bg-warning",
      Confirmed: "bg-success",
      Completed: "bg-info",
      Cancelled: "bg-danger",
    };
    return statusColors[status] || "bg-secondary";
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      Pending: "bg-warning",
      "Advance Paid": "bg-info",
      "Fully Paid": "bg-success",
    };
    return statusColors[status] || "bg-secondary";
  };

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price: number | undefined) => {
    return `₹${price?.toLocaleString("en-IN") || "0"}`;
  };

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <PageTitle title="Booking Enquiries" subTitle="Content Management" />

          {alert.show && (
            <Alert
              variant={alert.variant}
              dismissible
              onClose={() => setAlert({ ...alert, show: false })}
              className="d-flex align-items-center mb-3"
            >
              <IconifyIcon
                icon={
                  alert.variant === "success"
                    ? "solar:check-read-line-duotone"
                    : alert.variant === "danger"
                      ? "solar:danger-triangle-bold-duotone"
                      : alert.variant === "warning"
                        ? "solar:shield-warning-line-duotone"
                        : "solar:info-circle-bold-duotone"
                }
                className="fs-20 me-2"
              />
              <div className="lh-1">{alert.message}</div>
            </Alert>
          )}

          <ComponentContainerCard
            title="All Bookings"
            description="View and manage all user bookings."
          >
            {bookings.length > 0 ? (
              <div className="table-responsive-sm">
                <table className="table table-striped-columns mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Booking ID</th>
                      <th>Tour</th>
                      <th>Lead Traveler</th>
                      <th>Dept. City</th>
                      <th>Dept. Date</th>
                      <th>Travelers</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                      <th>Booking Status</th>
                      <th>Booked On</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: any, index: number) => (
                      <tr key={booking._id || index}>
                        <td>{index + 1}</td>
                        <td>
                          <strong>{booking.bookingId}</strong>
                        </td>
                        <td>{booking.tourPackage?.title || "N/A"}</td>
                        <td>
                          {booking.leadTraveler?.name || "N/A"}
                          {booking.leadTraveler?.email && <br />}
                          <small className="text-muted">
                            {booking.leadTraveler?.email || ""}
                          </small>
                          {booking.leadTraveler?.phone && <br />}
                          <small className="text-muted">
                            {booking.leadTraveler?.phone || ""}
                          </small>
                        </td>
                        <td>
                          {booking.selectedDeparture?.departureCity || "N/A"}
                        </td>
                        <td>
                          {formatDate(booking.selectedDeparture?.departureDate)}
                        </td>
                        <td>
                          {booking.travelerCount?.adults || 0}A{" "}
                          {booking.travelerCount?.children || 0}C{" "}
                          {booking.travelerCount?.infants || 0}I
                        </td>
                        <td>{formatPrice(booking.pricing?.totalAmount)}</td>
                        <td>
                          <span
                            className={`badge ${getPaymentStatusBadge(booking.paymentStatus)}`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${getBookingStatusBadge(booking.bookingStatus)}`}
                          >
                            {booking.bookingStatus}
                          </span>
                        </td>
                        <td>{formatDate(booking.bookingDate)}</td>
                        <td className="text-center">
                          {/* View */}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenViewModal(booking);
                            }}
                            className="link-reset fs-20 p-1"
                            title="View Details"
                          >
                            <IconifyIcon icon="tabler:eye" />
                          </a>
                          {/* Delete */}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(booking._id, booking.bookingId);
                            }}
                            className="link-reset fs-20 p-1"
                            title="Delete Booking"
                          >
                            <IconifyIcon icon="tabler:trash" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <IconifyIcon
                  icon="solar:inbox-bold-duotone"
                  className="fs-1 text-muted mb-3"
                />
                <p className="text-muted mb-3">No bookings found!</p>
              </div>
            )}
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* View Details Modal */}
      <Modal
        show={modalType === "view"}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <div className="row g-3">
              {/* Booking Info */}
              <div className="col-md-6">
                <strong>Booking ID:</strong>
                <p className="mb-0">{selectedBooking.bookingId}</p>
              </div>
              <div className="col-md-6">
                <strong>Tour Package:</strong>
                <p className="mb-0">
                  {selectedBooking.tourPackage?.title || "N/A"}
                </p>
              </div>

              {/* Lead Traveler */}
              <div className="col-12">
                <hr />
                <strong>Lead Traveler</strong>
              </div>
              <div className="col-md-4">
                <strong>Name:</strong>
                <p className="mb-0">
                  {selectedBooking.leadTraveler?.name || "N/A"}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Email:</strong>
                <p className="mb-0">
                  {selectedBooking.leadTraveler?.email || "N/A"}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Phone:</strong>
                <p className="mb-0">
                  {selectedBooking.leadTraveler?.phone || "N/A"}
                </p>
              </div>

              {/* Departure */}
              <div className="col-12">
                <hr />
                <strong>Departure Details</strong>
              </div>
              <div className="col-md-4">
                <strong>City:</strong>
                <p className="mb-0">
                  {selectedBooking.selectedDeparture?.departureCity || "N/A"}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Date:</strong>
                <p className="mb-0">
                  {formatDate(selectedBooking.selectedDeparture?.departureDate)}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Package Type:</strong>
                <p className="mb-0">
                  {selectedBooking.selectedDeparture?.packageType || "N/A"}
                </p>
              </div>

              {/* Travelers List */}
              <div className="col-12">
                <hr />
                <strong>
                  Travelers ({selectedBooking.travelerCount?.total})
                </strong>
              </div>
              <div className="col-12">
                <table className="table table-sm table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>DOB</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Lead</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBooking.travelers?.map(
                      (traveler: any, i: number) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            {traveler.title} {traveler.firstName}{" "}
                            {traveler.lastName}
                          </td>
                          <td>{traveler.type}</td>
                          <td>{formatDate(traveler.dateOfBirth)}</td>
                          <td>{traveler.age}</td>
                          <td>{traveler.gender}</td>
                          <td>{traveler.email || "—"}</td>
                          <td>{traveler.phone || "—"}</td>
                          <td>
                            {traveler.isLeadTraveler ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pricing */}
              <div className="col-12">
                <hr />
                <strong>Pricing</strong>
              </div>
              <div className="col-md-4">
                <strong>Total Amount:</strong>
                <p className="mb-0">
                  {formatPrice(selectedBooking.pricing?.totalAmount)}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Advance Amount:</strong>
                <p className="mb-0">
                  {formatPrice(selectedBooking.pricing?.advanceAmount)}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Price Per Person:</strong>
                <p className="mb-0">
                  {formatPrice(selectedBooking.pricing?.pricePerPerson)}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Paid Amount:</strong>
                <p className="mb-0">
                  {formatPrice(selectedBooking.pricing?.paidAmount)}
                </p>
              </div>
              <div className="col-md-4">
                <strong>Pending Amount:</strong>
                <p className="mb-0">
                  {formatPrice(selectedBooking.pricing?.pendingAmount)}
                </p>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <strong>Booking Status:</strong>
                <p className="mb-0">
                  <span
                    className={`badge ${getBookingStatusBadge(selectedBooking.bookingStatus)}`}
                  >
                    {selectedBooking.bookingStatus}
                  </span>
                </p>
              </div>
              <div className="col-md-6">
                <strong>Payment Status:</strong>
                <p className="mb-0">
                  <span
                    className={`badge ${getPaymentStatusBadge(selectedBooking.paymentStatus)}`}
                  >
                    {selectedBooking.paymentStatus}
                  </span>
                </p>
              </div>

              {/* Dates */}
              <div className="col-md-6">
                <strong>Booked On:</strong>
                <p className="mb-0">
                  {new Date(selectedBooking.bookingDate).toLocaleString()}
                </p>
              </div>
              <div className="col-md-6">
                <strong>Balance Due Date:</strong>
                <p className="mb-0">
                  {formatDate(selectedBooking.balancePaymentDueDate)}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookingEnquiriesPage;
