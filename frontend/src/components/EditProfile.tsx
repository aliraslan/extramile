import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Form, Button, Input } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import { DrawerView } from "./Drawer";
// // TODO
// Registering logs you in.
const EditProfileMutation = gql`
  mutation EditProfileMutation(
    $firstName: String!
    $email: String!
    $password: String!
    $lastName: String!
    $phone: String!
  ) {
    EditProfile(
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

export const EditProfile = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [phone, setPhone] = useState("");
  // TODO replace option absolute with flex box
  return (
    <Mutation mutation={EditProfileMutation}>
      {(editProfile, { data, loading, error }) => {
        if (data) {
          // you're now registered, log in
          return <Redirect to="/app" />;
        }

        return (
          <div className="prontoView">
            <div>
              <DrawerView />
            </div>
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
                      editProfile({
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
                    <Link to="/app">Save</Link>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};
