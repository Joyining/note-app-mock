import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import NotebookListItem from "./NotebookListItem";

class SideMenu extends Component {
  menuItemOnClickHandler = (view, needFetchNotes, fetchNotesFilter, e) => {
    const { switchView, fetchNotes, cookies, currentUser } = this.props;
    if (e.target === e.currentTarget) {
      switchView(view);
    }
    if (needFetchNotes) {
      const getCurrentUser = cookies.get("currentUser")
        ? cookies.get("currentUser")
        : currentUser.toString();
      fetchNotes(getCurrentUser, fetchNotesFilter);
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
        needFetchNotes: true,
        fetchNotesFilter: "",
      },
      {
        name: "Notebooks",
        view: "notebookList",
        child: this.renderNotebook(),
        needFetchNotes: false,
        fetchNotesFilter: null,
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
                      item.needFetchNotes,
                      item.fetchNotesFilter,
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
