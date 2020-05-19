import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { v4 as uuidv4 } from "uuid";
import LightBoxBg from "./LightBoxBg";
import LightBoxHeading from "./LightBoxHeading";
import "../scss/components/addNotebook.scss";

class AddNotebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLightBox: false,
      notebookName: "",
      showWarning: false,
    };
  }
  // 重複了
  toggleLightBox = (e) => {
    console.log("toggle light box!!!!!");
    const { showLightBox } = this.state;
    if (e.target === e.currentTarget) {
      this.setState({
        showLightBox: showLightBox ? false : true,
      });
    }
  };
  clickAddNotebook = () => {
    const { showLightBox } = this.state;
    this.setState({
      showLightBox: showLightBox ? false : true,
      notebookName: "",
      showWarning: false,
    });
  };
  getNotebookName = (e) => {
    this.setState({
      notebookName: e.target.value,
    });
  };
  confirmAddNotebook = (e) => {
    const { addNotebook, cookies, currentUser } = this.props;
    const { notebookName } = this.state;
    const id = uuidv4();
    const getCurrentUser = cookies.get("currentUser")
      ? cookies.get("currentUser")
      : currentUser.toString();
    if (notebookName) {
      addNotebook(id, getCurrentUser, notebookName);
      this.toggleLightBox(e);
    } else {
      this.setState({
        showWarning: true,
      });
    }
  };
  renderLightBoxMessage = (notebookName, showWarning) => {
    // const {notebookName} = this.state;
    return (
      <div className="light-box-message-wrap">
        <LightBoxHeading
          headingTitle="Create New Notebook"
          toggleLightBox={this.toggleLightBox}
        />
        <p className="message">Name:</p>
        <input
          type="text"
          id="notebookName"
          name="notebookName"
          className="input-text"
          placeholder="Notebook Name"
          value={notebookName}
          onChange={this.getNotebookName}
        ></input>
        <p className={`small-warning-message ${showWarning ? "show" : ""}`}>
          Notebook name is required!
        </p>
        <div className="btn-wrap">
          <button className="general-btn btn" onClick={this.toggleLightBox}>
            Cancel
          </button>
          <button
            className="highlight-btn btn"
            onClick={this.confirmAddNotebook}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { showLightBox, notebookName, showWarning } = this.state;
    const parameters = [notebookName, showWarning];
    return (
      <div className="add-notebook-wrap">
        <div className="add-notebook-btn" onClick={this.clickAddNotebook}>
          New Notebook
        </div>
        <LightBoxBg
          showLightBox={showLightBox}
          toggleLightBox={this.toggleLightBox}
          renderLightBoxMessage={this.renderLightBoxMessage}
          renderParameters={parameters}
        ></LightBoxBg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser;
  return { currentUser };
};

export default connect(mapStateToProps, actions)(AddNotebook);
