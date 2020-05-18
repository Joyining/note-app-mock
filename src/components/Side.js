import React, { Component } from "react";
import Account from "./Account";
import AddNote from "./AddNote";
import SideMenu from "./SideMenu";
import "../scss/components/side.scss";

class Side extends Component {
  render() {
    return (
      <div className="side-wrap">
        <Account></Account>
        <AddNote></AddNote>
        <SideMenu></SideMenu>
      </div>
    );
  }
}

export default Side;
