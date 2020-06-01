import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NoteList from "./NoteList";
import Editor from "./Editor";
import NotebookList from "./NotebookList";
import AddNote from "./AddNote";
import * as actions from "../actions";
import * as utils from "../utils";
import "../scss/base/_base.scss";

class Main extends Component {
  // isEmptyNotes = (obj) => {
  //   const hasOwnProperty = Object.prototype.hasOwnProperty;
  //   for (let key in obj) {
  //     if (hasOwnProperty.call(obj, key)) return false;
  //   }
  //   return true;
  // };

  renderView = () => {
    const { currentView, allNotes, cookies, selectedNotebook } = this.props;
    // is loadash slower??
    if (_.isEmpty(allNotes) && !selectedNotebook.id) {
      return (
        <div className="main-wrap">
          <div className="empty-note-message">
            <p>You don't have any note yet.</p>
            <p>Create your first note now.</p>
            <AddNote cookies={cookies}></AddNote>
          </div>
        </div>
      );
    } else {
      switch (currentView) {
        case "notebookList":
          return (
            <div className="main-wrap">
              <NotebookList cookies={cookies} />
            </div>
          );
        case "editorOnly":
          return (
            <div className="main-wrap">
              <Editor cookies={cookies} />
            </div>
          );
        case "noteAndEditor":
        default:
          if (allNotes.length === 0) {
            return (
              <div className="main-wrap">
                <NoteList cookies={cookies} />
              </div>
            );
          } else {
            return (
              <div className="main-wrap">
                <NoteList cookies={cookies} />
                <Editor cookies={cookies} />
              </div>
            );
          }
      }
    }
  };

  componentDidMount() {
    const { fetchData, currentUser, cookies } = this.props;
    const getCurrentUser = utils.getCurrentUser(cookies, currentUser);
    fetchData(getCurrentUser);
  }

  render() {
    return this.renderView();
  }
}

const mapStateToProps = (state) => {
  const currentView = state.currentView;
  const allNotes = state.allNotes;
  const currentUser = state.currentUser;
  const selectedNotebook = state.selectedNotebook;
  return { currentView, allNotes, currentUser, selectedNotebook };
};

export default connect(mapStateToProps, actions)(Main);
