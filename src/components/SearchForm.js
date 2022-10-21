import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchForm = ({ inputValue, setInputValue, setCanSearch }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
      setCanSearch(true);
    }

    e.preventDefault();
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="my-4">
      <InputGroup>
        <Form.Control
          className="search-input"
          placeholder="Search With a Keyword"
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Enter a keyword.
        </Form.Control.Feedback>
        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
        <Button 
          type="submit"
          variant="success" 
          id="search-button"
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchForm;