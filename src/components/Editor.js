import React, { Component } from "react";
import { connect } from "react-redux";
import { edit } from "../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../scss/components/editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  onchangeHandler = (value) => {
    const { edit, editingNote } = this.props;
    edit(editingNote.noteId, value);
  };

  render() {
    const { editingNote } = this.props;
    return (
      <div className="editor-wrap">
        <p className="editor-top">current editing: {editingNote.noteId}</p>
        <div>
          <ReactQuill
            value={editingNote.noteContent}
            onChange={this.onchangeHandler}
          />
        </div>
        <p className="editor-bottom">tag area</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const editingNote = state.editingNote;
  console.log(editingNote.noteId);
  console.log(editingNote.noteContent);
  return { editingNote };
};

export default connect(mapStateToProps, { edit })(Editor);
