import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Input } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
// // TODO
// Registering logs you in.
const RegisterMutation = gql`
  mutation RegisterMutation(
    $firstName: String!
    $email: String!
    $password: String!
    $lastName: String!
    $phone: String!
  ) {
    Register(
      firstName: $firstName
      email: $email
      password: $password
      lastName: $lastName,
      phone: $phone
    ) {
      id
    }
  }
`;

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // TODO replace option absolute with flex box
  return (
    <Mutation mutation={RegisterMutation}>
      {(register, { data, loading, error }) => {
        if (data) {
          // you're now registered, log in
          return <Redirect to="/app"/>;
        }

        return (
          <div className="prontoView">
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{
                position: "absolute",
                top: "15%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{
                position: "absolute",
                top: "25%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Phone number"
              value={phone}
              type="number"
              onChange={e => setPhone(e.target.value)}
              style={{
                position: "absolute",
                top: "35%",
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
                top: "45%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Password"
              style={{
                position: "absolute",
                top: "55%",
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
                register({ variables: { email, password, firstName, lastName, phone } })
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
            <Link
              style={{
                position: "absolute",
                top: "70%",
                left: "45%"
              }}
              to="/app"
            >
              or log in!
            </Link>
          </div>
        );
      }}
    </Mutation>
  );
};
