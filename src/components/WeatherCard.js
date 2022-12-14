import Card from 'react-bootstrap/Card';
import { v4 as uuidv4 } from 'uuid';

const WeatherCard = ({userWeather, location}) => {
  if (userWeather) {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${userWeather.weather[0].icon}@2x.png`;
    const temp = userWeather.main.temp.toString().slice(0, 2);

    return (
      <Card className="weather-card">
        <Card.Body key={uuidv4()}>
          <div className='weather-img-container'>
            <img src={weatherIconUrl}></img>
          </div>
          <div className='weather-text-container'>
            <Card.Text>{userWeather.name}</Card.Text>
            <Card.Title>{temp}°F</Card.Title>
            <small>{userWeather.weather[0].description}</small>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default WeatherCard;
