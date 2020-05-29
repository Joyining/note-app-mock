import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import DOMPurify from "dompurify";
import NoteActions from "./NoteActions";
import { ReactComponent as NoteIcon } from "../images/note.svg";
import "../scss/components/noteList.scss";

class Note extends Component {
  edit = (noteId) => {
    const { updateEditingNote, notebookId } = this.props;
    updateEditingNote(notebookId, noteId);
  };

  render() {
    const {
      noteId,
      content,
      notebookId,
      notebookName,
      title,
      lastModifiedTime,
      editingNote,
      cookies,
    } = this.props;
    return (
      <div
        id={noteId}
        className={`note-outer-wrap ${
          editingNote.id === noteId ? "active" : ""
        }`}
        onClick={() => this.edit(noteId)}
      >
        <div
          className="partial-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        ></div>
        <p className="last-modified-ago">
          {utils.getDisplayedTimeAgo(lastModifiedTime)}
        </p>

        <div>
          {/* remove later */}
          <p className="last-modified-time">
            will be removed >>> Last Modified At:{" "}
            {utils.getDisplayedTime(lastModifiedTime)}
          </p>
          {/* remove later */}
          <p className="notebook-name">{notebookName}</p>
          <p className="last-modified-date">
            Last Modified At: {utils.getDisplayedDate(lastModifiedTime)}
          </p>
        </div>

        <div className="note-info">
          <p className="note-name-and-icon">
            <NoteIcon className="note-icon" />
            <span className="note-title">{title}</span>
          </p>

          <p className="note-detail">
            <span className="last-modified-date">
              {utils.getDisplayedDate(lastModifiedTime)}
            </span>
          </p>
          <NoteActions cookies={cookies} notebookId={notebookId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  return { editingNote };
};

export default connect(mapStateToProps, actions)(Note);

// This file will render each individual Note item. When clicking each Note item, it will update the current editing Note. This is achieved with the help of the updateEditingNote action that we had created in the actions section of this post. The actions are connected to the component with the help of the connect method of react-redux library.
