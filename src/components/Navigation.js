import { Link } from 'react-router-dom';
import {Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="pt-4 navigation">
      <Container>
        <Nav>
          <Navbar.Text>
            <Link to="/" style={{ color: 'rgb(255, 255, 255)'}}>Home</Link>
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