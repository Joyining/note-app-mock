import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import _ from "lodash";
import Note from "./Note";
import { ReactComponent as ArrowRight } from "../images/arrowRight.svg";
import { ReactComponent as NotebookIcon } from "../images/notebook.svg";
import { ReactComponent as ActionIcon } from "../images/actionHorizontal.svg";
import "../scss/components/notebookList.scss";

const Notebook = (props) => {
  const {
    cookies,
    currentUser,
    switchView,
    filterNotes,
    notebookId,
    setAsDefaultNotebook,
    thisNotebook,
    notebook,
  } = props;
  const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
  const [showMenu, setShowMenu] = useState(false);
  const [expandNotebook, setExpandNotebook] = useState(false);

  const notebookNameOnClickHandler = (e) => {
    const notebookId = e.target.closest("li").id;
    switchView("noteAndEditor");
    filterNotes(getCurrentUser, notebookId);
  };

  const actionOnClickHandler = () => {
    setShowMenu(showMenu ? false : true);
  };

  const setAsDefaultOnClickHandler = () => {
    setAsDefaultNotebook(notebookId, getCurrentUser);
  };

  const expandNotebookOnClickHandler = () => {
    setExpandNotebook(expandNotebook ? false : true);
  };

  const renderNotes = () => {
    console.log("Notebook renderNotes");
    console.log(notebookId);
    let notesInThisNotebook = null;
    if (thisNotebook) {
      console.log(thisNotebook);
      notesInThisNotebook = thisNotebook.notes;
      console.log(notesInThisNotebook);
      if (notesInThisNotebook) {
        notesInThisNotebook.sort((noteA, noteB) => {
          return noteB.lastModifiedTime - noteA.lastModifiedTime;
        });
        console.log(notesInThisNotebook);
        const result = notesInThisNotebook.map((note) => {
          console.log(note.id);
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
        console.log(result);
        if (!_.isEmpty(result)) {
          return result;
        }
      }
    }
  };

  const menu = [
    {
      name: "Set as Default Notebook",
      onClick: setAsDefaultOnClickHandler,
    },
  ];
  return (
    <li id={notebookId} className="notebook-outer-wrap">
      <div className="notebook-inner-wrap">
        <div className="notebook-name-and-icon">
          <ArrowRight
            className="expand-icon"
            onClick={expandNotebookOnClickHandler}
          />
          <NotebookIcon className="notebook-icon" />
          <p className="notebook-name" onClick={notebookNameOnClickHandler}>
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
            <ActionIcon className="icon" onClick={actionOnClickHandler} />
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
        {renderNotes()}
      </ul>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.currentUser;
  const allNotebooks = state.allNotebooks;
  const notebookId = ownProps.notebookId;
  let thisNotebook = null;
  // 可以只map allNotebooks裡面的這一個notebook嗎？
  for (let notebook of allNotebooks) {
    if (notebook.notebookInfo.id === notebookId) {
      thisNotebook = notebook;
      break;
    }
  }
  return { currentUser, thisNotebook };
};

export default connect(mapStateToProps, actions)(Notebook);
