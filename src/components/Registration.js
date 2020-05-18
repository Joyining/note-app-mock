import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../scss/components/registration.scss";

class LogIn extends Component {
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
    return (
      <div className="login-outer-wrap">
        <div className={`login-wrap ${showSignUp ? "" : "show"}`}>
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
          <p>No Account?</p>
          <p onClick={this.switchLogInSignUp}>Create Account</p>
        </div>

        <div className={`signup-wrap ${showSignUp ? "show" : ""}`}>
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
          <p>Already Have Account?</p>
          <p onClick={this.switchLogInSignUp}>Login</p>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(LogIn);
