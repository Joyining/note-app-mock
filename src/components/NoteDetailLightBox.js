import React, { Component } from "react";
import { connect } from "react-redux";
import LightBoxHeading from "./LightBoxHeading";
import * as utils from "../utils";

class NoteDetailLightBox extends Component {
  render() {
    const { editingNote, toggleLightBox } = this.props;
    const lastModifiedTime = utils.getDisplayedDate(
      editingNote.lastModifiedTime
    );
    const createdTime = utils.getDisplayedDate(editingNote.createdTime);
    const details = [
      { name: "Title", data: editingNote.title, maxHeight: true },
      { name: "Created Time", data: createdTime, maxHeight: false },
      {
        name: "Last Modified Time",
        data: lastModifiedTime,
        maxHeight: false,
      },
    ];
    return (
      <div className="light-box-message-wrap">
        <LightBoxHeading
          headingTitle="Note Detail"
          toggleLightBox={toggleLightBox}
        />
        <div className="message">
          <ul>
            {details.map((item) => {
              return (
                <li key={item.name} className="detail-wrap">
                  <span className="detail-name">{item.name}</span>
                  <span
                    className={`detail-data ${
                      item.maxHeight ? "max-height" : ""
                    }`}
                  >
                    {item.data}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const editingNote = state.editingNote;
  return { editingNote };
};

export default connect(mapStateToProps)(NoteDetailLightBox);
