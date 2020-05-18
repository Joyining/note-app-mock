import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import "../scss/components/registration.scss";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInAccount: "",
      logInPassword: "",
      signUpAccount: "",
      signUpPassword: "",
      showSignUp: false,
    };
  }

  inputOnChangeHandler = (e) => {
    const state = this.state;
    state[e.target.id] = e.target.value;
    this.setState(state);
  };

  validateLogIn = () => {
    const { logIn } = this.props;
    const { logInAccount, logInPassword } = this.state;
    logIn(logInAccount, logInPassword);
  };

  continueSignUp = () => {
    const { signUp } = this.props;
    const { signUpAccount, signUpPassword } = this.state;
    signUp(signUpAccount, signUpPassword);
  };

  switchLogInSignUp = () => {
    const { showSignUp } = this.state;
    this.setState({
      showSignUp: showSignUp ? false : true,
    });
  };

  render() {
    const { showSignUp } = this.state;
    const { registrationErrorMessage } = this.props;
    return (
      <div className="registration-wrap">
        <div className={`login-wrap ${showSignUp ? "" : "show"}`}>
          <p className="error-message">
            {!_.isEmpty(registrationErrorMessage)
              ? registrationErrorMessage.toString()
              : ""}
          </p>
          <input
            type="text"
            id="logInAccount"
            name="logInAccount"
            className="input-text"
            placeholder="Email account"
            onChange={this.inputOnChangeHandler}
          ></input>
          <input
            type="password"
            id="logInPassword"
            name="logInPassword"
            className="input-text"
            placeholder="Password"
            onChange={this.inputOnChangeHandler}
          ></input>
          <button className="highlight-btn btn" onClick={this.validateLogIn}>
            Log In
          </button>
          <p className="switch-login-signup-message">Don't Have an Account?</p>
          <p
            className="switch-login-signup-message highlight"
            onClick={this.switchLogInSignUp}
          >
            Create Account
          </p>
        </div>

        <div className={`signup-wrap ${showSignUp ? "show" : ""}`}>
          <p className="error-message">
            {!_.isEmpty(registrationErrorMessage)
              ? registrationErrorMessage.toString()
              : ""}
          </p>
          <input
            type="text"
            id="signUpAccount"
            name="signUpAccount"
            className="input-text"
            placeholder="Email account"
            onChange={this.inputOnChangeHandler}
          ></input>
          <input
            type="password"
            id="signUpPassword"
            name="signUpPassword"
            className="input-text"
            placeholder="Password"
            onChange={this.inputOnChangeHandler}
          ></input>
          <button className="highlight-btn btn" onClick={this.continueSignUp}>
            Continue
          </button>
          <p className="switch-login-signup-message">Already Have Account?</p>
          <p
            className="switch-login-signup-message highlight"
            onClick={this.switchLogInSignUp}
          >
            Login
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const registrationErrorMessage = state.registrationErrorMessage;
  return { registrationErrorMessage };
};

export default connect(mapStateToProps, actions)(Registration);
