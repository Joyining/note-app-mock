import React, { Component } from "react";
import Side from "./components/Side";
import Main from "./components/Main";
import "./scss/base/_base.scss";

class App extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Side />
        <Main />
      </div>
    );
  }
}
export default App;
