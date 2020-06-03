import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import _ from "lodash";
import Note from "./Note";
import NotebookActions from "./NotebookActions";
import { ReactComponent as ArrowRight } from "../images/arrowRight.svg";
import { ReactComponent as NotebookIcon } from "../images/notebook.svg";
import "../scss/components/notebookList.scss";

const Notebook = (props) => {
  const {
    cookies,
    currentUser,
    switchView,
    filterNotes,
    notebookId,
    notebook,
  } = props;
  const notesInThisNotebook = notebook.notes;
  const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
  const [expandNotebook, setExpandNotebook] = useState(false);

  const expandNotebookOnClickHandler = () => {
    setExpandNotebook((previousExpandNotebook) => !previousExpandNotebook);
  };

  const renderNotes = useCallback(() => {
    console.log("Notebook renderNotes");
    if (!_.isEmpty(notebook)) {
      console.log(notesInThisNotebook);
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
                notebookId={notebookId}
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
  }, [notebook, cookies, notebookId, notesInThisNotebook]);

  const renderNotebookInnerWrap = useCallback(() => {
    const notebookNameOnClickHandler = (e) => {
      const notebookId = e.target.closest("li").id;
      switchView("noteAndEditor");
      filterNotes(getCurrentUser, notebookId);
    };
    return (
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
          <span className="note-count">{`(${notesInThisNotebook.length})`}</span>
        </div>

        <div className="notebook-detail-and-actions">
          <div className="note-count">
            <span>{notesInThisNotebook.length}</span>
            <span>{` note${notesInThisNotebook.length > 1 ? "s" : ""}`}</span>
          </div>
          <p className="last-modified-time">
            {utils.getDisplayedTime(notebook.lastModifiedTime)}
          </p>
          {/* <p>{utils.getDisplayedDate(notebook.lastModifiedTime)}</p> */}
          <p className="is-default-notebook detail-item">
            {notebook.defaultNotebook.toString() === "true" ? "Default" : ""}
          </p>
          <NotebookActions
            cookies={cookies}
            currentUser={currentUser}
            notebook={notebook}
            notebookId={notebookId}
          />
        </div>
      </div>
    );
  }, [
    notebook,
    cookies,
    currentUser,
    notebookId,
    notesInThisNotebook.length,
    filterNotes,
    getCurrentUser,
    switchView,
  ]);

  return (
    <li id={notebookId} className="notebook-outer-wrap">
      {renderNotebookInnerWrap()}
      <ul className={`note-list ${expandNotebook ? "show" : ""}`}>
        {renderNotes()}
      </ul>
    </li>
  );
};

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  const defaultNotebook = state.defaultNotebook;
  return { currentUser, defaultNotebook };
};

export default connect(mapStateToProps, actions)(Notebook);
