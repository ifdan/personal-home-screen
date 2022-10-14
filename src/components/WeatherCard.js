import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';

const WeatherCard = ({userWeather}) => {
  console.log(userWeather);
  if (userWeather) {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${userWeather.weather[0].icon}@2x.png`;
    return (
      <Card className="mt-4">
        <Card.Img variant="top" src={weatherIconUrl} />
        <Card.Body key={uuidv4()}>
          <Card.Subtitle className='my-2 text-muted'>{userWeather.main.temp}°F</Card.Subtitle>
          {/* <Card.Title>{story.title}</Card.Title>
          <Card.Text>{story.description}</Card.Text>
          <Card.Link href={story.url} target="_blank" rel="noopener noreferrer">Read More.</Card.Link> */}
        </Card.Body>
      </Card>
    )
  }
}

export default WeatherCard;