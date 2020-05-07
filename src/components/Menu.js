import React, { Component } from "react";
import AddNote from "./AddNote.js";
import "../scss/components/menu.scss";

class Menu extends Component {
  render() {
    return (
      <div className="menu-wrap">
        <AddNote></AddNote>
      </div>
    );
  }
}

export default Menu;
