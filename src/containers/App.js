import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import StoriesCard from "../components/StoriesCard";
import WeatherCard from "../components/WeatherCard";

const SearchNewsUrl = 'https://newsapi.org/v2/everything?q=';
const topNewsUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=';
const geoURL = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
const weatherURL = 'https://api.openweathermap.org/data/2.5/forecast';

const newsKey = 'bd7aaa8241d74f6ba1434a431589421d';
const weatherKey = '4d9c706af9a981973446c9fe7d1decac';

const zipCode = '33436';

function App() {
  const [topStories, setTopStories] = useState([]);
  const [customSearch, setCustomSearch] = useState([]);
  const [gettingData, setGettingData] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [userWeather, setUserWeather] = useState();

  useEffect(() => {
    const categories = ['health', 'sports', 'business', 'entertainment', 'science', 'technology'];

    const urls = async () => {
      for (let i = 0; i < categories.length; i++) {
        const response = await fetch(`${topNewsUrl}${categories[i]}&apiKey=${newsKey}&pageSize=1`)
        const data = await response.json();
        const article = await data.articles[0];
        setTopStories(prev => [...prev, article]);
      }
    }
  
    // urls()
    // .catch(console.warn);
  }, []);

  useEffect(() => {
    if (canSearch) {
      async function getNewsInfo() {
        const response = await fetch(`${SearchNewsUrl}${inputValue}&apiKey=${newsKey}&pageSize=5`);
        const data = await response.json();
        setCustomSearch(data.articles);
        setCanSearch(false);
      }
      // getNewsInfo()
      // .catch(console.warn);
    }
  }, [canSearch]);

  useEffect(() => {
    async function getGeoInfo() {
      const response = await fetch(`${geoURL}${zipCode},US&appid=${weatherKey}`)
      const data = await response.json();
      setLat(data.lat);
      setLon(data.lon);
    }
    getGeoInfo()
    .catch(console.warn);
  }, []);

  useEffect(() => {
    if (lon) {
      async function getWeatherInfo() {
        const response = await fetch(`${weatherURL}?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`);
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
          <Form className="my-4">
            <InputGroup>
              <Form.Control
                className="search-input"
                placeholder="Search With a Keyword"
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button 
                variant="success" 
                id="search-button"
                onClick={() => setCanSearch(true)}
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="stories-container">
        <Col lg={6} className="stories-col">
          <h3 className="mt-4">Recently Searched</h3>
          {customSearch.length === 0 &&
            <p className="stories-message">
              Your Recently Searched Articles Will be Here.
            </p>
          }
          {/* be specific and add a check in the component */}
          <StoriesCard stories={customSearch} />
        </Col>
        <Col lg={6} className="stories-col">
          <h3 className="mt-4">Top Stories</h3>
          {/* be specific and add a check in the component */}
          <StoriesCard stories={topStories} />
        </Col>
        <Col>
          {/* <h3 className="mt-4">Today's Weather</h3>
          <WeatherCard userWeather={userWeather} /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
// Time permitting, either weather api working or introduce SASS.