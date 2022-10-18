import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/globalStyles.css';
import SearchForm from "../components/SearchForm";
import StoriesCard from "../components/StoriesCard";
import WeatherCard from "../components/WeatherCard";

function App() {
  const [topStories, setTopStories] = useState([]);
  const [customSearch, setCustomSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const [location, setLocation] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [userWeather, setUserWeather] = useState();
  const zipCode = '33467';

  useEffect(() => {
    const categories = ['health', 'sports', 'business', 'entertainment', 'science', 'technology'];

    const urls = async () => {
      for (let i = 0; i < categories.length; i++) {
        const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}${categories[i]}&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=1`)
        const data = await response.json();
        const article = await data.articles[0];
        setTopStories(prev => [...prev, article]);
      }
    }
    urls()
    .catch(console.warn);
  }, []);

  useEffect(() => {
    if (canSearch) {
      async function getNewsInfo() {
        const response = await fetch(`${process.env.REACT_APP_SEARCH_NEWS_ENDPOINT}${inputValue}&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=5`);
        const data = await response.json();
        setCustomSearch(data.articles);
        setCanSearch(false);
        setInputValue('');
      }
      getNewsInfo()
      .catch(console.warn);
    }
  }, [canSearch]);

  useEffect(() => {
    async function getGeoInfo() {
      const response = await fetch(`${process.env.REACT_APP_GEO_LOCATION_ENDPOINT}${zipCode},US&appid=${process.env.REACT_APP_WEATHER_KEY}`)
      const data = await response.json();
      setLocation(data.name);
      setLat(data.lat);
      setLon(data.lon);
    }
    getGeoInfo()
    .catch(console.warn);
  }, []);

  useEffect(() => {
    if (lon) {
      async function getWeatherInfo() {
        const response = await fetch(`${process.env.REACT_APP_WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`);
        const data = await response.json();
        setUserWeather(data.list[0]);
      }
      getWeatherInfo()
      .catch(console.warn);
    }
  }, [lon]);

  return (
    <Container fluid className="app">
      <Row className="search-container">
        <Col className="search-col">
          <SearchForm inputValue={inputValue} setInputValue={setInputValue} setCanSearch={setCanSearch} />
        </Col>
      </Row>
      <Row className="intro-container">
          <Col lg={6} className="name-col">
            <h2 className="name">Here is your briefing&#44; Dan.</h2>
          </Col>
          <Col lg={6} className="weather-col">
            <div className="widget-container">
              <WeatherCard userWeather={userWeather} location={location} />
            </div>
          </Col>
      </Row>
      <Row className="stories-container">
        <Col lg={6} className="stories-col">
          <div className="widget-container">
            <h3 className="search-headline">Recently Searched</h3>
            {customSearch.length === 0 &&
              <p className="stories-message">
                Your Recently Searched Articles Will be Here.
              </p>
            }
            <StoriesCard stories={customSearch} />
          </div>
        </Col>
        <Col lg={6} className="stories-col">
          <div className="widget-container">
            <h3 className="stories-headline">Top Stories</h3>
            <StoriesCard stories={topStories} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;