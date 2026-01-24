"use client";

import React, { useState, useEffect } from "react";
import {
  useGetTourPackageQuery,
  useUpdateTitleSubtitleMutation,
  useAddPackageCardMutation,
  useUpdatePackageCardMutation,
  useDeletePackageCardMutation,
} from "@/app/redux/api/tourManager/tourPackageApi";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Row, Col, Alert, Form, Button, Modal, Card } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { FileUploader } from "@/components/FileUploader";
import Link from "next/link";
import ReactQuill from "react-quill-new";

// styles
import "react-quill-new/dist/quill.snow.css";

type ModalType = "create" | "edit" | "titleSubtitle" | null;
type AlertType = {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
};

const TourPackagePage: React.FC = () => {
  const { data: tourPackageData, isLoading } =
    useGetTourPackageQuery(undefined);
  const [updateTitleSubtitle, { isLoading: isUpdatingTitle }] =
    useUpdateTitleSubtitleMutation();
  const [addPackageCard, { isLoading: isCreating }] =
    useAddPackageCardMutation();
  const [updatePackageCard, { isLoading: isUpdating }] =
    useUpdatePackageCardMutation();
  const [deletePackageCard] = useDeletePackageCardMutation();

  const packages = tourPackageData?.data?.packages || [];
  const currentTitle = tourPackageData?.data?.title || "";
  const currentSubtitle = tourPackageData?.data?.subtitle || "";

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  // Form state for package cards
  const [formData, setFormData] = useState({
    city: "",
    tours: 0,
    departures: 0,
    price: "",
    badge: "",
    status: "Active",
    order: 0,
    link: "/tour-details",
    cities: [] as string[],
    days: 1,
    startOn: "",
    joinPrice: "",
  });

  // Form state for title/subtitle
  const [titleSubtitleData, setTitleSubtitleData] = useState({
    title: "",
    subtitle: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [cityInput, setCityInput] = useState("");

  const [alert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    variant: "success",
  });

  // Quill editor modules
  const modules = {
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

  useEffect(() => {
    if (currentTitle || currentSubtitle) {
      setTitleSubtitleData({
        title: currentTitle,
        subtitle: currentSubtitle,
      });
    }
  }, [currentTitle, currentSubtitle]);

  const showAlert = (message: string, variant: AlertType["variant"]) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "success" });
    }, 5000);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingPackageId(null);
    setFormData({
      city: "",
      tours: 0,
      departures: 0,
      price: "",
      badge: "",
      status: "Active",
      order: 0,
      link: "/tour-details",
      cities: [],
      days: 1,
      startOn: "",
      joinPrice: "",
    });
    setImageFile(null);
    setImagePreview("");
    setCityInput("");
  };

  const handleOpenCreateModal = () => {
    handleCloseModal();
    setModalType("create");
  };

  const handleOpenEditModal = (packageCard: any) => {
    setFormData({
      city: packageCard.city,
      tours: packageCard.tours,
      departures: packageCard.departures,
      price: packageCard.price,
      badge: packageCard.badge || "",
      status: packageCard.status,
      order: packageCard.order,
      link: packageCard.link || "/tour-details",
      cities: packageCard.cities || [],
      days: packageCard.days || 1,
      startOn: packageCard.startOn
        ? new Date(packageCard.startOn).toISOString().split("T")[0]
        : "",
      joinPrice: packageCard.joinPrice || "",
    });
    setImagePreview(packageCard.image);
    setEditingPackageId(packageCard._id);
    setModalType("edit");
  };

  const handleOpenTitleSubtitleModal = () => {
    setTitleSubtitleData({
      title: currentTitle,
      subtitle: currentSubtitle,
    });
    setModalType("titleSubtitle");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCity = () => {
    if (cityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        cities: [...prev.cities, cityInput.trim()],
      }));
      setCityInput("");
    }
  };

  const handleRemoveCity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index),
    }));
  };

  const handleTitleSubtitleChange = (e: any) => {
    const { name, value } = e.target;
    setTitleSubtitleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubtitleChange = (content: string) => {
    setTitleSubtitleData((prev) => ({ ...prev, subtitle: content }));
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
    if (!formData.city.trim()) {
      showAlert("Please enter city name!", "warning");
      return;
    }

    if (modalType === "create" && !imageFile) {
      showAlert("Please upload an image!", "warning");
      return;
    }

    if (formData.cities.length === 0) {
      showAlert("Please add at least one city!", "warning");
      return;
    }

    if (!formData.startOn) {
      showAlert("Please select a start date!", "warning");
      return;
    }

    if (!formData.joinPrice.trim()) {
      showAlert("Please enter join price!", "warning");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("city", formData.city.trim());
      submitData.append("tours", formData.tours.toString());
      submitData.append("departures", formData.departures.toString());
      submitData.append("price", formData.price.trim());
      submitData.append("badge", formData.badge.trim());
      submitData.append("status", formData.status);
      submitData.append("order", formData.order.toString());
      submitData.append("link", formData.link);
      submitData.append("cities", JSON.stringify(formData.cities));
      submitData.append("days", formData.days.toString());
      submitData.append("startOn", formData.startOn);
      submitData.append("joinPrice", formData.joinPrice.trim());

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      if (modalType === "create") {
        await addPackageCard(submitData).unwrap();
        showAlert("Package card created successfully!", "success");
      } else if (modalType === "edit" && editingPackageId) {
        await updatePackageCard({
          packageId: editingPackageId,
          data: submitData,
        }).unwrap();
        showAlert("Package card updated successfully!", "success");
      }

      handleCloseModal();
    } catch (err: any) {
      console.error("Failed to save package card:", err);
      showAlert(
        err?.data?.message || "Failed to save package card. Please try again.",
        "danger",
      );
    }
  };

  const handleTitleSubtitleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!titleSubtitleData.title.trim() && !titleSubtitleData.subtitle.trim()) {
      showAlert("Please enter at least title or subtitle!", "warning");
      return;
    }

    try {
      await updateTitleSubtitle(titleSubtitleData).unwrap();
      showAlert("Title and subtitle updated successfully!", "success");
      setModalType(null);
    } catch (err: any) {
      console.error("Failed to update title/subtitle:", err);
      showAlert(
        err?.data?.message ||
          "Failed to update title/subtitle. Please try again.",
        "danger",
      );
    }
  };

  const handleDelete = async (id: string, city: string) => {
    if (!confirm(`Are you sure you want to delete ${city}?`)) return;

    try {
      await deletePackageCard(id).unwrap();
      showAlert("Package card deleted successfully!", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message || "Failed to delete package card.",
        "danger",
      );
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
          <PageTitle title="Tour Packages" subTitle="Content Management" />

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
            title="Tour Package Settings"
            description="Manage tour package title, subtitle and package cards."
          >
            {/* Title & Subtitle Section */}
            <div className="mb-4 p-3 bg-light rounded">
              <h4>{currentTitle || "No title set"}</h4>
              <div
                className="text-muted mb-0"
                dangerouslySetInnerHTML={{
                  __html: currentSubtitle || "No subtitle set",
                }}
              />

              <div className="d-flex justify-content-end mt-3">
                <Button onClick={handleOpenTitleSubtitleModal}>
                  <IconifyIcon icon="tabler:edit" className="me-1" />
                  Update Title & Subtitle
                </Button>
              </div>
            </div>

            {/* Package Cards Section */}
            {packages.length > 0 ? (
              <>
                <div className="mb-3">
                  <Button onClick={handleOpenCreateModal}>
                    <IconifyIcon icon="tabler:plus" className="me-1" />
                    Add Package Card
                  </Button>
                </div>

                <div className="table-responsive-sm">
                  <table className="table table-striped-columns mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>City</th>
                        <th>Tours</th>
                        <th>Departures</th>
                        <th>Price</th>
                        <th>Badge</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <p className="text-muted mb-0">
                              No package cards found!
                            </p>
                          </td>
                        </tr>
                      ) : (
                        packages.map((pkg: any, index: number) => (
                          <tr key={pkg._id || index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={pkg.image}
                                alt={pkg.city}
                                className="avatar-sm rounded"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{pkg.city}</td>
                            <td>{pkg.tours}</td>
                            <td>{pkg.departures}</td>
                            <td>{pkg.price}</td>
                            <td>
                              {pkg.badge ? (
                                <span className="badge bg-warning text-dark">
                                  {pkg.badge}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  pkg.status === "Active"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {pkg.status}
                              </span>
                            </td>
                            <td>{pkg.order}</td>
                            <td className="text-center">
                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOpenEditModal(pkg);
                                }}
                                className="link-reset fs-20 p-1"
                              >
                                <IconifyIcon icon="tabler:pencil" />
                              </Link>
                              <Link
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(pkg._id, pkg.city);
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
                <p className="text-muted mb-3">No package cards found!</p>
                <Button onClick={handleOpenCreateModal}>
                  <IconifyIcon icon="tabler:plus" className="me-1" />
                  Add Package Card
                </Button>
              </div>
            )}
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Title/Subtitle Modal */}
      <Modal
        show={modalType === "titleSubtitle"}
        onHide={() => setModalType(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Title & Subtitle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTitleSubtitleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={titleSubtitleData.title}
                onChange={handleTitleSubtitleChange}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <div style={{ height: "250px" }}>
                <ReactQuill
                  modules={modules}
                  value={titleSubtitleData.subtitle}
                  onChange={handleSubtitleChange}
                  theme="snow"
                  placeholder="Enter subtitle..."
                  style={{ height: "200px" }}
                />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => setModalType(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isUpdatingTitle}
              >
                {isUpdatingTitle ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Create/Edit Package Card Modal */}
      <Modal
        show={modalType === "create" || modalType === "edit"}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "create" ? "Add Package Card" : "Edit Package Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹32,000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Join Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="joinPrice"
                    value={formData.joinPrice}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹28,000"
                    required
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
                    placeholder="/tour-details"
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
                  <Form.Label>
                    Days <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    placeholder="Number of days"
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Start Date <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="startOn"
                    value={formData.startOn}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Cities <span className="text-danger">*</span>
              </Form.Label>
              <div className="gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Enter city name"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCity();
                    }
                  }}
                />
                <Button
                  className="mt-2"
                  variant="primary"
                  onClick={handleAddCity}
                  type="button"
                >
                  <IconifyIcon icon="tabler:plus" className="me-1" />
                  Add City
                </Button>
              </div>
              {formData.cities.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.cities.map((city, index) => (
                    <div
                      key={index}
                      className="badge bg-secondary d-flex align-items-center gap-2"
                      style={{ fontSize: "14px", padding: "8px 12px" }}
                    >
                      <span>{city}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCity(index)}
                        className="btn-close btn-close-white"
                        style={{ fontSize: "10px" }}
                        aria-label="Remove"
                      ></button>
                    </div>
                  ))}
                </div>
              )}
              {formData.cities.length === 0 && (
                <Form.Text className="text-muted">
                  No cities added yet. Add at least one city.
                </Form.Text>
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Badge (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g., Special Offer"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="Display order"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Status <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

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

export default TourPackagePage;
