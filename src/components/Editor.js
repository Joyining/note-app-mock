import React, { Component } from "react";
import { connect } from "react-redux";
import { edit } from "../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../scss/components/editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accumulatedOnchangeCount: 1,
      localEditorValue: "",
      localEditorValueId: "",
    };
  }

  onchangeHandler = (value) => {
    let {
      accumulatedOnchangeCount,
      localEditorValueId,
      localEditorValue,
    } = this.state;
    const { edit, editingNote, isEditing } = this.props;
    console.log(`onChange !!!!!!! ${value}`);
    console.log("before: " + accumulatedOnchangeCount);
    console.log(editingNote.noteId);

    if (isEditing !== true && isEditing !== false) {
      this.setState({
        accumulatedOnchangeCount: 1,
        localEditorValue: value,
        localEditorValueId: editingNote.noteId,
      });
    } else if (isEditing === true) {
      this.setState({
        accumulatedOnchangeCount: accumulatedOnchangeCount + 1,
        localEditorValue: value,
        localEditorValueId: editingNote.noteId,
      });
    } else if (isEditing === false) {
      this.setState({
        accumulatedOnchangeCount: 1,
        localEditorValue: value,
        localEditorValueId: editingNote.noteId,
      });
      if (localEditorValueId) {
        edit(localEditorValueId, localEditorValue, isEditing);
      }
    }

    console.log("after: " + accumulatedOnchangeCount); // 加一後，下一次才會生效

    if (editingNote.noteId) {
      if (accumulatedOnchangeCount === 1) {
        this.setState({
          localEditorValue: value,
        });
        edit(editingNote.noteId, value, isEditing);
      } else if (
        accumulatedOnchangeCount !== 0 &&
        accumulatedOnchangeCount % 5 === 0
      ) {
        edit(editingNote.noteId, value, isEditing);
      }
    }
  };

  render() {
    const { editingNote, isEditing } = this.props;
    const { localEditorValue } = this.state;
    const dateObj = editingNote.lastModifiedTime
      ? editingNote.lastModifiedTime.toDate()
      : null;
    const lastModifiedDay = dateObj
      ? `${dateObj.getFullYear()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}  ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
      : "";
    return (
      <div className="editor-wrap">
        <div className="editor-top">
          <p className="last-modified">Last Modified At: {lastModifiedDay}</p>
          <p>current editing: {editingNote.noteId}</p>
        </div>
        <div>
          <ReactQuill
            value={isEditing ? localEditorValue : editingNote.noteContent}
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
  const isEditing = state.isEditing;
  // console.log(editingNote.noteId);
  // console.log(editingNote.noteContent);
  return { editingNote, isEditing };
};

export default connect(mapStateToProps, { edit })(Editor);
