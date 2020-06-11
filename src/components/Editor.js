import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactQuill from "react-quill";
import Note from "./Note";
import "react-quill/dist/quill.snow.css";
import "../scss/components/editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localEditorValue: "",
      localNoteId: "",
    };
  }

  onchangeHandler = (value) => {
    const { editNote, editingNote, isEditing } = this.props;

    this.setState({
      localEditorValue: value,
      localNoteId: editingNote.id,
    });

    if (isEditing === false) {
      const qlEditor = document.getElementsByClassName("ql-editor")[0];
      qlEditor.scrollTop = 0;
    }

    if (editingNote.id) {
      editNote(editingNote.notebookId, editingNote.id, value, isEditing);
    }
  };

  render() {
    const { editingNote, isEditing, cookies } = this.props;
    const { localEditorValue, localNoteId } = this.state;
    return (
      <div className="editor-wrap">
        <div className="editor-top note-info-action-wrap" id={editingNote.id}>
          <Note
            noteId={editingNote.id}
            notebookId={editingNote.notebookId}
            notebookName={editingNote.notebookName}
            lastModifiedTime={editingNote.lastModifiedTime}
            cookies={cookies}
          />
        </div>
        <div>
          <ReactQuill
            value={
              localNoteId === editingNote.id
                ? localEditorValue
                : editingNote.content
            }
            onChange={this.onchangeHandler}
          />
        </div>
        <div className="editor-bottom">
          {/* <p>tag area</p>
          <p>current editing: {editingNote.id}</p> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  const isEditing = state.isEditing;
  return { editingNote, isEditing };
};

export default connect(mapStateToProps, actions)(Editor);
