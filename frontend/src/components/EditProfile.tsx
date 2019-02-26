import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import {AuthorizedRoute} from "./CheckLoggedIn";
import { Form, Button, Input, Upload, message } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import { DrawerView } from "./Drawer";
import Geosuggest from "react-geosuggest";
import "./Geosuggest.css";
const EditUserMutation = gql`
  mutation EditUserMutation($options: EditUserOptions!) {
    EditUser(EditUserOptions: $options) {
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
    <AuthorizedRoute to="/login">
    <Mutation mutation={EditUserMutation}>
      {(editUser, { data, loading, error }) => {
        if (data) {
          // Profile editing complete, return to map
          return <Redirect to="/map" />;
        }

        return (
          <div className="prontoView">
            <div>
              <DrawerView />
            </div>
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "12.5%",
                width: "75vw",
                height: "85vh",
                bottom: "25%"
              }}
            >
              <Form>
                <Form.Item>
                  <h2 className="HeaderText">Edit Profile</h2>
                </Form.Item>
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
                      marginTop: "3em",
                      width: "75vw"
                    }}
                    type="primary"
                    onClick={() =>
                      editUser({
                        variables: {
                          options: {
                            email,
                            password,
                            firstName,
                            lastName,
                            phone
                          }
                        }
                      })
                    }
                  >
                    <Link to="/map">Save</Link>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      }}
    </Mutation>
    </AuthorizedRoute>
  );
};
