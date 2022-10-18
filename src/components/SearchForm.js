import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchForm = ({ inputValue, setInputValue, setCanSearch }) => {
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="my-4">
      <InputGroup>
        <Form.Control
          className="search-input"
          placeholder="Search With a Keyword"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}

        />
        <Button 
          variant="success" 
          id="search-button"
          onClick={() => setCanSearch(true)}
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchForm;