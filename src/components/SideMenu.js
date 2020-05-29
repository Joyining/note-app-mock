import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import * as utils from "../utils";
import Notebook from "./Notebook";

class SideMenu extends Component {
  menuItemOnClickHandler = (view, needFilterNotes, filter, e) => {
    const { switchView, filterNotes, cookies, currentUser } = this.props;
    if (e.target === e.currentTarget) {
      switchView(view);
    }
    if (needFilterNotes) {
      const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
      filterNotes(getCurrentUser, filter);
    }
  };

  renderNotebook() {
    const { allNotebooks, cookies } = this.props;
    const notebooks = _.map(allNotebooks, (notebook) => {
      return (
        <Notebook
          key={notebook.id}
          notebookId={notebook.id}
          notebook={notebook.data()}
          cookies={cookies}
        />
      );
    });
    if (!_.isEmpty(notebooks)) {
      return notebooks;
    }
  }

  componentDidMount() {
    const { fetchData, cookies, currentUser } = this.props;
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    fetchData(getCurrentUser);
  }

  render() {
    const menu = [
      {
        name: "All Notes",
        view: "noteAndEditor",
        child: null,
        needFilterNotes: true,
        filter: "",
      },
      {
        name: "Notebooks",
        view: "notebookList",
        child: this.renderNotebook(),
        needFilterNotes: true,
        filter: "",
      },
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
                  onClick={(e) => {
                    this.menuItemOnClickHandler(
                      item.view,
                      item.needFilterNotes,
                      item.filter,
                      e
                    );
                  }}
                >
                  {item.name}
                  <ul>{item.child}</ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const allNotebooks = state.allNotebooks;
  console.log(allNotebooks);
  const currentUser = state.currentUser;
  return { allNotebooks, currentUser };
};

export default connect(mapStateToProps, actions)(SideMenu);
