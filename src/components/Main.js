import React, { Component } from "react";
import List from "./List";
import Editor from "./Editor";
import "../scss/base/_base.scss";

class Main extends Component {
  render() {
    return (
      <div className="main-wrap">
        <List />
        <Editor />
      </div>
    );
  }
}
export default Main;
