import React, { Component } from "react";
import AddNote from "./AddNote.js";
import "../scss/components/side.scss";

class Side extends Component {
  render() {
    return (
      <div className="side-wrap">
        <AddNote></AddNote>
      </div>
    );
  }
}

export default Side;
