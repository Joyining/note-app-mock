import React, { Component } from "react";
import Account from "./Account";
import AddNote from "./AddNote";
import SideMenu from "./SideMenu";
import "../scss/components/side.scss";

class Side extends Component {
  render() {
    const { cookies } = this.props;
    return (
      <div className="side-wrap">
        <Account cookies={cookies}></Account>
        <AddNote cookies={cookies}></AddNote>
        <SideMenu></SideMenu>
      </div>
    );
  }
}

export default Side;
