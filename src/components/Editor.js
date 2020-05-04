import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   noteContent: "",
    // };
  }

  render() {
    const { editingNote } = this.props;
    return (
      <div className="editor-wrap">
        <p>this is editor</p>
        <p>current editing: {editingNote.noteId}</p>
        <form>
          <div>
            <input
              id="edit-area"
              type="text"
              className="edit-area"
              value={editingNote.noteContent}
            ></input>
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

export default connect(mapStateToProps)(Editor);
