import React, { Component } from "react";
import { connect } from "react-redux";
import { switchView } from "../actions";

class SideMenu extends Component {
  menuItemOnClickHandler = (view) => {
    const { switchView } = this.props;
    switchView(view);
  };

  render() {
    const menu = [
      { name: "All Notes", view: "noteAndEditor" },
      { name: "Notebooks", view: "notebookList" },
    ];
    return (
      <div>
        <div className="side-menu-wrap">
          <ul className="menu-list">
            {menu.map((item) => {
              return (
                <li
                  key={item.name}
                  className="menu-item"
                  onClick={() => {
                    this.menuItemOnClickHandler(item.view);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, { switchView })(SideMenu);
