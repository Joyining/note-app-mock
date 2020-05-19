import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { v4 as uuidv4 } from "uuid";
import LightBoxBg from "./LightBoxBg";
import DeleteNoteLightBox from "./DeleteNoteLightBox";
import NoteDetailLightBox from "./NoteDetailLightBox";
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
      case "viewNoteDetail":
        return <NoteDetailLightBox toggleLightBox={this.toggleLightBox} />;
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
    console.log("click copy notebook");
    const {
      addNote,
      currentUser,
      updateEditingNote,
      editingNote,
      cookies,
      defaultNotebook,
    } = this.props;
    const noteId = uuidv4();
    this.menuOnClickHandler();
    let newContent = "";
    if (editingNote.content) {
      const insertPoint = editingNote.content.indexOf(">");
      newContent = `${editingNote.content.slice(
        0,
        insertPoint + 1
      )}Copy of ${editingNote.content.slice(insertPoint + 1)}`;
    }
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    addNote(noteId, getCurrentUser, defaultNotebook, newContent);
    updateEditingNote(noteId);
  };

  viewNoteDetailOnClickHandler = (e) => {
    this.menuOnClickHandler();
    this.toggleLightBox(e);
    this.setState({
      currentLightBox: "viewNoteDetail",
    });
  };

  render() {
    const { showMenu, showLightBox } = this.state;
    const menu = [
      { name: "Delete Note", onClick: this.deleteNoteOnClickHandler },
      { name: "Copy Note", onClick: this.copyNoteOnClickHandler },
      { name: "View Note Detail", onClick: this.viewNoteDetailOnClickHandler },
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
          <ul
            className={showMenu ? "shared-menu-list show" : "shared-menu-list"}
          >
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
        <LightBoxBg
          showLightBox={showLightBox}
          toggleLightBox={this.toggleLightBox}
          renderLightBoxMessage={this.renderLightBoxMessage}
        ></LightBoxBg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  const isEditing = state.isEditing;
  const currentUser = state.currentUser;
  const defaultNotebook = state.defaultNotebook;
  return { editingNote, isEditing, currentUser, defaultNotebook };
};

export default connect(mapStateToProps, actions)(EditorMenu);
