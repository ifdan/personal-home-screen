// Build a component that grabs the 10 most recent health stories
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoriesCard from './StoriesCard';

const Health = () => {
  const [healthStories, setHealthStories] = useState([]);

  useEffect(() => {
    const getHealthStories = async () => {
        const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}health&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=10`)
        const data = await response.json();
        const articles = await data.articles;
        setHealthStories(articles);
    }
    getHealthStories()
    .catch(console.warn);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <StoriesCard stories={healthStories} />
        </Col>
      </Row>
    </Container>
  )
}

export default Health;