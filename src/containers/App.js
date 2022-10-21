import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/globalStyles.css';
import SearchForm from "../components/SearchForm";
import StoriesCard from "../components/StoriesCard";
import WeatherCard from "../components/WeatherCard";
import QuestionInput from "../components/QuestionInput";
import ZipCodeInput from "../components/ZipCodeInput";

function App() {
  const [name, setName] = useState('');
  const [topStories, setTopStories] = useState([]);
  const [customSearch, setCustomSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [userWeather, setUserWeather] = useState();

  useEffect(() => {
    const categories = ['health', 'sports', 'business', 'entertainment', 'science', 'technology'];

    const endPoints = async () => {
      for (let i = 0; i < categories.length; i++) {
        const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}${categories[i]}&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=1`)
        const data = await response.json();
        const article = await data.articles[0];
        setTopStories(prev => [...prev, article]);
      }
    }
    // endPoints()
    // .catch(console.warn);
  }, []);

  useEffect(() => {
    if (canSearch) {
      const getNewsInfo = async () => {
        const response = await fetch(`${process.env.REACT_APP_SEARCH_NEWS_ENDPOINT}${inputValue}&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=6`);
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
    if (lon) {
      const getWeatherInfo = async () => {
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
      <QuestionInput setName={setName} />
      <ZipCodeInput setLocation={setLocation} setLon={setLon} setLat={setLat} />
      <Row className="search-container display-none">
        <Col className="search-col">
          <SearchForm inputValue={inputValue} setInputValue={setInputValue} setCanSearch={setCanSearch} />
        </Col>
      </Row>
      <Row className="intro-container display-none">
          <Col lg={6} className="name-col">
            <h2 className="name">Here is your briefing&#44; {name}.</h2>
          </Col>
          <Col lg={6} className="weather-col">
            <div className="widget-container">
              <WeatherCard userWeather={userWeather} location={location} />
            </div>
          </Col>
      </Row>
      <Row className="stories-container display-none">
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