import React from "react";
import { connect } from "react-redux";
import { auth } from "../reducers/userReducer";
import TextField from "@material-ui/core/TextField";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import history from "../history";
import { withRouter } from "react-router-dom";
var ethUtil = require("ethereumjs-util");
// var sigUtil = require("eth-sig-util");
var Eth = require("ethjs");
window.Eth = Eth;

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div>
      <form onSubmit={ev => handleSubmit(ev, name)} name={name} id="auth">
        <h1 className="title">Please {displayName}</h1>
        <TextField
          required
          type="text"
          name="email"
          id="standard-name"
          label="email"
          margin="normal"
        />
        <TextField
          required
          type="password"
          name="password"
          id="standard-name"
          label="password"
          margin="normal"
        />
        <div id="submit">
          <Button type="submit" variant="contained" color="primary">
            {displayName}&ensp;
            <SvgIcon>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </Button>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login"
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up"
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, name) {
      evt.preventDefault();
      if (typeof ethereum !== "undefined") {
        ethereum.enable();
      }
      const formName = name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const username = evt.target.name.value;

      dispatch(auth(username, email, password, formName));
    }
  };
};

export const Login = withRouter(
  connect(
    mapLogin,
    mapDispatch
  )(AuthForm)
);
export const Signup = withRouter(
  connect(
    mapSignup,
    mapDispatch
  )(AuthForm)
);
