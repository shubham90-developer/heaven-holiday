"use client";

import React, { useState } from "react";
import {
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useGetAllPendingRefundsQuery,
  useUpdateRefundStatusMutation,
} from "@/app/redux/api/bookingsApi/bookingApi";
import { Tabs, Tab } from "react-bootstrap";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Row, Col, Alert, Modal, Button, Form } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

type ModalType = "view" | "refund" | null;
type AlertType = {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
};

const BookingEnquiriesPage: React.FC = () => {
  const { data: bookingsData, isLoading } = useGetAllBookingsQuery(undefined);
  const { data: refundsData, isLoading: isLoadingRefunds } =
    useGetAllPendingRefundsQuery({ status: "Pending" });
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateRefundStatus, { isLoading: isUpdatingRefund }] =
    useUpdateRefundStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const allBookings = bookingsData?.data?.bookings || [];
  const pendingRefunds = refundsData?.data?.refunds || [];

  const bookings = allBookings.filter((booking: any) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      booking.bookingId?.toLowerCase().includes(search) ||
      booking.bookingStatus?.toLowerCase().includes(search) ||
      booking.paymentStatus?.toLowerCase().includes(search) ||
      booking.leadTraveler?.name?.toLowerCase().includes(search) ||
      booking.leadTraveler?.email?.toLowerCase().includes(search) ||
      booking.leadTraveler?.phone?.includes(search) ||
      booking.tourPackage?.title?.toLowerCase().includes(search) ||
      booking.selectedDeparture?.departureCity?.toLowerCase().includes(search)
    );
  });

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    variant: "success",
  });

  // Refund form state
  const [refundStatus, setRefundStatus] = useState<
    "Approved" | "Rejected" | "Completed"
  >("Approved");
  const [refundRemarks, setRefundRemarks] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const cancelledBookings = bookings.filter(
    (booking: any) => booking.bookingStatus === "Cancelled",
  );

  const showAlert = (message: string, variant: AlertType["variant"]) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "success" });
    }, 5000);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedBooking(null);
    setSelectedRefund(null);
    setRefundStatus("Approved");
    setRefundRemarks("");
    setTransactionId("");
  };

  const handleOpenViewModal = (booking: any) => {
    setSelectedBooking(booking);
    setModalType("view");
  };

  const handleOpenRefundModal = (refund: any) => {
    setSelectedRefund(refund);
    setModalType("refund");
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

  const handleUpdateRefund = async () => {
    if (!selectedRefund) return;

    try {
      const payload: any = {
        status: refundStatus,
        remarks: refundRemarks || undefined,
      };

      if (transactionId) {
        payload.transactionId = transactionId;
      }

      await updateRefundStatus({
        bookingId: selectedRefund.bookingId,
        refundId: selectedRefund.refundId,
        ...payload,
      }).unwrap();

      showAlert(
        `Refund ${refundStatus.toLowerCase()} successfully!`,
        "success",
      );
      handleCloseModal();
    } catch (err: any) {
      showAlert(
        err?.data?.message || "Failed to update refund status.",
        "danger",
      );
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

  const getRefundStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      Pending: "bg-warning",
      Approved: "bg-info",
      Completed: "bg-success",
      Rejected: "bg-danger",
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

  const formatDateTime = (date: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const renderBookingsTable = (data: any[], tabName: string) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-5">
          <IconifyIcon
            icon="solar:inbox-bold-duotone"
            className="fs-1 text-muted mb-3"
          />
          <p className="text-muted mb-3">
            {tabName === "all" && "No bookings found!"}
            {tabName === "cancelled" && "No cancelled bookings found!"}
          </p>
        </div>
      );
    }

    return (
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
            {data.map((booking: any, index: number) => (
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
                <td>{booking.selectedDeparture?.departureCity || "N/A"}</td>
                <td>{formatDate(booking.selectedDeparture?.departureDate)}</td>
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
    );
  };

  const renderRefundsTable = () => {
    if (isLoadingRefunds) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading refunds...</span>
          </div>
        </div>
      );
    }

    if (pendingRefunds.length === 0) {
      return (
        <div className="text-center py-5">
          <IconifyIcon
            icon="solar:inbox-bold-duotone"
            className="fs-1 text-muted mb-3"
          />
          <p className="text-muted mb-3">No pending refunds found!</p>
        </div>
      );
    }

    return (
      <div className="table-responsive-sm">
        <table className="table table-striped-columns mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Refund ID</th>
              <th>Booking ID</th>
              <th>User</th>
              <th>Tour</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Requested On</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRefunds.map((refund: any, index: number) => (
              <tr key={refund.refundId || index}>
                <td>{index + 1}</td>
                <td>
                  <strong>{refund.refundId}</strong>
                </td>
                <td>{refund.bookingId}</td>
                <td>
                  {refund.user?.name || "N/A"}
                  {refund.user?.email && <br />}
                  <small className="text-muted">
                    {refund.user?.email || ""}
                  </small>
                  {refund.user?.phone && <br />}
                  <small className="text-muted">
                    {refund.user?.phone || ""}
                  </small>
                </td>
                <td>{refund.tourName || "N/A"}</td>
                <td>{formatPrice(refund.amount)}</td>
                <td>
                  <span
                    className={`badge ${getRefundStatusBadge(refund.status)}`}
                  >
                    {refund.status}
                  </span>
                </td>
                <td>
                  <small>{refund.reason || "N/A"}</small>
                </td>
                <td>{formatDateTime(refund.requestedDate)}</td>
                <td className="text-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenRefundModal(refund);
                    }}
                    className="link-reset fs-20 p-1"
                    title="Process Refund"
                  >
                    <IconifyIcon icon="tabler:edit" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Booking ID, Name, Email, Phone, Tour, Status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k || "all")}
              className="mb-3"
            >
              {/* ALL BOOKINGS TAB */}
              <Tab eventKey="all" title="All Bookings">
                {renderBookingsTable(bookings, "all")}
              </Tab>

              {/* CANCELLED BOOKINGS TAB */}
              <Tab eventKey="cancelled" title="Cancelled">
                {renderBookingsTable(cancelledBookings, "cancelled")}
              </Tab>

              {/* PENDING REFUNDS TAB */}
              <Tab
                eventKey="pending-refunds"
                title={`Pending Refunds ${pendingRefunds.length > 0 ? `(${pendingRefunds.length})` : ""}`}
              >
                {renderRefundsTable()}
              </Tab>
            </Tabs>
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
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Refund Processing Modal */}
      <Modal
        show={modalType === "refund"}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Process Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRefund && (
            <div className="row g-3">
              {/* Refund Details */}
              <div className="col-md-6">
                <strong>Refund ID:</strong>
                <p className="mb-0">{selectedRefund.refundId}</p>
              </div>
              <div className="col-md-6">
                <strong>Booking ID:</strong>
                <p className="mb-0">{selectedRefund.bookingId}</p>
              </div>

              <div className="col-md-6">
                <strong>User:</strong>
                <p className="mb-0">{selectedRefund.user?.name || "N/A"}</p>
                <small className="text-muted">
                  {selectedRefund.user?.email || ""}
                </small>
              </div>
              <div className="col-md-6">
                <strong>Tour:</strong>
                <p className="mb-0">{selectedRefund.tourName || "N/A"}</p>
              </div>

              <div className="col-md-6">
                <strong>Refund Amount:</strong>
                <p className="mb-0 fs-5 text-primary">
                  {formatPrice(selectedRefund.amount)}
                </p>
              </div>
              <div className="col-md-6">
                <strong>Current Status:</strong>
                <p className="mb-0">
                  <span
                    className={`badge ${getRefundStatusBadge(selectedRefund.status)}`}
                  >
                    {selectedRefund.status}
                  </span>
                </p>
              </div>

              <div className="col-12">
                <strong>Reason:</strong>
                <p className="mb-0">{selectedRefund.reason || "N/A"}</p>
              </div>

              <div className="col-md-6">
                <strong>Payment ID:</strong>
                <p className="mb-0">
                  <small className="text-muted">
                    {selectedRefund.paymentId || "N/A"}
                  </small>
                </p>
              </div>
              <div className="col-md-6">
                <strong>Requested On:</strong>
                <p className="mb-0">
                  {formatDateTime(selectedRefund.requestedDate)}
                </p>
              </div>

              {/* Action Form */}
              <div className="col-12">
                <hr />
                <strong>Update Refund Status</strong>
              </div>

              <div className="col-12">
                <Form.Group>
                  <Form.Label>Status *</Form.Label>
                  <Form.Select
                    value={refundStatus}
                    onChange={(e) => setRefundStatus(e.target.value as any)}
                  >
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateRefund}
            disabled={isUpdatingRefund}
          >
            {isUpdatingRefund ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Processing...
              </>
            ) : (
              "Update Refund"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookingEnquiriesPage;
