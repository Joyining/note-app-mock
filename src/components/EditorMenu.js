import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote } from "../actions";
import "../scss/components/editorMenu.scss";

class EditorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  menuOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };

  deleteNoteOnClickHandler = () => {
    const { editingNote, deleteNote } = this.props;
    deleteNote(editingNote.id);
    this.menuOnClickHandler();
  };

  render() {
    const { showMenu } = this.state;
    const menu = [
      { name: "Delete Note", onClick: this.deleteNoteOnClickHandler },
    ];
    return (
      <div className="editor-menu-wrap">
        <div className="icon" onClick={this.menuOnClickHandler}>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="qa-NOTE_ACTIONS"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </div>
        <ul className={showMenu ? "menu-list show" : "menu-list"}>
          {menu.map((item) => {
            return (
              <li key={item.name} className="menu-item" onClick={item.onClick}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const editingNote = state.editingNote;
  const isEditing = state.isEditing;
  // console.log(editingNote.id);
  // console.log(editingNote.content);
  return { editingNote, isEditing };
};

export default connect(mapStateToProps, { deleteNote })(EditorMenu);
