import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/globalStyles.css';
import SearchForm from "../components/SearchForm";
import Navigation from "../components/Navigation";
import StoriesCard from "../components/StoriesCard";
import WeatherCard from "../components/WeatherCard";
import QuestionInput from "../components/QuestionInput";
import ZipCodeInput from "../components/ZipCodeInput";

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [location, setLocation] = useState(localStorage.getItem("zipCode"));
  const [topStories, setTopStories] = useState([]);
  const [customSearch, setCustomSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [userWeather, setUserWeather] = useState();

  const customSetName = (name) => {
    setName(name);
    localStorage.setItem("name", name);
  }

  const customSetLocation = (zipCode) => {
    setLocation(zipCode);
    localStorage.setItem("zipCode", zipCode);
  }

  useEffect(() => {
    const categories = ['health', 'sports', 'business', 'entertainment', 'science', 'technology'];

    const getTopStories = async () => {
      for (let i = 0; i < categories.length; i++) {
        const response = await fetch(`${process.env.REACT_APP_TOP_NEWS_ENDPOINT}${categories[i]}&apiKey=${process.env.REACT_APP_NEWS_KEY}&pageSize=1`)
        const data = await response.json();
        const article = await data.articles[0];
        setTopStories(prev => [...prev, article]);
      }
    }
    getTopStories()
    .catch(console.warn);
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
  }, [canSearch, inputValue]);

  useEffect(() => {
    if (lon) {
      const getWeatherInfo = async () => {
        const response = await fetch(`${process.env.REACT_APP_WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`);
        const data = await response.json();
        setUserWeather(data.list[0]);
        console.log("weather called");
      }
      getWeatherInfo()
      .catch(console.warn);
    }
  }, [lon]);

  return (
    <Container fluid className="home">
      {!name &&
        <>
          <QuestionInput setName={customSetName} name={name} />
        </>
      }

      {!location &&
        <>
          <ZipCodeInput setLocation={customSetLocation} setLon={setLon} setLat={setLat} name={name} />
        </>
      }

      <Row className={`search-container ${location ? "display-flex" : "display-none"}`}>
        <Col xs={12} className="search-col">
          <SearchForm inputValue={inputValue} setInputValue={setInputValue} setCanSearch={setCanSearch} />
        </Col>
        <Col xs={12}>
          <Navigation />
        </Col>
      </Row>

      <Row className={`intro-container ${location ? "display-flex" : "display-none"}`}>
          <Col lg={6} className="name-col">
            <h2 className="name">Here is your briefing&#44; {name}.</h2>
          </Col>
          <Col lg={6} className="weather-col">
            <div className="widget-container">
              <WeatherCard userWeather={userWeather} location={location} />
            </div>
          </Col>
      </Row>
      
      <Row className={`stories-container ${location ? "display-flex" : "display-none"}`}>
        <Col lg={6} className="stories-col">
          <div className="widget-container">
            <h3 className="search-headline">Recently Searched</h3>
            {customSearch.length === 0 &&
              <p className="stories-message">
                Your Recently Searched Articles Will be Here.
              </p>
            }
            <Row xs={1}>
              <StoriesCard stories={customSearch} />
            </Row>
          </div>
        </Col>
        <Col lg={6} className="stories-col">
          <div className="widget-container">
            <h3 className="stories-headline">Top Stories</h3>
            <Row xs={1}>
              <StoriesCard stories={topStories} />
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;