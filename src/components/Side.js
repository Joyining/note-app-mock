import React, { Component } from "react";
import AddNote from "./AddNote";
import SideMenu from "./SideMenu";
import "../scss/components/side.scss";

class Side extends Component {
  render() {
    return (
      <div className="side-wrap">
        <AddNote></AddNote>
        <SideMenu></SideMenu>
      </div>
    );
  }
}

export default Side;
