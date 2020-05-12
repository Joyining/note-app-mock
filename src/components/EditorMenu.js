import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote, updateEditingNote } from "../actions";
import { v4 as uuidv4 } from "uuid";
import DeleteNoteLightBox from "./DeleteNoteLightBox";
import "../scss/components/editorMenu.scss";

class EditorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showLightBox: false,
      currentLightBox: "",
    };
  }

  renderLightBoxMessage = () => {
    const { currentLightBox } = this.state;
    switch (currentLightBox) {
      case "deleteNote":
        return <DeleteNoteLightBox toggleLightBox={this.toggleLightBox} />;

      default:
        break;
    }
  };

  menuOnClickHandler = () => {
    const { showMenu } = this.state;
    this.setState({
      showMenu: showMenu ? false : true,
    });
  };

  toggleLightBox = (e) => {
    console.log("toggle light box!!!!!");
    const { showLightBox } = this.state;
    if (e.target === e.currentTarget) {
      this.setState({
        showLightBox: showLightBox ? false : true,
      });
    }
  };

  deleteNoteOnClickHandler = (e) => {
    this.menuOnClickHandler();
    this.toggleLightBox(e);
    this.setState({
      currentLightBox: "deleteNote",
    });
  };

  copyNoteOnClickHandler = () => {
    const { addNote, updateEditingNote, editingNote } = this.props;
    const noteId = uuidv4();
    this.menuOnClickHandler();
    let newTitle = "";
    if (editingNote.content) {
      const insertPoint = editingNote.content.indexOf(">");
      newTitle = `${editingNote.content.slice(
        0,
        insertPoint + 1
      )}Copy of ${editingNote.content.slice(insertPoint + 1)}`;
    }
    addNote(noteId, {
      createdTime: new Date(),
      lastModifiedTime: new Date(),
      content: newTitle,
    });
    updateEditingNote(noteId);
  };

  render() {
    const { showMenu, showLightBox } = this.state;
    const menu = [
      { name: "Delete Note", onClick: this.deleteNoteOnClickHandler },
      { name: "Copy Note", onClick: this.copyNoteOnClickHandler },
    ];
    return (
      <div>
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
                <li
                  key={item.name}
                  className="menu-item"
                  onClick={item.onClick}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={showLightBox ? "light-box show" : "light-box"}
          onClick={this.toggleLightBox}
        >
          {this.renderLightBoxMessage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const editingNote = state.editingNote;
  const isEditing = state.isEditing;
  return { editingNote, isEditing };
};

export default connect(mapStateToProps, { addNote, updateEditingNote })(
  EditorMenu
);
