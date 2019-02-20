import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Input, Icon } from "antd";
import "./styling/Pronto.css";
const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      id
      firstName
    }
  }
`;

export const AppView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Mutation mutation={LoginMutation}>
      {(login, { data, loading, error }) => {
        if (data) {
          // you're now logged in!
          return <Redirect to="/map" />;
        }

        return (
          <div className="prontoView">
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                position: "absolute",
                top: "40%",
                left: "25%",
                width: "50vw"
              }}
            />
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              style={{
                position: "absolute",
                top: "48%",
                left: "25%",
                width: "50vw"
              }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <a
              style={{
                position: "absolute",
                top: "55%",
                left: "43%"
              }}
              href="/forgotpassword"
            >
              Forgot password?
            </a>
            <Button
              type="primary"
              onClick={() => login({ variables: { email, password } })}
              style={{
                position: "absolute",
                top: "65%",
                left: "25%",
                width: "50vw"
              }}
            >
              Login
            </Button>
            <a
              style={{
                position: "absolute",
                top: "72%",
                left: "45%"
              }}
              href="/register"
            >
              or sign up!
            </a>
          </div>
        );
      }}
    </Mutation>
  );
};
