import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import DOMPurify from "dompurify";
import NoteActions from "./NoteActions";
import "../scss/components/noteList.scss";

class Note extends Component {
  edit = (noteId) => {
    const { updateEditingNote } = this.props;
    updateEditingNote(noteId);
  };

  calculateDisplayedLastModifiedTime = (lastModifiedTime) => {
    let result = "";
    const now = new Date();
    const dateObj = lastModifiedTime.toDate();
    const lastModifiedDay = `${dateObj.getFullYear()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}`;
    const diffInSecond = Math.floor(
      now.getTime() / 1000 - dateObj.getTime() / 1000
    );
    switch (true) {
      case diffInSecond < 60:
        result = `Few seconds ago`;
        break;
      case diffInSecond >= 60 && diffInSecond < 60 * 60:
        result = `${Math.floor(diffInSecond / 60)} minutes ago`;
        break;
      case diffInSecond >= 60 * 60 && diffInSecond < 60 * 60 * 24:
        result = `${Math.floor(diffInSecond / (60 * 60))} hours ago`;
        break;
      case diffInSecond >= 60 * 60 * 24:
        result = lastModifiedDay;
        break;
      default:
        break;
    }
    return result;
  };

  getDisplayedDate = (originTime) => {
    if (originTime) {
      const dateObj = originTime.toDate();
      return dateObj
        ? `${dateObj.getFullYear()}/${
            dateObj.getMonth() + 1
          }/${dateObj.getDate()}`
        : "";
    }
  };
  getDisplayedTime = (originTime) => {
    if (originTime) {
      const dateObj = originTime.toDate();
      return dateObj
        ? `${dateObj.getFullYear()}/${
            dateObj.getMonth() + 1
          }/${dateObj.getDate()}  ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
        : "";
    }
  };

  render() {
    const {
      noteId,
      content,
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
          {this.calculateDisplayedLastModifiedTime(lastModifiedTime)}
        </p>

        <div>
          {/* remove later */}
          <p className="last-modified-time">
            will be removed >>> Last Modified At:{" "}
            {this.getDisplayedTime(lastModifiedTime)}
          </p>
          {/* remove later */}
          <p className="notebook-name">{notebookName}</p>
          <p className="last-modified-date">
            Last Modified At: {this.getDisplayedDate(lastModifiedTime)}
          </p>
        </div>

        <div className="note-info">
          <p className="note-name-and-icon">
            <svg
              className="note-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="80a"
                d="M8 5a1 1 0 00-1 1v11a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H8zm8 11h1v-1h-1a.997.997 0 00-1 1v2h1v-2zM8 4h8a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2zm1.5 4a.5.5 0 000 1h5a.5.5 0 100-1h-5zm0 3a.5.5 0 100 1h5a.5.5 0 100-1h-5zm0 3a.5.5 0 100 1h3a.5.5 0 100-1h-3z"
              ></path>
            </svg>
            <span className="note-title">{title}</span>
          </p>

          <p className="note-detail">
            <span className="last-modified-date">
              {this.getDisplayedDate(lastModifiedTime)}
            </span>
          </p>
          <NoteActions cookies={cookies} />
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
