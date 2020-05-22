import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class NoteInfo extends Component {
  getDisplayedDate = (originTime) => {
    const dateObj = originTime.toDate();
    return dateObj
      ? `${dateObj.getFullYear()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}`
      : "";
  };
  getDisplayedTime = (originTime) => {
    const dateObj = originTime.toDate();
    return dateObj
      ? `${dateObj.getFullYear()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}  ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
      : "";
  };

  render() {
    const { notebookName, title, lastModifiedTime } = this.props;
    return (
      <div className="note-info">
        <p className="note-name-and-icon">
          <span className="notebook-name">{notebookName}</span>
          <span className="note-title">{title}</span>
        </p>

        <p className="note-detail-and-action">
          <span className="last-modified-time">
            Last Modified At: {this.getDisplayedTime(lastModifiedTime)}
          </span>
          <span className="last-modified-date">
            {this.getDisplayedDate(lastModifiedTime)}
          </span>
        </p>
      </div>
    );
  }
}

export default NoteInfo;
