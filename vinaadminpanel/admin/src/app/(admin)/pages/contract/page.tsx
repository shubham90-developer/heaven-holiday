"use client";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { Button, Modal, Row, Col, Alert } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import {
    useGetAllContractsQuery,
    useDeleteContractMutation,
    useUpdateContractStatusMutation,
} from "@/app/redux/api/contract/contractApi";
import Link from "next/link";

// ✅ CONTRACT TYPE
interface IContract {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: "pending" | "approved" | "rejected";
}

const ContractsPage = () => {
    const { data, isLoading, isError } = useGetAllContractsQuery();

    const [deleteContract] = useDeleteContractMutation();
    const [updateStatus] = useUpdateContractStatusMutation();

    const contracts: IContract[] = data?.data || [];

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedContract, setSelectedContract] = useState<IContract | null>(null);

    // ✅ DELETE MODAL STATE
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [contractToDelete, setContractToDelete] = useState<string | null>(null);

    const [alert, setAlert] = useState<{
        show: boolean;
        message: string;
        variant: "success" | "danger";
    }>({
        show: false,
        message: "",
        variant: "success",
    });

    const showAlert = (
        message: string,
        variant: "success" | "danger"
    ) => {
        setAlert({ show: true, message, variant });

        setTimeout(() => {
            setAlert({ show: false, message: "", variant: "success" });
        }, 4000);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContract(null);
    };

    const handleOpenModal = (contract: IContract) => {
        setSelectedContract(contract);
        setShowModal(true);
    };

    // ✅ OPEN DELETE MODAL
    const handleDeleteClick = (id: string) => {
        setContractToDelete(id);
        setShowDeleteModal(true);
    };

    // ✅ CONFIRM DELETE
    const confirmDelete = async () => {
        if (!contractToDelete) return;

        try {
            await deleteContract(contractToDelete).unwrap();
            showAlert("Contact deleted successfully", "success");
        } catch {
            showAlert("Delete failed", "danger");
        } finally {
            setShowDeleteModal(false);
            setContractToDelete(null);
        }
    };

    const handleStatusChange = async (
        id: string,
        status: IContract["status"]
    ) => {
        try {
            await updateStatus({ id, status }).unwrap();
            showAlert(`Status updated to ${status}`, "success");
        } catch {
            showAlert("Status update failed", "danger");
        }
    };

    if (isLoading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="text-center p-5 text-danger">
                Error loading contacts
            </div>
        );
    }

    return (
        <>
            <Row>
                <Col xs={12}>
                    <PageTitle
                        title="Corporate Enquiries Management"
                        subTitle="Content Management"
                    />

                    {alert.show && (
                        <Alert variant={alert.variant}>{alert.message}</Alert>
                    )}

                    <ComponentContainerCard
                        title="Corporate Enquiries"
                        description="Manage corporate enquiries."
                    >
                        <div className="table-responsive-sm">
                            <table className="table table-striped-columns mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {contracts.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">
                                                No contacts found!
                                            </td>
                                        </tr>
                                    ) : (
                                        contracts.map((contract, index) => (
                                            <tr key={contract._id}>
                                                <td>{index + 1}</td>
                                                <td>{contract.name}</td>
                                                <td>{contract.email}</td>
                                                <td>{contract.phone}</td>
                                                <td>{contract.subject}</td>

                                                <td>
                                                    <span
                                                        className={`badge ${contract.status === "approved"
                                                            ? "bg-success"
                                                            : contract.status === "rejected"
                                                                ? "bg-danger"
                                                                : "bg-warning"
                                                            }`}
                                                    >
                                                        {contract.status}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    <Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleOpenModal(contract);
                                                        }}
                                                    >
                                                        <IconifyIcon icon="tabler:eye" />
                                                    </Link>

                                                    <Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteClick(contract._id);
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

            {/* ✅ VIEW MODAL */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedContract && (
                        <>
                            <p><strong>Name:</strong> {selectedContract.name}</p>
                            <p><strong>Email:</strong> {selectedContract.email}</p>
                            <p><strong>Phone:</strong> {selectedContract.phone}</p>
                            <p><strong>Subject:</strong> {selectedContract.subject}</p>

                            <div className="mb-3">
                                <strong>Message:</strong>
                                <div className="border rounded p-3 mt-2">
                                    {selectedContract.message}
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <Button
                                    variant="success"
                                    onClick={() =>
                                        handleStatusChange(selectedContract._id, "approved")
                                    }
                                >
                                    Approve
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        handleStatusChange(selectedContract._id, "rejected")
                                    }
                                >
                                    Reject
                                </Button>
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>

            {/* ✅ DELETE CONFIRMATION MODAL */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this contact message?
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContractsPage;



