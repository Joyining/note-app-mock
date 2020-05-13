import React, { Component } from "react";
import AddNote from "./AddNote.js";
import "../scss/components/menu.scss";

class Side extends Component {
  render() {
    return (
      <div className="menu-wrap">
        <AddNote></AddNote>
      </div>
    );
  }
}

export default Side;
