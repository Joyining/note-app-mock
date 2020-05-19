import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NoteList from "./NoteList";
import Editor from "./Editor";
import NoteBookList from "./NoteBookList";
import AddNote from "./AddNote";
import * as actions from "../actions";
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
    const { currentView, allNotes, cookies } = this.props;
    // is loadash slower??
    if (_.isEmpty(allNotes)) {
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
              <NoteBookList cookies={cookies} />
            </div>
          );
        case "noteAndEditor":
        default:
          return (
            <div className="main-wrap">
              <NoteList />
              <Editor cookies={cookies} />
            </div>
          );
      }
    }
  };

  componentDidMount() {
    const { fetchNotes, currentUser, cookies } = this.props;
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    fetchNotes(getCurrentUser);
  }

  render() {
    return this.renderView();
  }
}

const mapStateToProps = (state) => {
  const currentView = state.currentView;
  const allNotes = state.allNotes;
  const currentUser = state.currentUser;
  return { currentView, allNotes, currentUser };
};

export default connect(mapStateToProps, actions)(Main);
