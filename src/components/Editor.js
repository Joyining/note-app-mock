import React, { Component } from "react";
import { connect } from "react-redux";
import { edit } from "../actions";
import ReactQuill from "react-quill";
import EditorMenu from "./EditorMenu";
import "react-quill/dist/quill.snow.css";
import "../scss/components/editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // accumulatedOnchangeCount: 1,
      localEditorValue: "",
      localNoteId: "",
    };
  }

  onchangeHandler = (value) => {
    let {
      // accumulatedOnchangeCount,
      localNoteId,
      localEditorValue,
    } = this.state;
    const { edit, editingNote, isEditing } = this.props;
    console.log(`onChange !!!!!!! ${value}`);
    console.log(editingNote.noteId);

    if (isEditing !== true && isEditing !== false) {
      this.setState({
        // accumulatedOnchangeCount: 1,
        localEditorValue: value,
        localNoteId: editingNote.noteId,
      });
    } else if (isEditing === true) {
      this.setState({
        // accumulatedOnchangeCount: accumulatedOnchangeCount + 1,
        localEditorValue: value,
        localNoteId: editingNote.noteId,
      });
    } else if (isEditing === false) {
      this.setState({
        // accumulatedOnchangeCount: 1,
        localEditorValue: value,
        localNoteId: editingNote.noteId,
      });
      // 前一次動作為切換note時，將之前的編輯結果edit出去
      // if (localNoteId) {
      //   edit(localNoteId, localEditorValue, isEditing);
      // }
    }

    // console.log("after: " + accumulatedOnchangeCount); // 加一後，下一次才會生效

    if (editingNote.noteId) {
      // if (
      //   accumulatedOnchangeCount === 1 ||
      //   (accumulatedOnchangeCount !== 0 && accumulatedOnchangeCount % 5 === 0)
      // ) {
      edit(editingNote.noteId, value, isEditing);
      // }
    }
  };

  render() {
    const { editingNote, isEditing } = this.props;
    const { localEditorValue, localNoteId } = this.state;
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
          <div className="last-modified">
            <p>Last Modified At: {lastModifiedDay}</p>
            <p>current editing: {editingNote.noteId}</p>
          </div>
          <EditorMenu />
        </div>

        {console.log("isEditing: " + isEditing)}
        {console.log(`localNoteId: ${localNoteId}`)}
        {console.log(`editingNote.noteId: ${editingNote.noteId}`)}
        <div>
          <ReactQuill
            value={
              localNoteId === editingNote.noteId
                ? localEditorValue
                : editingNote.noteContent
            }
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
