import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEditingNote } from "../actions";
import DOMPurify from "dompurify";
import "../scss/components/list.scss";

class ListItem extends Component {
  edit = (noteId) => {
    const { updateEditingNote } = this.props;
    updateEditingNote(noteId);
  };

  render() {
    const { noteId, note } = this.props;
    return (
      <div
        id={noteId}
        className="note-item-outer"
        onClick={() => this.edit(noteId)}
      >
        <div
          className="note-item-inner"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(note.content),
          }}
        ></div>
      </div>
    );
  }
}

export default connect(null, { updateEditingNote })(ListItem);

// This file will render each individual Note item. When clicking each Note item, it will update the current editing Note. This is achieved with the help of the updateEditingNote action that we had created in the actions section of this post. The actions are connected to the component with the help of the connect method of react-redux library.
