import React, { Component } from "react";
import Account from "./Account";
import AddNote from "./AddNote";
import AddNotebook from "./AddNotebook";
import SideMenu from "./SideMenu";
import "../scss/components/side.scss";

class Side extends Component {
  render() {
    const { cookies } = this.props;
    return (
      <div className="side-wrap">
        <Account cookies={cookies}></Account>
        <AddNote cookies={cookies}></AddNote>
        <AddNotebook cookies={cookies}></AddNotebook>
        <SideMenu cookies={cookies}></SideMenu>
      </div>
    );
  }
}

export default Side;
