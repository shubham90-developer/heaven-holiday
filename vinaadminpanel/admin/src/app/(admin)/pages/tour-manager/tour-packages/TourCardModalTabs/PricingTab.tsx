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

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Price Note</Form.Label>
            <div style={{ height: "200px" }}>
              <ReactQuill
                theme="snow"
                value={tourPriceNote}
                onChange={setTourPriceNote}
                modules={modules}
                placeholder="Additional pricing notes..."
                style={{ height: "150px", marginBottom: "50px" }}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default PricingTab;
