import React, { Component } from "react";
import AddNote from "./AddNote.js";
import "./style.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu-wrap">
        <AddNote></AddNote>
      </div>
    );
  }
}

export default Menu;
