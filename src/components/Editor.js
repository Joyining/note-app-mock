import React, { Component } from "react";
import { connect } from "react-redux";
import { edit } from "../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

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
        <p>current editing: {editingNote.noteId}</p>
        <form>
          <div>
            <ReactQuill
              value={editingNote.noteContent}
              onChange={this.onchangeHandler}
            />
          </div>
        </form>
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
