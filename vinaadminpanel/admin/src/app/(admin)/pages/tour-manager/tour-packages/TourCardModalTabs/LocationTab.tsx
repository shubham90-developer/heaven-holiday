import { Row, Col, Form, Card, Button } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { State, CityDetail } from "../types";

interface LocationTabProps {
  tourRoute: string;
  setTourRoute: (value: string) => void;
  tourStates: State[];
  setTourStates: (value: State[]) => void;
  tourCityDetails: CityDetail[];
  setTourCityDetails: (value: CityDetail[]) => void;
  handleAddState: () => void;
  handleRemoveState: (index: number) => void;
  handleStateChange: (index: number, field: string, value: string) => void;
  handleAddCity: (stateIndex: number) => void;
  handleRemoveCity: (stateIndex: number, cityIndex: number) => void;
  handleCityChange: (
    stateIndex: number,
    cityIndex: number,
    value: string,
  ) => void;
  handleAddCityDetail: () => void;
  handleRemoveCityDetail: (index: number) => void;
  handleCityDetailChange: (
    index: number,
    field: string,
    value: string | number,
  ) => void;
}

const LocationTab = ({
  tourRoute,
  setTourRoute,
  tourStates,
  handleAddState,
  handleRemoveState,
  handleStateChange,
  handleAddCity,
  handleRemoveCity,
  handleCityChange,
  tourCityDetails,
  handleAddCityDetail,
  handleRemoveCityDetail,
  handleCityDetailChange,
}: LocationTabProps) => {
  return (
    <>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>
              Route <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={tourRoute}
              onChange={(e) => setTourRoute(e.target.value)}
              placeholder="e.g., Delhi - Agra - Jaipur"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <h6 className="mb-3">
        States & Cities <span className="text-danger">*</span>
      </h6>
      {tourStates.map((state, stateIndex) => (
        <Card key={stateIndex} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={11}>
                <Form.Group className="mb-2">
                  <Form.Label>State Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                      handleStateChange(stateIndex, "name", e.target.value)
                    }
                    placeholder="Enter state name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={1} className="d-flex align-items-end">
                {tourStates.length > 1 && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveState(stateIndex)}
                  >
                    <IconifyIcon icon="tabler:trash" />
                  </Button>
                )}
              </Col>
            </Row>

            <div className="mt-2">
              <Form.Label className="small">Cities</Form.Label>
              {state.cities.map((city, cityIndex) => (
                <Row key={cityIndex} className="mb-2">
                  <Col md={10}>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) =>
                        handleCityChange(stateIndex, cityIndex, e.target.value)
                      }
                      placeholder="Enter city name"
                      required
                    />
                  </Col>
                  <Col md={2}>
                    {state.cities.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveCity(stateIndex, cityIndex)}
                      >
                        <IconifyIcon icon="tabler:x" />
                      </Button>
                    )}
                  </Col>
                </Row>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleAddCity(stateIndex)}
              >
                <IconifyIcon icon="tabler:plus" className="me-1" />
                Add City
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" size="sm" onClick={handleAddState}>
        <IconifyIcon icon="tabler:plus" className="me-1" />
        Add State
      </Button>

      <h6 className="mt-4 mb-3">
        City Details <span className="text-danger">*</span>
      </h6>
      {tourCityDetails.map((city, index) => (
        <Row key={index} className="mb-2">
          <Col md={8}>
            <Form.Control
              type="text"
              value={city.name}
              onChange={(e) =>
                handleCityDetailChange(index, "name", e.target.value)
              }
              placeholder="City name"
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              value={city.nights}
              onChange={(e) =>
                handleCityDetailChange(index, "nights", Number(e.target.value))
              }
              placeholder="Nights"
              min="0"
              required
            />
          </Col>
          <Col md={1}>
            {tourCityDetails.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveCityDetail(index)}
              >
                <IconifyIcon icon="tabler:trash" />
              </Button>
            )}
          </Col>
        </Row>
      ))}
      <Button variant="outline-primary" size="sm" onClick={handleAddCityDetail}>
        <IconifyIcon icon="tabler:plus" className="me-1" />
        Add City Detail
      </Button>
    </>
  );
};

export default LocationTab;
