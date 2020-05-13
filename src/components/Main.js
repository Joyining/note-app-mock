import React, { Component } from "react";
import NoteList from "./NoteList";
import Editor from "./Editor";
import "../scss/base/_base.scss";

class Main extends Component {
  render() {
    return (
      <div className="main-wrap">
        <NoteList />
        <Editor />
      </div>
    );
  }
}
export default Main;
