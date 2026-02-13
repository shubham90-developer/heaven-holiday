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

const defaultTimings = [
  { day: "Monday", open: "", close: "", closed: false },
  { day: "Tuesday", open: "", close: "", closed: false },
  { day: "Wednesday", open: "", close: "", closed: false },
  { day: "Thursday", open: "", close: "", closed: false },
  { day: "Friday", open: "", close: "", closed: false },
  { day: "Saturday", open: "", close: "", closed: false },
  { day: "Sunday", open: "", close: "", closed: false },
];

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
  // ✅ DATA FETCHING
  const { data, isLoading, isError } = useGetAllOfficesQuery(undefined);
  const [createOffice, { isLoading: isCreating }] = useCreateOfficeMutation();
  const [updateOffice, { isLoading: isUpdating }] = useUpdateOfficeMutation();
  const [deleteOffice] = useDeleteOfficeMutation();

  const offices = data?.data || [];

  // ✅ STATES
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active");
  const [forex, setForex] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState<string | null>(null);

  const [mapUrl, setMapUrl] = useState("");
  const [officeState, setOfficeState] = useState("open");

  const [timings, setTimings] = useState(defaultTimings);

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

  const handleTimingChange = (index: number, field: string, value: any) => {
    const updated = [...timings];
    updated[index] = { ...updated[index], [field]: value };
    setTimings(updated);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCity("");
    setAddress("");
    setPhone("");
    setStatus("active");
    setForex(false);
    setMapUrl("");
    setOfficeState("open");
    setTimings(defaultTimings);
    setEditingOfficeId(null);
  };

  const handleOpenModal = (editMode: boolean, office?: any) => {
    setIsEditMode(editMode);

    if (editMode && office) {
      setCity(office.city);
      setAddress(office.address);
      setPhone(office.phone);
      setStatus(office.status || "active");
      setForex(office.forex === true);
      setMapUrl(office.mapUrl || "");
      setOfficeState(office.officeState || "open");

      // ✅ FIXED HERE
      setTimings(
        office.timings && office.timings.length > 0
          ? office.timings
          : defaultTimings
      );
      setEditingOfficeId(office._id);
    } else {
      handleCloseModal();
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
        mapUrl,
        officeState,
        timings: timings.map(t => ({ ...t })), // ✅ FIXED
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
      showAlert(err?.data?.message || "Operation failed!", "danger");
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

  if (isLoading) return <div className="text-center p-5">Loading...</div>;

  if (isError)
    return <div className="text-center p-5 text-danger">Error loading offices</div>;

  return (
    <>
      <Row>
        <Col xs={12}>
          <PageTitle title="Offices Management" subTitle="Content Management" />

          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

          {/* ✅ YOUR TABLE SECTION (RESTORED) */}
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
                    {/* <th>Forex</th> */}
                    <th>Office state</th>
                    <th>Map URL</th>
                    <th>Forex</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {offices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No offices found!
                      </td>
                    </tr>
                  ) : (
                    offices.map((office: any, index: number) => (
                      <tr key={office._id}>
                        <td>{index + 1}</td>
                        <td>{office.city}</td>

                        <td>
                          <div
                            dangerouslySetInnerHTML={{ __html: office.address }}
                          />
                        </td>

                        <td>{office.phone}</td>

                        {/* <td>
                          <span
                            className={`badge ${office.forex ? "bg-success" : "bg-secondary"
                              }`}
                          >
                            {office.forex ? "Yes" : "No"}
                          </span>
                        </td> */}

                        <td>{office.officeState}</td>

                        <td>{office.mapUrl}</td>

                        <td>
                          <span
                            className={`badge ${office.forex ? "bg-success" : "bg-secondary"
                              }`}
                          >
                            {office.forex ? "Yes" : "No"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge ${office.status === "active"
                              ? "bg-success"
                              : "bg-danger"
                              }`}
                          >
                            {office.status}
                          </span>
                        </td>

                        {/* <td>{office.}</td> */}

                        <td className="text-center">
                          <Link
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenModal(true, office);
                            }}
                          >
                            <IconifyIcon icon="tabler:pencil" />
                          </Link>

                          <Link
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteOffice(office._id);
                            }}
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

      {/* ✅ MODAL */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Office" : "Add Office"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleOfficeSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>City *</Form.Label>
              <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <ReactQuill value={address} onChange={setAddress} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            {/* ✅ Missing Field Added */}
            <Form.Group className="mb-3">
              <Form.Label>Map URL</Form.Label>
              <Form.Control value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Weekly Timings</Form.Label>

              {timings.map((timing, index) => (
                <div key={timing.day} className="d-flex gap-2 mb-2">

                  <strong style={{ width: "90px" }}>{timing.day}</strong>

                  <Form.Control
                    type="time"
                    value={timing.open}
                    disabled={timing.closed}
                    onChange={(e) =>
                      handleTimingChange(index, "open", e.target.value)
                    }
                  />

                  <Form.Control
                    type="time"
                    value={timing.close}
                    disabled={timing.closed}
                    onChange={(e) =>
                      handleTimingChange(index, "close", e.target.value)
                    }
                  />

                  <Form.Check
                    type="checkbox"
                    label="Closed"
                    checked={timing.closed}
                    onChange={(e) =>
                      handleTimingChange(index, "closed", e.target.checked)
                    }
                  />
                </div>
              ))}
            </Form.Group>

            <Button type="submit">
              {isEditMode ? "Update" : "Add"}
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OfficesPage;
