import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import StoriesCard from './StoriesCard';

const Entertainment = () => {
  const [entertainmentStories, setEntertainmentStories] = useState([]);

  useEffect(() => {
    const getEntertainmentStories = async () => {
      const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}entertainment&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=12`)
      const data = await response.json();
      const articles = await data.articles;
      setEntertainmentStories(articles);
    }
    getEntertainmentStories()
    .catch(console.warn);
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Navigation />
        </Col>
        <Col xs={12}>
          <h3 className="stories-headline">Top Entertainment Stories</h3>
        </Col>
        <Col xs={12}>
          <Row xs={1} md={3}>
            <StoriesCard stories={entertainmentStories} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Entertainment;