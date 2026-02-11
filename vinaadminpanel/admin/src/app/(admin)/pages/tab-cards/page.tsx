"use client";

import React, { useState, useEffect } from "react";
import {
  useGetAllTabCardsQuery,
  useCreateTabCardMutation,
  useUpdateTabCardMutation,
  useDeleteTabCardMutation,
} from "@/app/redux/api/tabcards/tabcardsApi";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Row, Col, Alert, Form, Button, Modal, Card } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { FileUploader } from "@/components/FileUploader";
import Link from "next/link";

type ModalType = "create" | "edit" | null;
type AlertType = {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
};

const TabCardsPage: React.FC = () => {
  const { data: tabCardsData, isLoading } = useGetAllTabCardsQuery(undefined);
  const [createTabCard, { isLoading: isCreating }] = useCreateTabCardMutation();
  const [updateTabCard, { isLoading: isUpdating }] = useUpdateTabCardMutation();
  const [deleteTabCard] = useDeleteTabCardMutation();

  const cards = tabCardsData?.data?.cards || [];

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // Form state for cards
  const [formData, setFormData] = useState({
    title: "",
    tours: 0,
    departures: 0,
    guests: "",
    badge: "",
    link: "/tour-list",
    category: "world",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

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
    setEditingCardId(null);
    setFormData({
      title: "",
      tours: 0,
      departures: 0,
      guests: "",
      badge: "",
      link: "/tour-list",
      category: "world",
      isActive: true,
    });
    setImageFile(null);
    setImagePreview("");
  };

  const handleOpenCreateModal = () => {
    handleCloseModal();
    setModalType("create");
  };

  const handleOpenEditModal = (card: any) => {
    setFormData({
      title: card.title,
      tours: card.tours,
      departures: card.departures,
      guests: card.guests,
      badge: card.badge || "",
      link: card.link,
      category: card.category,
      isActive: card.isActive,
    });
    setImagePreview(card.image);
    setEditingCardId(card._id);
    setModalType("edit");
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert("Image size should not exceed 5MB!", "warning");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showAlert("Please upload a valid image file!", "warning");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      showAlert("Please enter title!", "warning");
      return;
    }

    if (modalType === "create" && !imageFile) {
      showAlert("Please upload an image!", "warning");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title.trim());
      submitData.append("tours", formData.tours.toString());
      submitData.append("departures", formData.departures.toString());
      submitData.append("guests", formData.guests.trim());
      submitData.append("badge", formData.badge.trim());
      submitData.append("link", formData.link.trim());
      submitData.append("category", formData.category);
      submitData.append("isActive", formData.isActive.toString());

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      if (modalType === "create") {
        await createTabCard(submitData).unwrap();
        showAlert("Tab card created successfully!", "success");
      } else if (modalType === "edit" && editingCardId) {
        submitData.append("cardId", editingCardId);
        await updateTabCard(submitData).unwrap();
        showAlert("Tab card updated successfully!", "success");
      }

      handleCloseModal();
    } catch (err: any) {
      console.error("Failed to save tab card:", err);
      showAlert(
        err?.data?.message || "Failed to save tab card. Please try again.",
        "danger"
      );
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete ${title}?`)) return;

    try {
      await deleteTabCard({ cardId: id }).unwrap();
      showAlert("Tab card deleted successfully!", "success");
    } catch (err: any) {
      showAlert(err?.data?.message || "Failed to delete tab card.", "danger");
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

  return (
    <>
      <Row>
        <Col xs={12}>
          <PageTitle title="Tab Cards" subTitle="Content Management" />

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
            title="Tab Cards Settings"
            description="Manage tab cards for World and India destinations."
          >
            {/* Cards Section */}
            {cards.length > 0 ? (
              <>
                <div className="mb-3">
                  <Button onClick={handleOpenCreateModal}>
                    <IconifyIcon icon="tabler:plus" className="me-1" />
                    Add Tab Card
                  </Button>
                </div>

                <div className="table-responsive-sm">
                  <table className="table table-striped-columns mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Tours</th>
                        <th>Departures</th>
                        <th>Guests</th>
                        <th>Badge</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cards.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <p className="text-muted mb-0">No cards found!</p>
                          </td>
                        </tr>
                      ) : (
                        cards.map((card: any, index: number) => (
                          <tr key={card._id || index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={card.image}
                                alt={card.title}
                                className="avatar-sm rounded"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{card.title}</td>
                            <td>{card.tours}</td>
                            <td>{card.departures}</td>
                            <td>{card.guests}</td>
                            <td>
                              {card.badge ? (
                                <span className="badge bg-warning text-dark">
                                  {card.badge}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">
                                {card.category}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  card.isActive ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {card.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="text-center">
                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOpenEditModal(card);
                                }}
                                className="link-reset fs-20 p-1"
                              >
                                <IconifyIcon icon="tabler:pencil" />
                              </Link>
                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(card._id, card.title);
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
              </>
            ) : (
              <div className="text-center py-5">
                <IconifyIcon
                  icon="solar:box-bold-duotone"
                  className="fs-1 text-muted mb-3"
                />
                <p className="text-muted mb-3">No tab cards found!</p>
                <Button onClick={handleOpenCreateModal}>
                  <IconifyIcon icon="tabler:plus" className="me-1" />
                  Add Tab Card
                </Button>
              </div>
            )}
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Create/Edit Card Modal */}
      <Modal
        show={modalType === "create" || modalType === "edit"}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "create" ? "Add Tab Card" : "Edit Tab Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Guests <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="e.g., 1,00,286"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tours <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="tours"
                    value={formData.tours}
                    onChange={handleInputChange}
                    placeholder="Number of tours"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Departures <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="departures"
                    value={formData.departures}
                    onChange={handleInputChange}
                    placeholder="Number of departures"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Badge (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g., Bestseller"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Link <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="/tour-list"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="world">World</option>
                    <option value="india">India</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Image{" "}
                {modalType === "create" && (
                  <span className="text-danger">*</span>
                )}
              </Form.Label>

              {!imagePreview ? (
                <FileUploader
                  onFileUpload={handleImageChange}
                  icon="ri:upload-cloud-2-line"
                  text="Drop image here or click to upload."
                  extraText="(Maximum file size: 5MB. Supported formats: JPG, PNG, WebP)"
                />
              ) : (
                <Card className="mt-1 mb-0 shadow-none border">
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <img
                          src={imagePreview}
                          className="avatar-sm rounded bg-light"
                          alt="preview"
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col className="ps-0">
                        <p className="text-muted fw-bold mb-0">
                          {imageFile?.name || "Current Image"}
                        </p>
                        <p className="mb-0 text-muted small">
                          {imageFile
                            ? `${(imageFile.size / 1024).toFixed(2)} KB`
                            : "Uploaded"}
                        </p>
                      </Col>
                      <Col xs="auto">
                        <Link
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setImageFile(null);
                            setImagePreview("");
                          }}
                          className="btn btn-link btn-lg text-muted"
                        >
                          <IconifyIcon icon="tabler:x" />
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Card>
              )}
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
                {isCreating || isUpdating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {modalType === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : (
                  <>{modalType === "create" ? "Create" : "Update"}</>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TabCardsPage;
