import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const ZipCodeInput = ({ setLocation, setLat, setLon, name }) => {
  const [validated, setValidated] = useState(false);
  const zipCodeRef = useRef(null);

  useEffect(() => {
    if (name !== "") {
      zipCodeRef.current.focus();
    }
  }, [name])

  const handleSubmit = e => {
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
      const getGeoInfo = async () => {
        const response = await fetch(`${process.env.REACT_APP_GEO_LOCATION_ENDPOINT}${zipCodeRef.current.value},US&appid=${process.env.REACT_APP_WEATHER_KEY}`)
        const data = await response.json();
        setLocation(data.name);
        setLat(data.lat);
        setLon(data.lon);
      }
      getGeoInfo()
      .catch(console.warn);
    }

    e.preventDefault();
  }
console.log(name);
  return (
    <>
    {name !== "" &&
      <Row className={`${zipCodeRef.current && zipCodeRef.current.value ? "display-none" : "display-flex"}`}>
        <Col xs={12} className="intro-question-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="question-form">
            <Form.Group className="question-input-group">
              <Form.Label>What is your zip code, {name}?</Form.Label>
              <Form.Control
                type="text"
                ref={zipCodeRef}
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    }
    </>
  )
}

export default ZipCodeInput;