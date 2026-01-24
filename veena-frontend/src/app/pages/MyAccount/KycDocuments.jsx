import { useState } from "react";
import {
  FaChevronDown,
  FaFolderOpen,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";

export default function KycDocuments() {
  const [openSection, setOpenSection] = useState(null);
  const [uploads, setUploads] = useState({}); // store uploaded files

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  const handleFileChange = (e, docName, type) => {
    const file = e.target.files[0];
    if (file) {
      setUploads((prev) => ({
        ...prev,
        [docName]: {
          ...prev[docName],
          [type]: file,
        },
      }));
    }
  };

  const removeFile = (docName, type) => {
    setUploads((prev) => ({
      ...prev,
      [docName]: {
        ...prev[docName],
        [type]: null,
      },
    }));
  };

  const documents = [
    "Aadhar Card",
    "Passport",
    "PAN Card",
    "Voter Card",
    "Birth Certificate",
    "Driver License",
  ];

  return (
    <div>
      <h3 className="font-medium mb-3">KYC Documents</h3>

      {documents.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-md mb-2 border-gray-300 cursor-pointer"
        >
          {/* Collapse Header */}
          <button
            className="w-full flex justify-between items-center px-4 py-2 cursor-pointer"
            onClick={() => toggleSection(idx)}
          >
            <span>{item}</span>
            <FaChevronDown
              className={`transform transition ${
                openSection === idx ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Collapse Content */}
          {openSection === idx && (
            <div className="p-4 bg-gray-50 rounded-b-md">
              {/* Alert Box */}
              <div className="bg-yellow-100 text-yellow-700 text-sm p-3 rounded mb-4">
                If {item.toLowerCase()} is unavailable, please choose and upload
                any one document from below.
              </div>

              {/* Instruction */}
              <p className="text-gray-600 mb-4">
                Upload front and back of {item}. Please make sure that you
                upload a clear copy.
              </p>

              {/* Upload Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Front Upload */}
                <label className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 transition relative">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, item, "front")}
                  />

                  {uploads[item]?.front ? (
                    <div className="flex flex-col items-center">
                      {uploads[item].front.type === "application/pdf" ? (
                        <div className="flex items-center gap-2">
                          <FaFilePdf className="text-red-600 text-2xl" />
                          <span className="text-sm">
                            {uploads[item].front.name}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={URL.createObjectURL(uploads[item].front)}
                          alt="front preview"
                          className="h-24 object-contain mb-2"
                        />
                      )}
                      <button
                        onClick={() => removeFile(item, "front")}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-2">
                        <FaFolderOpen className="text-blue-600 text-xl" />
                      </div>
                      <p className="font-medium">Upload front image</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload from device. You can also take a picture.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        File types: .png, .jpg, .pdf | Max size: 5MB
                      </p>
                    </div>
                  )}
                </label>

                {/* Back Upload */}
                <label className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 transition relative">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, item, "back")}
                  />

                  {uploads[item]?.back ? (
                    <div className="flex flex-col items-center">
                      {uploads[item].back.type === "application/pdf" ? (
                        <div className="flex items-center gap-2">
                          <FaFilePdf className="text-red-600 text-2xl" />
                          <span className="text-sm">
                            {uploads[item].back.name}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={URL.createObjectURL(uploads[item].back)}
                          alt="back preview"
                          className="h-24 object-contain mb-2"
                        />
                      )}
                      <button
                        onClick={() => removeFile(item, "back")}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-2">
                        <FaFolderOpen className="text-blue-600 text-xl" />
                      </div>
                      <p className="font-medium">Upload back image</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload from device. You can also take a picture.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        File types: .png, .jpg, .pdf | Max size: 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {/* Footer Link */}
              <a
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline block mt-3"
              >
                Document upload information →
              </a>
            </div>
          )}
        </div>
      ))}

      {/* Other Docs Dropdown */}
      <div className="mt-3">
        <select className="w-full border rounded-md p-2 border-gray-300">
          <option>Select Other documents</option>
          <option>Visa</option>
          <option>Covid vaccine Certificate</option>
          <option>Other ID Proof</option>
        </select>
      </div>
    </div>
  );
}
