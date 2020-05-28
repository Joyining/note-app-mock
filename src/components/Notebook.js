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
    notebook,
  } = props;
  const notebookInfo = notebook.notebookInfo.data();
  const notesInThisNotebook = notebook.notes;
  const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
  const [showMenu, setShowMenu] = useState(false);
  const [expandNotebook, setExpandNotebook] = useState(false);

  const notebookNameOnClickHandler = (e) => {
    const notebookId = e.target.closest("li").id;
    switchView("noteAndEditor");
    filterNotes(getCurrentUser, notebookId);
  };

  const actionOnClickHandler = () => {
    setShowMenu((previousShowMenu) => !previousShowMenu);
  };

  const setAsDefaultOnClickHandler = () => {
    setAsDefaultNotebook(notebookId, getCurrentUser);
  };

  const expandNotebookOnClickHandler = () => {
    console.log("expandNotebookOnClickHandler");
    setExpandNotebook((previousExpandNotebook) => !previousExpandNotebook);
  };

  const renderNotes = useCallback(() => {
    console.log("Notebook renderNotes");
    console.log(notebookId);
    if (!_.isEmpty(notebook)) {
      console.log(notebook);
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
  }, [notebookInfo.lastModifiedTime.toString()]);

  const renderNotebookInnerWrap = useCallback(() => {
    return (
      <div className="notebook-inner-wrap">
        <div className="notebook-name-and-icon">
          <ArrowRight
            className="expand-icon"
            onClick={expandNotebookOnClickHandler}
          />
          <NotebookIcon className="notebook-icon" />
          <p className="notebook-name" onClick={notebookNameOnClickHandler}>
            {notebookInfo.name}
          </p>
          <span className="note-count">{`(${notesInThisNotebook.length})`}</span>
        </div>

        <div className="notebook-detail-and-actions">
          <div className="note-count">
            <span>{notesInThisNotebook.length}</span>
            <span>{` note${notesInThisNotebook.length > 1 ? "s" : ""}`}</span>
          </div>
          <p className="last-modified-time">
            {utils.getDisplayedTime(notebookInfo.lastModifiedTime)}
          </p>
          {/* <p>{utils.getDisplayedDate(notebook.lastModifiedTime)}</p> */}
          <p className="is-default-notebook detail-item">
            {notebookInfo.defaultNotebook.toString() === "true"
              ? "Default"
              : ""}
          </p>
          <div className={`actions detail-item ${notebookId}`}>
            <ActionIcon className="icon" onClick={actionOnClickHandler} />
            <ul className="shared-menu-list">
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
    );
  }, [notebookInfo.lastModifiedTime.toString()]);

  const menu = [
    {
      name: "Set as Default Notebook",
      onClick: setAsDefaultOnClickHandler,
    },
  ];
  return (
    <li
      id={notebookId}
      className={`notebook-outer-wrap ${showMenu ? "show-menu" : ""}`}
    >
      {/* <h1>{notebookInfo.lastModifiedTime.toString()}</h1> */}
      {renderNotebookInnerWrap()}
      <ul className={`note-list ${expandNotebook ? "show" : ""}`}>
        {renderNotes()}
      </ul>
    </li>
  );
};

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  // const allNotebooks = state.allNotebooks;
  // const notebookId = ownProps.notebookId;
  // let thisNotebook = null;
  // 可以只map allNotebooks裡面的這一個notebook嗎？
  // for (let notebook of allNotebooks) {
  //   if (notebook.notebookInfo.id === notebookId) {
  //     thisNotebook = notebook;
  //     break;
  //   }
  // }
  return { currentUser };
};

export default connect(mapStateToProps, actions)(Notebook);
