import { Link } from 'react-router-dom';
import {Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Navbar.Text>
            <Link to="/">Home</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/health">Health</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/sports">Sports</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/buisness">Buisness</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/entertainment">Entertainment</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/science">Science</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/technology">Technology</Link>
          </Navbar.Text>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation;