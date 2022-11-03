import Home from './Home';
import Health from '../components/Health';
import Sports from '../components/Sports';
import Buisness from '../components/Buisness';
import Science from '../components/Science';
import Entertainment from '../components/Entertainment';
import Technology from '../components/Technology';
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
              <Route exact path="/health">
                <Health />
              </Route> 
              <Route exact path="/sports">
                <Sports />
              </Route>
              <Route exact path="/buisness">
                <Buisness />
              </Route>
              <Route exact path="/entertainment">
                <Entertainment />
              </Route>
              <Route exact path="/science">
                <Science />
              </Route>
              <Route exact path="/technology">
                <Technology />
              </Route>       
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;