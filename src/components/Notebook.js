import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Note from "./Note";
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
      notes: [],
    };
  }
  notebookNameOnClickHandler = (e) => {
    const { cookies, currentUser, switchView, filterNotes } = this.props;
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
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
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    setAsDefaultNotebook(notebookId, getCurrentUser);
  };

  expandNotebook = () => {
    const { expandNotebook } = this.state;
    const { notebookId, notebook } = this.props;
    const notesIdArray = notebook.notes;
    const db = firebase.firestore();
    let notes = [];
    notesIdArray.map((id) => {
      const noteRef = db.collection("notes").doc(id);
      noteRef.get().then((snapShot) => {
        const data = snapShot.data();
        const noteObj = {
          id: id,
          title: data.title,
          lastModifiedTime: data.lastModifiedTime,
          owner: data.owner,
        };
        notes.push(noteObj);
        this.setState({
          notes: notes,
        });
      });
    });

    this.setState({
      expandNotebook: expandNotebook ? false : true,
    });
  };

  componentDidUpdate() {
    console.log("Notebook componentDidUpdate");
  }

  render() {
    console.log("render!");
    const { notebookId, notebook, cookies } = this.props;
    const { showMenu, notes } = this.state;
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
            <svg
              width="6"
              height="9"
              viewBox="2 240 6 9"
              xmlns="http://www.w3.org/2000/svg"
              className="expand-icon"
              onClick={this.expandNotebook}
            >
              <path
                fill="#9B9B9B"
                fillRule="evenodd"
                d="M2 240l6 4.5-6 4.5z"
              ></path>
            </svg>
            <svg
              className="notebook-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                fillRule="evenodd"
                d="M3 2v10h7a1 1 0 001-1V3a1 1 0 00-1-1H3zM2 1h8a2 2 0 012 2v8a2 2 0 01-2 2H2V1zm2 1v10h1V2H4zm2 3v1h4V5H6z"
              ></path>
            </svg>
            <p
              className="notebook-name"
              onClick={this.notebookNameOnClickHandler}
            >
              {notebook.name}
            </p>
            <div className="note-count">
              <span>{`(${notebook.notes.length})`}</span>
            </div>
          </div>

          <div className="notebook-detail-and-actions">
            <div className="note-count">
              <span>{notebook.notes.length}</span>
              <span>{` note${notebook.notes.length > 1 ? "s" : ""}`}</span>
            </div>
            <p className="is-default-notebook detail-item">
              {notebook.defaultNotebook.toString() === "true" ? "Default" : ""}
            </p>
            <div className={`actions detail-item ${notebookId}`}>
              <div className="icon" onClick={this.actionOnClickHandler}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  id="qa-NOTEBOOK_ACTIONS"
                >
                  <path d="M16 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path>
                </svg>
              </div>
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
        <ul className="note-list">
          {notes.map((note) => {
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
          })}
        </ul>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  return { currentUser };
};

export default connect(mapStateToProps, actions)(Notebook);
