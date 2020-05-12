import React, { Component } from "react";
import { connect } from "react-redux";
import LightBoxHeading from "./LightBoxHeading";
import "../scss/components/list.scss";

class NoteDetailLightBox extends Component {
  render() {
    const { editingNote, toggleLightBox } = this.props;
    const lastModifiedDateObj = editingNote.lastModifiedTime
      ? editingNote.lastModifiedTime.toDate()
      : null;
    const createdDateObj = editingNote.createdTime
      ? editingNote.createdTime.toDate()
      : null;
    const getDisplayTime = (dateObj) => {
      return dateObj
        ? `${dateObj.getFullYear()}/${
            dateObj.getMonth() + 1
          }/${dateObj.getDate()}  ${dateObj.getHours()}:${dateObj.getMinutes()}`
        : "";
    };
    const lastModifiedTime = getDisplayTime(lastModifiedDateObj);
    const createdTime = getDisplayTime(createdDateObj);
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
