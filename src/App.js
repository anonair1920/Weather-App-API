// import React from "react";
// import logo from "./logo.svg";
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
import {Button} from "react-bootstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  getCurrentWeather = async (lon, lat) => {
    const apiKey = process.env.REACT_APP_apiKey;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("gimme result", result);
    this.setState({ weatherResult: result });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude);
    });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if (this.state.weatherResult == null) {
      return <div>Loading</div>;
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather
            </h1>
            <h2 className="col-12 text-danger">{this.state.weatherResult.name}</h2>
            <h3 className="col-12 text-danger">
              {this.state.weatherResult.main.temp}C
            </h3>
            <h3 className="col-12 text-danger">
            {this.state.weatherResult.weather[0].description}
            {this.state.weatherResult.weather[0].icon}
            </h3>
            <Button variant="info">Info</Button>
          </div>
        </div>
      </div>
    );
  }
}
