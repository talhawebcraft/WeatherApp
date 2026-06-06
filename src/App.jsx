import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import logo1 from './assets/logo1.png';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]); 
  const [rawForecastList, setRawForecastList] = useState([]); 
  const [selectedDayForecast, setSelectedDayForecast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const phrase = 'Developed by Talha';
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const typedText = phrase.slice(0, charIndex);

  // Uiverse Neon Rotating Border integration along with realistic weather animations
  useEffect(() => {
    const styleId = "uiverse-neon-theme";
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.innerText = `
        @keyframes liveFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sunPulse {
          0% { box-shadow: 0 0 20px #ff9f1c, 0 0 40px #ff6b6b; transform: scale(1); }
          50% { box-shadow: 0 0 35px #ffd166, 0 0 60px #ff9f1c, 0 0 90px rgba(255,159,28,0.4); transform: scale(1.05); }
          100% { box-shadow: 0 0 20px #ff9f1c, 0 0 40px #ff6b6b; transform: scale(1); }
        }
        @keyframes solarWaves {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes moonFloat {
          0% { transform: rotate(-8deg) translateY(0px); filter: drop-shadow(0 0 12px #4ea8de); }
          50% { transform: rotate(8deg) translateY(-4px); filter: drop-shadow(0 0 25px #90e0ef); }
          100% { transform: rotate(-8deg) translateY(0px); filter: drop-shadow(0 0 12px #4ea8de); }
        }
        @keyframes rotBGimg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Your exact Uiverse Card styling integration with adaptive bounds */
        .uiverse-card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
          background: #07182E;
          padding: 30px !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          width: 100%;
          box-sizing: border-box;
        }

        .uiverse-card-container::before {
          content: '';
          position: absolute;
          width: 250px;
          background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
          height: 140%;
          top: -20%;
          left: calc(50% - 125px);
          animation: rotBGimg 3s linear infinite;
          transition: all 0.2s linear;
          z-index: 0;
        }

        .uiverse-card-container::after {
          content: '';
          position: absolute;
          background: #07182E;
          inset: 5px;
          border-radius: 15px;
          z-index: 1;
        }

        /* Ensuring all real data lays safely on top of pseudo-layers */
        .uiverse-card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
        }

        /* Forecast Card Styling */
        .pro-forecast-card {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.06) !important;
          border-radius: 16px !important;
          padding: 16px 12px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .pro-forecast-card:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-4px) !important;
        }

        .pro-active-card {
          background: linear-gradient(135deg, rgba(0, 180, 216, 0.15) 0%, rgba(0, 119, 182, 0.05) 100%) !important;
          border: 1px solid rgba(0, 180, 216, 0.5) !important;
          box-shadow: 0 0 20px rgba(0, 180, 216, 0.25) !important;
        }

        /* Responsive Custom Scrollbars */
        .pro-scroll-container::-webkit-scrollbar {
          height: 5px;
        }
        .pro-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .pro-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .animated-live-icon {
          animation: liveFloat 3s ease-in-out infinite;
        }
        .realistic-sun-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
        }
        .realistic-sun-core {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ffffff 0%, #ffd166 40%, #ff9f1c 80%, #ff5e62 100%);
          border-radius: 50%;
          animation: sunPulse 4s ease-in-out infinite;
          filter: drop-shadow(0 0 15px #ff9f1c);
          z-index: 2;
        }
        .solar-wave-layer {
          position: absolute;
          width: 52px;
          height: 52px;
          background: radial-gradient(circle, rgba(255, 209, 102, 0.35) 0%, rgba(255, 159, 28, 0.08) 65%, transparent 100%);
          border-radius: 50%;
          animation: solarWaves 2.8s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          z-index: 1;
        }
        .solar-wave-layer-2 {
          animation-delay: 1.4s;
        }
        .realistic-moon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 12px 12px 0 0 #e2eafc;
          background: transparent;
          animation: moonFloat 4s ease-in-out infinite;
          margin-left: -12px;
          margin-top: -12px;
          position: relative;
        }
        .greeting-text {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffd166, #ff9f1c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 6px;
          text-align: center;
        }

        .pro-forecast-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }

        /* Hero Responsive Patch */
        .responsive-hero-img-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .hero-panel {
            flex-direction: column-reverse !important;
            text-align: center;
            gap: 30px;
            padding: 40px 15px !important;
          }
          .responsive-hero-img-container {
            max-width: 280px;
            margin-bottom: 10px;
          }
          .pro-forecast-grid {
            display: flex !important;
            overflow-x: auto !important;
            padding-bottom: 8px;
          }
          .pro-forecast-card {
            min-width: 110px !important;
            flex-shrink: 0 !important;
          }
          .uiverse-card-container {
            padding: 20px 15px !important;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const formatTimeToAMPM = (timeStr) => {
    let hour = parseInt(timeStr.substring(0, 2), 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour < 10 ? '0' + hour : hour}:00 ${ampm}`;
  };

  const formatDateFriendly = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good Morning 🌅";
    if (hours >= 12 && hours < 17) return "Good Afternoon ☀️";
    if (hours >= 17 && hours < 21) return "Good Evening 🌇";
    return "Good Night 🌙";
  };

  const isSunnyOrHot = (iconCode) => {
    return iconCode === '01d' || iconCode === '02d';
  };

  const isNightClear = (iconCode) => {
    return iconCode === '01n' || iconCode === '02n';
  };

  const renderWeatherIcon = (iconCode, description, sizeStyle = { width: '80px', height: '80px' }) => {
    if (isSunnyOrHot(iconCode)) {
      return (
        <div className="realistic-sun-container" style={{ ...sizeStyle, transform: `scale(${parseFloat(sizeStyle.width)/80})` }}>
          <div className="solar-wave-layer"></div>
          <div className="solar-wave-layer solar-wave-layer-2"></div>
          <div className="realistic-sun-core" title={description}></div>
        </div>
      );
    }
    if (isNightClear(iconCode)) {
      return (
        <div style={{ ...sizeStyle, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
          <div className="realistic-moon" title={description}></div>
        </div>
      );
    }
    return (
      <img 
        className="animated-live-icon"
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} 
        alt={description}
        style={sizeStyle} 
      />
    );
  };

  const buildForecast = (forecastData) => {
    const grouped = forecastData.list.reduce((acc, entry) => {
      const day = entry.dt_txt.split(' ')[0];
      if (!acc[day]) acc[day] = [];
      acc[day].push(entry);
      return acc;
    }, {});

    return Object.keys(grouped)
      .slice(0, 5)
      .map((day) => {
        const entries = grouped[day];
        const midday = entries.find((item) => item.dt_txt.includes('12:00:00')) || entries[0];
        const temps = entries.map((item) => item.main.temp);
        const min = Math.round(Math.min(...temps));
        const max = Math.round(Math.max(...temps));
        return {
          date: day,
          label: `${WEEK_DAYS[new Date(day).getDay()]}`,
          icon: midday.weather[0].icon,
          description: midday.weather[0].description,
          temp: Math.round(midday.main.temp),
          min,
          max,
        };
      });
  };

  const buildHourlyForecast = (forecastData) => {
    return forecastData.list.slice(0, 8).map((item) => {
      const timeStr = item.dt_txt.split(' ')[1];
      return {
        time: formatTimeToAMPM(timeStr),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    });
  };

  const handleDayClick = (targetDate, dayLabel) => {
    const dayEntries = rawForecastList.filter((item) => item.dt_txt.startsWith(targetDate));
    
    const formattedHourly = dayEntries.map((item) => {
      const timeStr = item.dt_txt.split(' ')[1];
      return {
        time: formatTimeToAMPM(timeStr),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    });

    setSelectedDayForecast({
      date: targetDate,
      friendlyDate: formatDateFriendly(targetDate),
      dayName: dayLabel,
      hours: formattedHourly
    });
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name!');
      return;
    }

    const API_KEY = '36b9d03e227b42621361bc80ed6a7cab';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);
    setHourlyForecast([]);
    setRawForecastList([]);
    setSelectedDayForecast(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl, { signal: controller.signal }),
        fetch(forecastUrl, { signal: controller.signal }),
      ]);
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (!weatherRes.ok || !forecastRes.ok) {
        setError('City not found! Please check your city name.');
        setLoading(false);
        return;
      }

      setWeather(weatherData);
      setRawForecastList(forecastData.list);
      setForecast(buildForecast(forecastData));
      setHourlyForecast(buildHourlyForecast(forecastData));
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else {
        setError('Something went wrong! Please try again later.');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutDuration = !isDeleting
      ? charIndex === phrase.length
        ? 1200
        : 120
      : charIndex === 0
      ? 500
      : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < phrase.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phrase.length]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <section className="hero-panel" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Live weather for every city</span>
            <h1>
              Professional Weather Checker App <br />
              <span className="typed-phrase">{typedText}</span>
            </h1>
            <p>
              Search any city and get instant temperature, humidity, wind speed, and a crisp weather summary in a modern dashboard.
            </p>
            <a href="#weather" className="hero-cta">
              Check Weather
            </a>
          </div>
          <div className="responsive-hero-img-container">
            <img 
              src={logo1} 
              alt="talha" 
              className="hero-main-img"
            />
          </div>
        </section>

        <section className="weather-panel" id="weather">
          <div className="uiverse-card-container">
            <div className="uiverse-card-content">
              
              <div className="card-header-wrapper">
                <div>
                  <p className="card-label-sub">Weather dashboard</p>
                  <h2 className="card-main-title">Search by city</h2>
                </div>
                <span className="status-chip-badge">Live</span>
              </div>

              <form onSubmit={fetchWeather} className="search-form">
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Get Weather'}
                </button>
              </form>

              {loading && <p className="loading-text-info">Loading weather data...</p>}
              {error && <p className="error-text">{error}</p>}

              {weather && (
                <div className="weather-info-box">
                  <div className="weather-top-row">
                    <div className="weather-meta">
                      <p className="weather-location-text">{weather.name}, {weather.sys.country}</p>
                      <h3 className="weather-main-status">{weather.weather[0].main}</h3>
                      <p className="weather-desc-text">{weather.weather[0].description}</p>
                    </div>
                    
                    <div className="weather-temp-block">
                      <div className="weather-temp-badge">
                        {renderWeatherIcon(weather.weather[0].icon, weather.weather[0].description, { width: '80px', height: '80px' })}
                        <span className="temp-number-value">{Math.round(weather.main.temp)}°C</span>
                      </div>
                      <span className="greeting-text">{getGreetingMessage()}</span>
                    </div>
                  </div>

                  <div className="details-layout-grid">
                    <div className="detail-card-item">
                      <span className="detail-label">Humidity</span>
                      <strong className="detail-value">{weather.main.humidity}%</strong>
                    </div>
                    <div className="detail-card-item">
                      <span className="detail-label">Wind speed</span>
                      <strong className="detail-value">{weather.wind.speed} m/s</strong>
                    </div>
                    <div className="detail-card-item">
                      <span className="detail-label">Feels like</span>
                      <strong className="detail-value">{Math.round(weather.main.feels_like)}°C</strong>
                    </div>
                    <div className="detail-card-item">
                      <span className="detail-label">Pressure</span>
                      <strong className="detail-value">{weather.main.pressure} hPa</strong>
                    </div>
                  </div>
                </div>
              )}

              {hourlyForecast.length > 0 && (
                <div className="forecast-section-wrapper">
                  <div className="forecast-section-header">
                    <h3 className="forecast-title">Hourly Forecast (Today)</h3>
                    <p className="forecast-subtitle">In 3-hour intervals for the next 24 hours.</p>
                  </div>
                  <div className="pro-scroll-container forecast-scroll-row">
                    {hourlyForecast.map((item, index) => (
                      <div key={index} className="pro-forecast-card hourly-card-dimension">
                        <p className="hourly-time-label">{item.time}</p>
                        {renderWeatherIcon(item.icon, item.description, { width: '42px', height: '42px' })}
                        <strong className="hourly-temp-value">{item.temp}°C</strong>
                        <p className="hourly-desc-ellipsis">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {forecast.length > 0 && (
                <div className="forecast-section-wrapper">
                  <div className="forecast-section-header">
                    <h3 className="forecast-title">5-Day Forecast</h3>
                    <p className="forecast-subtitle">Click on a day to view its hourly breakdown.</p>
                  </div>
                  <div className="pro-forecast-grid-layout">
                    {forecast.map((day, index) => {
                      const isSelected = selectedDayForecast?.date === day.date;
                      return (
                        <div 
                          key={index} 
                          className={`pro-forecast-card standard-day-card ${isSelected ? 'pro-active-card' : ''}`}
                          onClick={() => handleDayClick(day.date, day.label)}
                        >
                          <p className="day-name-label">{day.label}</p>
                          <p className="day-date-label">{formatDateFriendly(day.date)}</p>
                          {renderWeatherIcon(day.icon, day.description, { width: '46px', height: '46px' })}
                          <strong className="day-temp-main">{day.temp}°C</strong>
                          <div className="day-range-wrapper">
                            <span>{day.max}°</span>
                            <span className="min-temp-opacity">{day.min}°</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedDayForecast && (
                <div className="forecast-section-wrapper">
                  <div className="forecast-section-header selected-breakdown-header">
                    <h3 className="selected-breakdown-title">Hourly breakdown for {selectedDayForecast.dayName} ({selectedDayForecast.friendlyDate})</h3>
                    <button 
                      onClick={() => setSelectedDayForecast(null)} 
                      className="clear-view-btn"
                    >
                      Clear View
                    </button>
                  </div>
                  <div className="pro-scroll-container forecast-scroll-row">
                    {selectedDayForecast.hours.map((hour, idx) => (
                      <div key={idx} className="pro-forecast-card hourly-card-dimension selected-hourly-bg">
                        <p className="hourly-time-label">{hour.time}</p>
                        {renderWeatherIcon(hour.icon, hour.description, { width: '42px', height: '42px' })}
                        <strong className="hourly-temp-value">{hour.temp}°C</strong>
                        <p className="hourly-desc-ellipsis">{hour.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
