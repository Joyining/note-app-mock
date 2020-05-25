import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as utils from "../utils";
import { v4 as uuidv4 } from "uuid";
import LightBoxBg from "./LightBoxBg";
import DeleteNoteLightBox from "./DeleteNoteLightBox";
import NoteDetailLightBox from "./NoteDetailLightBox";
import { ReactComponent as ActionVertical } from "../images/actionVertical.svg";
import { ReactComponent as ActionHorizontal } from "../images/actionHorizontal.svg";
import "../scss/components/noteActions.scss";

class NoteActions extends Component {
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

  menuOnClickHandler = (e) => {
    const { showMenu } = this.state;
    const { updateEditingNote } = this.props;
    const noteId = e.target.closest(".note-info-action-wrap").id;
    updateEditingNote(noteId);
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
    this.menuOnClickHandler(e);
    this.toggleLightBox(e);
    this.setState({
      currentLightBox: "deleteNote",
    });
  };

  copyNoteOnClickHandler = (e) => {
    console.log("click copy notebook");
    const {
      addNote,
      currentUser,
      updateEditingNote,
      editingNote,
      cookies,
      defaultNotebook,
      selectedNotebook,
    } = this.props;
    const noteId = uuidv4();
    this.menuOnClickHandler(e);
    let newContent = "";
    if (editingNote.content) {
      const insertPoint = editingNote.content.indexOf(">");
      newContent = `${editingNote.content.slice(
        0,
        insertPoint + 1
      )}Copy of ${editingNote.content.slice(insertPoint + 1)}`;
    }
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    const notebook = selectedNotebook.id ? selectedNotebook : defaultNotebook;
    addNote(noteId, getCurrentUser, notebook, newContent);
    updateEditingNote(noteId);
  };

  viewNoteDetailOnClickHandler = (e) => {
    this.menuOnClickHandler(e);
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
        <div className="note-actions-wrap">
          <div className="icon" onClick={this.menuOnClickHandler}>
            <ActionVertical className="vertical" />
            <ActionHorizontal className="horizontal" />
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
  const selectedNotebook = state.selectedNotebook;
  return {
    editingNote,
    isEditing,
    currentUser,
    defaultNotebook,
    selectedNotebook,
  };
};

export default connect(mapStateToProps, actions)(NoteActions);
