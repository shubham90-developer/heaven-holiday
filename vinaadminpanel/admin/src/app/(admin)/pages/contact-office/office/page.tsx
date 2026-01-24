"use client";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  useGetAllOfficesQuery,
  useCreateOfficeMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
} from "@/app/redux/api/contactOffice/contactOfficeApi";

import Link from "next/link";

type AlertType = {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
};

const quillModules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    [{ header: [false, 1, 2, 3, 4, 5, 6] }, "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["direction", { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const OfficesPage = () => {
  // --- Data fetching & mutations ---
  const { data, isLoading, isError } = useGetAllOfficesQuery(undefined);
  const [createOffice, { isLoading: isCreating }] = useCreateOfficeMutation();
  const [updateOffice, { isLoading: isUpdating }] = useUpdateOfficeMutation();
  const [deleteOffice] = useDeleteOfficeMutation();

  const offices = data?.data || [];

  // --- State ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Office state
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active");
  const [forex, setForex] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState<string | null>(null);

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
    setShowModal(false);
    setIsEditMode(false);
    setCity("");
    setAddress("");
    setPhone("");
    setStatus("active");
    setForex(false);
    setEditingOfficeId(null);
  };

  // --- Office Modal Handlers ---
  const handleOpenModal = (editMode: boolean, office?: any) => {
    setIsEditMode(editMode);
    if (editMode && office) {
      setCity(office.city);
      setAddress(office.address);
      setPhone(office.phone);
      setStatus(office.status || "active");
      setForex(office.forex === true);
      setEditingOfficeId(office._id);
    } else {
      setCity("");
      setAddress("");
      setPhone("");
      setStatus("active");
      setForex(false);
      setEditingOfficeId(null);
    }
    setShowModal(true);
  };

  const handleOfficeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city || !address || !phone) {
      showAlert("Please fill all required fields!", "warning");
      return;
    }

    try {
      const payload = {
        city,
        address,
        phone,
        status,
        forex,
      };

      if (isEditMode && editingOfficeId) {
        await updateOffice({ id: editingOfficeId, ...payload }).unwrap();
        showAlert("Office updated successfully!", "success");
      } else {
        await createOffice(payload).unwrap();
        showAlert("Office added successfully!", "success");
      }
      handleCloseModal();
    } catch (err: any) {
      showAlert(
        err?.data?.message || `${isEditMode ? "Update" : "Creation"} failed!`,
        "danger",
      );
    }
  };

  const handleDeleteOffice = async (officeId: string) => {
    if (!confirm("Are you sure you want to delete this office?")) return;
    try {
      await deleteOffice(officeId).unwrap();
      showAlert("Office deleted successfully!", "success");
    } catch (err: any) {
      showAlert(err?.data?.message || "Delete failed!", "danger");
    }
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

  if (isError) {
    return (
      <div className="container mt-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <IconifyIcon
            icon="solar:danger-triangle-bold-duotone"
            className="fs-20 me-2"
          />
          <div>
            <strong>Error!</strong> Failed to load offices. Please try again
            later.
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <PageTitle title="Offices Management" subTitle="Content Management" />

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
            title="Offices"
            description="Manage your office locations and details."
          >
            <div className="mb-3">
              <Button onClick={() => handleOpenModal(false)}>
                <IconifyIcon icon="tabler:plus" className="me-1" />
                Add Office
              </Button>
            </div>

            <div className="table-responsive-sm">
              <table className="table table-striped-columns mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Forex</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <p className="text-muted mb-0">No offices found!</p>
                      </td>
                    </tr>
                  ) : (
                    offices.map((office: any, index: number) => (
                      <tr key={office._id || index}>
                        <td>{index + 1}</td>
                        <td>{office.city}</td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: office.address,
                            }}
                            style={{
                              maxWidth: "300px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          />
                        </td>
                        <td>{office.phone}</td>
                        <td>
                          <span
                            className={`badge ${
                              office.forex ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {office.forex ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              office.status === "Active" ||
                              office.status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {office.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenModal(true, office);
                            }}
                            className="link-reset fs-20 p-1"
                          >
                            <IconifyIcon icon="tabler:pencil" />
                          </Link>
                          <Link
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteOffice(office._id);
                            }}
                            className="link-reset fs-20 p-1"
                          >
                            <IconifyIcon icon="tabler:trash" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </ComponentContainerCard>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Office" : "Add Office"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOfficeSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <div style={{ height: "250px" }}>
                <ReactQuill
                  theme="snow"
                  value={address}
                  onChange={setAddress}
                  modules={quillModules}
                  placeholder="Enter office address..."
                  style={{ height: "200px", marginBottom: "50px" }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number (e.g., +1234567890 or 1234567890)"
                required
              />
              <Form.Text className="text-muted">
                Enter numbers only, optionally starting with +
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status *</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Forex Available"
                checked={forex}
                onChange={(e) => setForex(e.target.checked)}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isCreating || isUpdating}
              >
                {(isCreating || isUpdating) && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {isEditMode ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OfficesPage;
