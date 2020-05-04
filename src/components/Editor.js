import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { editingNote } = this.props;
    return (
      <div className="editor-wrap">
        <p>this is editor</p>
        <p>current editing: {editingNote.toString()}</p>
        <form>
          <div>
            <input id="" type="text" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const editingNote = state.editingNote;
  console.log(editingNote);
  return { editingNote };
};

export default connect(mapStateToProps)(Editor);
