import Home from './Home';
import Health from '../components/Health';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/Health">
                <Health />
              </Route>  
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;