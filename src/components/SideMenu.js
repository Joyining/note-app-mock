import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";

class SideMenu extends Component {
  menuItemOnClickHandler = (view) => {
    const { switchView } = this.props;
    switchView(view);
  };

  renderNotebook() {
    const { allNotebooks } = this.props;
    const ntoebooks = _.map(allNotebooks, (notebook) => {
      return <p>{notebook.data().name}</p>;
    });
    if (!_.isEmpty(ntoebooks)) {
      return ntoebooks;
    }
  }

  componentDidMount() {
    const { fetchNotebooks, cookies, currentUser } = this.props;
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    fetchNotebooks(getCurrentUser);
  }

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
          <div>{this.renderNotebook()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const allNotebooks = state.allNotebooks;
  const currentUser = state.currentUser;
  return { allNotebooks, currentUser };
};

export default connect(mapStateToProps, actions)(SideMenu);
