// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// function App() {
//   return (
//     <div className="container-fluid text-white my-auto">
//       <div className="container mx-auto my-4 py-4">
//         <div className="row justify-content-center text-center">
//           <h1 className="col-12 display-4 my-2 py-3 text-success">
//             Awesome Weather
//           </h1>
//           <h2 className="col-12">Location Name</h2>
//           <h3 className="col-12 text-danger">Temperature</h3>
//           <h3 className="col-12">Weather Description</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./App.css";
const apiKey = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  getCurrentWeather = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();
    // console.log("gimme result", result);
    this.setState({ weatherResult: result });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude);
    });
  };

  getWeatherIn = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("my new result", result);
    this.setState({ weatherResult: result });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if (this.state.weatherResult == null) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container text-white my-auto">
        <div className="container mx-auto my-4 py-4 ">
          <h1 className="col-12 display-4 my-2 py-3 text-success text-center">
            An's wholesome Weather
          </h1>
          <div className="row justify-content-center text-center bigBox mb-5 mt-5 pt-5 pb-5">
            <h2 className="col-12 text-dark">
              {this.state.weatherResult.name}
            </h2>
            <h3 className="col-12 text-danger">
              {this.state.weatherResult.main.temp}°C /{" "}
              {Math.round((9 * this.state.weatherResult.main.temp + 32 * 5) / 5)}°F
              <br></br>
              <h4 className="text-info">
                {" "}
                Feels like {this.state.weatherResult.main.feels_like} °C
              </h4>
            </h3>
            <h3 className="col-12 text-capitalize text-warning">
              {this.state.weatherResult.weather[0].description}
            </h3>
            <div className="container-fluid d-flex fixed-top justify-content-around">
              <Button
                onClick={() => this.getWeatherIn("moscow")}
                variant="success"
              >
                Moscow
              </Button>{" "}
              <Button
                onClick={() => this.getWeatherIn("London")}
                variant="success"
              >
                London
              </Button>
              <Button onClick={() => this.getWeatherIn("Paris")} variant="success">
                Paris
              </Button>{" "}
              <Button
                onClick={() => this.getWeatherIn("Ha noi")}
                variant="success"
              >
                Hanoi
              </Button>
              <Button
                onClick={() => this.getWeatherIn("sydney")}
                variant="success"
              >
                Sydney
              </Button>{" "}
              <Button
                onClick={() => this.getWeatherIn("beijing")}
                variant="success"
              >
                Beijing
              </Button>
              <Button onClick={() => this.getWeatherIn("miami")} variant="success">
                Miami
              </Button>{" "}
              <Button onClick={() => this.getWeatherIn("tokyo")} variant="success">
                Tokyo
              </Button>{" "}
              <Button
                onClick={() => this.getWeatherIn("new york")}
                variant="success"
              >
                New York
              </Button>
              <Button
                onClick={() => this.getWeatherIn("vancouver")}
                variant="success"
              >
                Vancouver
              </Button>{" "}
              <Button
                onClick={() => this.getWeatherIn("san francisco")}
                variant="success"
              >
                San Francisco
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
