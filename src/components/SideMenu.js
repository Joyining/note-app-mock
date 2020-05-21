import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import NotebookListItem from "./NotebookListItem";

class SideMenu extends Component {
  menuItemOnClickHandler = (view, needFilterNotes, filter, e) => {
    const { switchView, filterNotes, cookies, currentUser } = this.props;
    if (e.target === e.currentTarget) {
      switchView(view);
    }
    if (needFilterNotes) {
      const getCurrentUser = cookies.get("currentUser")
        ? cookies.get("currentUser")
        : currentUser.toString();
      filterNotes(getCurrentUser, filter);
    }
  };

  renderNotebook() {
    const { allNotebooks, cookies } = this.props;
    const ntoebooks = _.map(allNotebooks, (notebook) => {
      return (
        <NotebookListItem
          key={notebook.id}
          notebookId={notebook.id}
          notebook={notebook.data()}
          cookies={cookies}
        />
      );
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
  const currentUser = state.currentUser;
  return { allNotebooks, currentUser };
};

export default connect(mapStateToProps, actions)(SideMenu);
