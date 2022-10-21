import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';

const QuestionInput = ({ setName }) => {
  const inputRef = useRef(null);
  const handleSubmit = e => {
    setName(inputRef.current.value);
    e.preventDefault()
  };

  return (
    <Row>
      <Col xs={12} className="intro-question-container">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            placeholder="What is your name?">
          </input>
        </form>
      </Col>
    </Row>
  )
}

export default QuestionInput;