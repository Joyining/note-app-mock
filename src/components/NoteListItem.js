import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEditingNote } from "../actions";
import DOMPurify from "dompurify";
import "../scss/components/noteList.scss";

class NoteListItem extends Component {
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

  render() {
    const { noteId, note, editingNote } = this.props;
    return (
      <div
        id={noteId}
        className={`note-item-outer ${
          editingNote.id === noteId ? "active" : ""
        }`}
        onClick={() => this.edit(noteId)}
      >
        <div
          className="note-item-inner"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(note.content),
          }}
        ></div>
        <p className="last-modified">
          {this.calculateDisplayedLastModifiedTime(note.lastModifiedTime)}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  return { editingNote };
};

export default connect(mapStateToProps, { updateEditingNote })(NoteListItem);

// This file will render each individual Note item. When clicking each Note item, it will update the current editing Note. This is achieved with the help of the updateEditingNote action that we had created in the actions section of this post. The actions are connected to the component with the help of the connect method of react-redux library.
