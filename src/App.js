import React, { Component } from "react";
import Menu from "./components/Menu";
import List from "./components/List";
import Editor from "./components/Editor";
import "./scss/base/_base.scss";

class App extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Menu />
        <List />
        <Editor />
      </div>
    );
  }
}
export default App;
