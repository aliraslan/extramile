import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Form, Button, Input } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import {OneTimeRoute} from "./OneTimeRoute";

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
      lastName: $lastName
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
    <OneTimeRoute to="/map">
      <Mutation mutation={RegisterMutation}>
        {(register, { data, loading, error }) => {
          if (data) {
            // you're now registered, log in
            return <Redirect to="/map" />;
          }

          return (
            <div className="prontoView">
              <div
                style={{
                  position: "absolute",
                  top: "25%",
                  left: "12.5%",
                  width: "75vw",
                  height: "50vh",
                  bottom: "25%"
                }}
              >
                <Form>
                  <Form.Item>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Phone number"
                      value={phone}
                      type="number"
                      onChange={e => setPhone(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{
                        width: "75vw"
                      }}
                      type="primary"
                      onClick={() =>
                        register({
                          variables: {
                            email,
                            password,
                            firstName,
                            lastName,
                            phone
                          }
                        })
                      }
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="ghost"
                      style={{
                        color: "white",
                        width: "75vw"
                      }}
                    >
                      <Link to="/">Have an account? Log in!</Link>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          );
        }}
      </Mutation>
    </OneTimeRoute>
  );
};
