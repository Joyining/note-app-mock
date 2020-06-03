import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import * as utils from "../utils";
import Notebook from "./Notebook";
import { ReactComponent as AllNotesIcon } from "../images/allNote.svg";
import { ReactComponent as NotebookIcon } from "../images/notebookFill.svg";

class SideMenu extends Component {
  menuItemOnClickHandler = (view, needFilterNotes, filter, e) => {
    const { switchView, filterNotes, cookies, currentUser } = this.props;
    switchView(view);
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
        icon: <AllNotesIcon />,
        view: "noteAndEditor",
        child: null,
        needFilterNotes: true,
        filter: "",
        pc: true,
        mobile: true,
      },
      {
        name: "Notebooks",
        icon: <NotebookIcon />,
        view: "notebookList",
        child: this.renderNotebook(),
        needFilterNotes: true,
        filter: "",
        pc: true,
        mobile: false,
      },
      {
        name: "Notebooks",
        icon: <NotebookIcon />,
        view: "side",
        child: this.renderNotebook(),
        needFilterNotes: false,
        filter: "",
        pc: false,
        mobile: true,
      },
    ];
    return (
      <div>
        <div className="side-menu-wrap">
          <ul className="menu-list">
            {menu.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`menu-item ${
                    !item.mobile ? "hide-in-mobile" : ""
                  } ${!item.pc ? "hide-in-pc" : ""}`}
                >
                  <p
                    className="icon-and-name"
                    onClick={(e) => {
                      this.menuItemOnClickHandler(
                        item.view,
                        item.needFilterNotes,
                        item.filter,
                        e
                      );
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </p>
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
