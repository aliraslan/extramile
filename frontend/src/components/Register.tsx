import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Input, Icon } from "antd";
import "./styling/Pronto.css";
// // TODO
// Registering logs you in.
const RegisterMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    Register(email: $email, password: $password, fullName: $fullName) {
      id
    }
  }
`;

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <Mutation mutation={RegisterMutation}>
      {(register, { data, loading, error }) => {
        if (data) {
          // you're now registered, log in
          return <Redirect to="/app" />;
        }

        return (
          <div className="prontoView">
            <Input
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
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              style={{
                position: "absolute",
                top: "32%",
                left: "25%",
                width: "50vw"
              }}
            />
            <Input
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
            <Button
              type="primary"
              onClick={() => register({ variables: { email, password } })}
              style={{
                position: "absolute",
                top: "65%",
                left: "25%",
                width: "50vw"
              }}
            >
              Register
            </Button>
            <a
              style={{
                position: "absolute",
                top: "72%",
                left: "45%"
              }}
              href="/app"
            >
              or log in!
            </a>
          </div>
        );
      }}
    </Mutation>
  );
};
