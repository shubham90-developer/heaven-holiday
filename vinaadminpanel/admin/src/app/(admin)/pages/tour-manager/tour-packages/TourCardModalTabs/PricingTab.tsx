import { Row, Col, Form, Alert } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { modules } from "../constant";

interface PricingTabProps {
  tourBaseFullPackagePrice: number;
  setTourBaseFullPackagePrice: (value: number) => void;
  tourBaseJoiningPrice: number;
  setTourBaseJoiningPrice: (value: number) => void;
  tourPriceNote: string;
  setTourPriceNote: (value: string) => void;
}

const PricingTab = ({
  tourBaseFullPackagePrice,
  setTourBaseFullPackagePrice,
  tourBaseJoiningPrice,
  setTourBaseJoiningPrice,
  tourPriceNote,
  setTourPriceNote,
}: PricingTabProps) => {
  return (
    <>
      <Alert variant="info" className="mb-3">
        <IconifyIcon
          icon="solar:info-circle-bold-duotone"
          className="fs-20 me-2"
        />
        These are base prices shown as "Starting from" on the listing page.
        Actual prices for each departure will be configured in the Departures
        tab.
      </Alert>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Base Full Package Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={tourBaseFullPackagePrice}
              onChange={(e) =>
                setTourBaseFullPackagePrice(Number(e.target.value))
              }
              min="0"
              required
            />
            <Form.Text className="text-muted">
              Lowest full package price (with flights)
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Base Joining Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={tourBaseJoiningPrice}
              onChange={(e) => setTourBaseJoiningPrice(Number(e.target.value))}
              min="0"
              required
            />
            <Form.Text className="text-muted">
              Lowest joining price (without flights)
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <div className="w-full">
        <div className="w-full mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Price Note
          </label>
          <div className="w-full">
            <ReactQuill
              theme="snow"
              value={tourPriceNote}
              onChange={setTourPriceNote}
              modules={modules}
              placeholder="Additional pricing notes..."
              className="w-full bg-white rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingTab;
