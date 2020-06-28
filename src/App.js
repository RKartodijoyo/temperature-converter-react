import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
  k: "Kelvin"
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function toCelsius2(kelvin) {
  return kelvin + 273.15;
}
function toKelvin(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

function toKelvin2(celsius) {
  return celsius - 273.15;
}
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function toFahrenheit2(kelvin) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }
  handleKelvinChange(temperature) {
    this.setState({ scale: "k", temperature });
  }
  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;

    const temperature = this.state.temperature;
    var celsius, kelvin, fahrenheit;

    if (scale === "f") {
      celsius = tryConvert(temperature, toCelsius);
      kelvin = tryConvert(temperature, toKelvin);
    } else if (scale === "k") {
    } else if (scale === "c") {
    } else {
      celsius = temperature;
      kelvin = temperature;
    }

    if (scale === "c") {
      fahrenheit = tryConvert(temperature, toFahrenheit);
      kelvin = tryConvert(temperature, toKelvin2);
    } else if (scale === "k") {
    } else if (scale === "f") {
    } else {
      fahrenheit = temperature;
      kelvin = temperature;
    }
    if (scale === "k") {
      celsius = tryConvert(temperature, toCelsius2);
      fahrenheit = tryConvert(temperature, toFahrenheit2);
    } else if (scale === "c") {
    } else if (scale === "f") {
    } else {
      celsius = temperature;
      fahrenheit = temperature;
    }

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="k"
          temperature={kelvin}
          onTemperatureChange={this.handleKelvinChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
export default Calculator;
