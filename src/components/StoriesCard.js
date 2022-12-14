import { Card, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function StoriesCard({stories}) {
  return (
    <>
    {
     stories.map(story => {
      return (      
        <Col key={uuidv4()}>
          <Card className="mt-4 stories-card">
            <Card.Img variant="top" src={story.urlToImage} />
            <Card.Body>
              <Card.Subtitle className='my-2'>{story.source.name}</Card.Subtitle>
              <Card.Title>{story.title}</Card.Title>
              <Card.Text>{story.description}</Card.Text>
              <Card.Link href={story.url} target="_blank" rel="noopener noreferrer">Read More.</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      )
    })   
    }
    </>
  )
}

export default StoriesCard;