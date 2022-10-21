import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const QuestionInput = ({ setName }) => {
  const [validated, setValidated] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = e => {
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
      setName(inputRef.current.value);
    }

    e.preventDefault()
  };

  return (
    <Row className={`${inputRef.current && inputRef.current.value ? "display-none" : "display-flex"}`}>
      <Col xs={12} className="intro-question-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="question-form">
          <Form.Group className="question-input-group">
            <Form.Label>Hello, what is your name?</Form.Label>
            <Form.Control
              type="text"
              ref={inputRef}
              required
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default QuestionInput;