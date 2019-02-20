import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Input, Icon } from "antd";
import "./styling/Pronto.css";
// // TODO
// Registering logs you in.
const RegisterMutation = gql`
  mutation RegisterMutation(
    $email: String!
    $firstName: String!
    $password: String!
  ) {
    Register(email: $email, password: $password, firstName: $firstName) {
      id
    }
  }
`;

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");

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
              placeholder="Full Name"
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
              style={{
                position: "absolute",
                top: "30%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                position: "absolute",
                top: "40%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Password"
              style={{
                position: "absolute",
                top: "50%",
                left: "15%",
                width: "70vw"
              }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() =>
                register({ variables: { email, password, firstName } })
              }
              style={{
                position: "absolute",
                top: "65%",
                left: "15%",
                width: "70vw"
              }}
            >
              Register
            </Button>
            <a
              style={{
                position: "absolute",
                top: "75%",
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
