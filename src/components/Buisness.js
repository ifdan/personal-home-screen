import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import StoriesCard from './StoriesCard';

const Business = () => {
  const [buisnessStories, setBuisnessStories] = useState([]);

  useEffect(() => {
    const getBuisnessStories = async () => {
      const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}business&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=12`)
      const data = await response.json();
      const articles = await data.articles;
      setBuisnessStories(articles);
    }
    getBuisnessStories()
    .catch(console.warn);
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Navigation />
        </Col>
        <Col xs={12}>
          <h3 className="stories-headline">Top Business Stories</h3>
        </Col>
        <Col xs={12}>
          <Row xs={1} md={3}>
            <StoriesCard stories={buisnessStories} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Business;