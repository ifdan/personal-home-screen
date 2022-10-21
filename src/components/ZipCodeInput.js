import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const ZipCodeInput = ({ setLocation, setLat, setLon }) => {
  const [zipCode, setZipCode] = useState('');
  const handleSubmit = e => {
    const getGeoInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_GEO_LOCATION_ENDPOINT}${zipCode},US&appid=${process.env.REACT_APP_WEATHER_KEY}`)
      const data = await response.json();
      setLocation(data.name);
      setLat(data.lat);
      setLon(data.lon);
    }
    getGeoInfo()
    .catch(console.warn);
    e.preventDefault();
  }

  return (
    <Row>
      <Col xs={12} className="intro-question-container">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="What is your zip code?"
          ></input>
        </form>
      </Col>
    </Row>
  )
}

export default ZipCodeInput;