// "use client";

// import { useState } from "react";
// import {
//   useGetAllBrandsSectionsQuery,
//   useCreateBrandsSectionMutation,
//   useUpdateBrandsSectionMutation,
//   useDeleteBrandsSectionMutation,
// } from "@/app/redux/api/corporate-brands/corporateBrandsApi";

// import ComponentContainerCard from "@/components/ComponentContainerCard";
// import PageTitle from "@/components/PageTitle";
// import IconifyIcon from "@/components/wrappers/IconifyIcon";

// import { Button, Modal, Form, Table, Row, Col, Alert } from "react-bootstrap";
// import Link from "next/link";

// type AlertType = {
//   show: boolean;
//   message: string;
//   variant: "success" | "danger" | "warning" | "info";
// };

// const BrandsPage = () => {
//   const { data, isLoading, isError } =
//     useGetAllBrandsSectionsQuery(undefined);

//   const [createBrandsSection, { isLoading: isCreating }] =
//     useCreateBrandsSectionMutation();
//   const [updateBrandsSection, { isLoading: isUpdating }] =
//     useUpdateBrandsSectionMutation();
//   const [deleteBrandsSection] = useDeleteBrandsSectionMutation();

//   const sections = data?.data || [];

//   // --- State ---
//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const [heading, setHeading] = useState("");
//   const [brands, setBrands] = useState<any[]>([]);
//   const [industries, setIndustries] = useState<any[]>([]);

//   const [alert, setAlert] = useState<AlertType>({
//     show: false,
//     message: "",
//     variant: "success",
//   });

//   const showAlert = (message: string, variant: AlertType["variant"]) => {
//     setAlert({ show: true, message, variant });
//     setTimeout(() => {
//       setAlert({ show: false, message: "", variant: "success" });
//     }, 5000);
//   };

//   const resetForm = () => {
//     setIsEditMode(false);
//     setEditingId(null);
//     setHeading("");
//     setBrands([]);
//     setIndustries([]);
//   };

//   const openCreateModal = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   const openEditModal = (section: any) => {
//     setIsEditMode(true);
//     setEditingId(section._id);
//     setHeading(section.heading);
//     setBrands(section.brands || []);
//     setIndustries(section.industries || []);
//     setShowModal(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const payload = { heading, brands, industries, isActive: true };

//       if (isEditMode && editingId) {
//         await updateBrandsSection({ id: editingId, data: payload }).unwrap();
//         showAlert("Brands section updated successfully!", "success");
//       } else {
//         await createBrandsSection(payload).unwrap();
//         showAlert("Brands section created successfully!", "success");
//       }

//       setShowModal(false);
//       resetForm();
//     } catch {
//       showAlert("Something went wrong!", "danger");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this section?")) return;
//     await deleteBrandsSection(id);
//     showAlert("Brands section deleted!", "success");
//   };

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <Alert variant="danger" className="m-4">
//         Failed to load brands sections.
//       </Alert>
//     );
//   }

//   return (
//     <>
//       <Row>
//         <Col xs={12}>
//           <PageTitle
//             title="Brands Management"
//             subTitle="Content Management"
//           />

//           {alert.show && (
//             <Alert
//               variant={alert.variant}
//               dismissible
//               onClose={() => setAlert({ ...alert, show: false })}
//             >
//               {alert.message}
//             </Alert>
//           )}

//           <ComponentContainerCard
//             title="Brands Sections"
//             description="Manage corporate brand listings and industries."
//           >
//             <div className="mb-3">
//               <Button onClick={openCreateModal}>
//                 <IconifyIcon icon="tabler:plus" className="me-1" />
//                 Add Brands Section
//               </Button>
//             </div>

//             <div className="table-responsive-sm">
//               <Table className="mb-0">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Heading</th>
//                     <th>Brands</th>
//                     <th>Industries</th>
//                     <th className="text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sections.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="text-center py-4">
//                         No brands sections found!
//                       </td>
//                     </tr>
//                   ) : (
//                     sections.map((item: any, index: number) => (
//                       <tr key={item._id}>
//                         <td>{index + 1}</td>
//                         <td>{item.heading}</td>
//                         <td>{item.brands?.length}</td>
//                         <td>{item.industries?.length}</td>
//                         <td className="text-center">
//                           <Link
//                             href=""
//                             onClick={(e) => {
//                               e.preventDefault();
//                               openEditModal(item);
//                             }}
//                             className="link-reset fs-20 p-1"
//                           >
//                             <IconifyIcon icon="tabler:pencil" />
//                           </Link>
//                           <Link
//                             href=""
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleDelete(item._id);
//                             }}
//                             className="link-reset fs-20 p-1"
//                           >
//                             <IconifyIcon icon="tabler:trash" />
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </ComponentContainerCard>
//         </Col>
//       </Row>

//       {/* MODAL */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {isEditMode ? "Edit Brands Section" : "Add Brands Section"}
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             {/* HEADING */}
//             <Form.Group className="mb-3">
//               <Form.Label>Heading *</Form.Label>
//               <Form.Control
//                 value={heading}
//                 onChange={(e) => setHeading(e.target.value)}
//                 placeholder="Enter section heading"
//                 required
//               />
//             </Form.Group>

//             {/* ================= BRANDS ================= */}
//             <hr />
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <h6 className="mb-0">Brands</h6>
//               <Button
//                 size="sm"
//                 variant="outline-primary"
//                 onClick={() => setBrands([...brands, { name: "", industry: "" }])}
//               >
//                 <IconifyIcon icon="tabler:plus" className="me-1" />
//                 Add Brand
//               </Button>
//             </div>

//             {brands.length === 0 && (
//               <p className="text-muted small">No brands added yet.</p>
//             )}

//             {brands.map((brand, index) => (
//               <Row key={index} className="mb-2 align-items-center">
//                 <Col md={5}>
//                   <Form.Control
//                     placeholder="Brand Name"
//                     value={brand.name}
//                     onChange={(e) => {
//                       const updated = [...brands];
//                       updated[index].name = e.target.value;
//                       setBrands(updated);
//                     }}
//                     required
//                   />
//                 </Col>
//                 <Col md={5}>
//                   <Form.Control
//                     placeholder="Industry"
//                     value={brand.industry}
//                     onChange={(e) => {
//                       const updated = [...brands];
//                       updated[index].industry = e.target.value;
//                       setBrands(updated);
//                     }}
//                     required
//                   />
//                 </Col>
//                 <Col md={2} className="text-end">
//                   <Button
//                     size="sm"
//                     variant="outline-danger"
//                     onClick={() =>
//                       setBrands(brands.filter((_, i) => i !== index))
//                     }
//                   >
//                     <IconifyIcon icon="tabler:trash" />
//                   </Button>
//                 </Col>
//               </Row>
//             ))}

//             {/* ================= INDUSTRIES ================= */}
//             <hr />
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <h6 className="mb-0">Industries</h6>
//               <Button
//                 size="sm"
//                 variant="outline-primary"
//                 onClick={() => setIndustries([...industries, { image: "" }])}
//               >
//                 <IconifyIcon icon="tabler:plus" className="me-1" />
//                 Add Industry
//               </Button>
//             </div>

//             {industries.length === 0 && (
//               <p className="text-muted small">No industries added yet.</p>
//             )}

//             {industries.map((industry, index) => (
//               <Row key={index} className="mb-2 align-items-center">
//                 <Col md={10}>
//                   <Form.Control
//                     placeholder="Industry Image URL"
//                     value={industry.image}
//                     onChange={(e) => {
//                       const updated = [...industries];
//                       updated[index].image = e.target.value;
//                       setIndustries(updated);
//                     }}
//                     required
//                   />
//                 </Col>
//                 <Col md={2} className="text-end">
//                   <Button
//                     size="sm"
//                     variant="outline-danger"
//                     onClick={() =>
//                       setIndustries(industries.filter((_, i) => i !== index))
//                     }
//                   >
//                     <IconifyIcon icon="tabler:trash" />
//                   </Button>
//                 </Col>
//               </Row>
//             ))}

//             {/* ================= ACTIONS ================= */}
//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isCreating || isUpdating}>
//                 {(isCreating || isUpdating) && (
//                   <span className="spinner-border spinner-border-sm me-2" />
//                 )}
//                 {isEditMode ? "Update" : "Add"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default BrandsPage;

"use client";

import { useState } from "react";
import {
  useGetAllBrandsSectionsQuery,
  useCreateBrandsSectionMutation,
  useUpdateBrandsSectionMutation,
  useDeleteBrandsSectionMutation,
} from "@/app/redux/api/corporate-brands/corporateBrandsApi";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import PageTitle from "@/components/PageTitle";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

import { Button, Modal, Form, Table, Row, Col, Alert } from "react-bootstrap";

const Page = () => {
  const { data, isLoading, isError } = useGetAllBrandsSectionsQuery();

  const [createBrandsSection, { isLoading: isCreating }] =
    useCreateBrandsSectionMutation();
  const [updateBrandsSection, { isLoading: isUpdating }] =
    useUpdateBrandsSectionMutation();
  const [deleteBrandsSection] = useDeleteBrandsSectionMutation();

  const sections = data?.data || [];

  /* ---------- STATE ---------- */
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ GLOBAL HEADING
 const [heading, setHeading] = useState("");

  const [brandName, setBrandName] = useState("");
  const [industryName, setIndustryName] = useState("");
  const [industryImage, setIndustryImage] = useState<File | null>(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success" as "success" | "danger",
  });

  /* ---------- HELPERS ---------- */
  const resetForm = () => {
    setBrandName("");
    setIndustryName("");
    setIndustryImage(null);
    setEditingId(null);
    setIsEditMode(false);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (section: any) => {
    setIsEditMode(true);
    setEditingId(section._id);

    const firstBrand = section.brands?.[0];

    setBrandName(firstBrand?.name || "");
    setIndustryName(firstBrand?.industry || "");
    setIndustryImage(null);

    setShowModal(true);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("heading", heading); // ✅ GLOBAL
      formData.append("isActive", "true");

      const brands = [
        {
          name: brandName,
          industry: industryName,
        },
      ];

      formData.append("brands", JSON.stringify(brands));

      if (industryImage) {
        formData.append("industries", industryImage);
      }

      if (isEditMode && editingId) {
        await updateBrandsSection({
          id: editingId,
          formData,
        }).unwrap();
      } else {
        await createBrandsSection(formData).unwrap();
      }

      setAlert({
        show: true,
        message: "Saved successfully",
        variant: "success",
      });

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.log("SAVE ERROR:", error);

      setAlert({
        show: true,
        message: "Something went wrong",
        variant: "danger",
      });
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteBrandsSection(id);
  };

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center min-vh-100 align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">Failed to load data</Alert>;
  }

  return (
    <>
      <PageTitle title="Brands Management" subTitle="Content Management" />

      {alert.show && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}

      <ComponentContainerCard title="Brands Sections">

        {/* ✅ HEADING OUTSIDE MODAL */}
        <Form.Group className="mb-3">
          <Form.Label>Section Heading</Form.Label>
          <Form.Control
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter headline / title"
          />
        </Form.Group>

        <Button onClick={openCreateModal} className="mb-3">
          <IconifyIcon icon="tabler:plus" className="me-1" />
          Add Section
        </Button>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Heading</th> */}
              <th>Brand</th>
              <th>Industry</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {sections.map((item: any, index: number) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                {/* <td>{item.heading}</td> */}

                <td>
                  {item.brands?.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {item.brands.map((brand: any, i: number) => (
                        <li key={i}>{brand.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">No brands</span>
                  )}
                </td>

                <td>
                  {item.industries?.length > 0 ? (
                    <div className="d-flex gap-2 flex-wrap">
                      {item.industries.map((ind: any, i: number) => (
                        <img
                          key={i}
                          src={ind.image}
                          alt="Industry"
                          width={50}
                          height={50}
                          style={{
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted">No images</span>
                  )}
                </td>

                <td>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => openEditModal(item)}
                  >
                    <IconifyIcon icon="tabler:pencil" />
                  </Button>

                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => handleDelete(item._id)}
                  >
                    <IconifyIcon icon="tabler:trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ComponentContainerCard>

      {/* ---------- MODAL ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Section" : "Add Section"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <h6>Brand Details</h6>

            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                />
              </Col>

              <Col>
                <Form.Control
                  placeholder="Industry Name"
                  value={industryName}
                  onChange={(e) => setIndustryName(e.target.value)}
                  required
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Industry Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setIndustryImage(file);
                }}
                required={!isEditMode}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>

              <Button type="submit" disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) && (
                  <span className="spinner-border spinner-border-sm me-2" />
                )}
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;


