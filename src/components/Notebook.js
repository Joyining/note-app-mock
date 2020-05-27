import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import _ from "lodash";
import Note from "./Note";
import { ReactComponent as ArrowRight } from "../images/arrowRight.svg";
import { ReactComponent as NotebookIcon } from "../images/notebook.svg";
import { ReactComponent as ActionIcon } from "../images/actionHorizontal.svg";
import "../firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "../scss/components/notebookList.scss";

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      expandNotebook: false,
    };
  }
  notebookNameOnClickHandler = (e) => {
    const { cookies, currentUser, switchView, filterNotes } = this.props;
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    const notebookId = e.target.closest("li").id;
    switchView("noteAndEditor");
    filterNotes(getCurrentUser, notebookId);
  };
  actionOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };
  setAsDefaultOnClickHandler = () => {
    const {
      notebookId,
      cookies,
      currentUser,
      setAsDefaultNotebook,
    } = this.props;
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    setAsDefaultNotebook(notebookId, getCurrentUser);
  };

  expandNotebook = () => {
    const { expandNotebook } = this.state;
    this.setState({
      expandNotebook: expandNotebook ? false : true,
    });
  };

  renderNotes = () => {
    const { allNotebooks, notebookId, cookies } = this.props;
    let thisNotebook = null;
    let notesInThisNotebook = null;
    if (allNotebooks) {
      allNotebooks.map((notebook) => {
        if (notebook.notebookInfo.id === notebookId) {
          thisNotebook = notebook;
        }
      });
      if (thisNotebook) {
        notesInThisNotebook = thisNotebook.notes;
      }
      if (notesInThisNotebook) {
        notesInThisNotebook.sort((noteA, noteB) => {
          return noteB.lastModifiedTime - noteA.lastModifiedTime;
        });
        const result = notesInThisNotebook.map((note) => {
          return (
            <li
              className="note note-info-action-wrap"
              key={note.id}
              id={note.id}
            >
              <Note
                noteId={note.id}
                title={note.title}
                lastModifiedTime={note.lastModifiedTime}
                cookies={cookies}
              />
            </li>
          );
        });
        if (!_.isEmpty(result)) {
          return result;
        }
      }
    }
  };

  componentDidUpdate() {
    console.log("Notebook componentDidUpdate");
  }

  render() {
    console.log("render!");
    const { notebookId, notebook, cookies } = this.props;
    const { showMenu, expandNotebook } = this.state;
    const menu = [
      {
        name: "Set as Default Notebook",
        onClick: this.setAsDefaultOnClickHandler,
      },
    ];
    return (
      <li id={notebookId} className="notebook-outer-wrap">
        <div className="notebook-inner-wrap">
          <div className="notebook-name-and-icon">
            <ArrowRight className="expand-icon" onClick={this.expandNotebook} />
            <NotebookIcon className="notebook-icon" />
            <p
              className="notebook-name"
              onClick={this.notebookNameOnClickHandler}
            >
              {notebook.name}
            </p>
            <span className="note-count">{`(${notebook.notes.length})`}</span>
          </div>

          <div className="notebook-detail-and-actions">
            <div className="note-count">
              <span>{notebook.notes.length}</span>
              <span>{` note${notebook.notes.length > 1 ? "s" : ""}`}</span>
            </div>
            <p className="last-modified-time">
              {utils.getDisplayedTime(notebook.lastModifiedTime)}
            </p>
            {/* <p>{utils.getDisplayedDate(notebook.lastModifiedTime)}</p> */}
            <p className="is-default-notebook detail-item">
              {notebook.defaultNotebook.toString() === "true" ? "Default" : ""}
            </p>
            <div className={`actions detail-item ${notebookId}`}>
              <ActionIcon
                className="icon"
                onClick={this.actionOnClickHandler}
              />
              <ul
                className={
                  showMenu ? "shared-menu-list show" : "shared-menu-list"
                }
              >
                {menu.map((item) => {
                  return (
                    <li
                      key={item.name}
                      className="menu-item"
                      onClick={item.onClick}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <ul className={`note-list ${expandNotebook ? "show" : ""}`}>
          {this.renderNotes()}
        </ul>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  const allNotebooks = state.allNotebooks;
  return { currentUser, allNotebooks };
};

export default connect(mapStateToProps, actions)(Notebook);
