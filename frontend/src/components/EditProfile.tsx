import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Form, Button, Input, Upload, message } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import { DrawerView } from "./Drawer";
import Geosuggest from "react-geosuggest";
import "./Geosuggest.css";
import { number } from "prop-types";
// // TODO
// Registering logs you in.
const EditProfileMutation = gql`
  mutation EditProfileMutation(
    $firstName: String!
    $email: String!
    $password: String!
    $lastName: String!
    $phone: String!
    $homeLocation: Object
    $homeAddress: String
    $workLocation: Object
    $workAddress: String
  ) {
    EditProfile(
      firstName: $firstName
      email: $email
      password: $password
      lastName: $lastName
      phone: $phone
      homeLocation: $homeLocation
      workLocation: $workLocation
      homeAddress: $homeAddress
      workAddress: $workAddress
    ) {
      id
    }
  }
`;
let homeAddress: string = "";
let workAddress: string = "";
let homeLocation = {
  x: number,
  y: number
};
let workLocation = {
  x: number,
  y: number
};

const onSuggestHomeSelect = (suggest: any) => {
  if (suggest) {
    homeAddress = suggest.label;
    homeLocation.x = suggest.location.lng;
    homeLocation.y = suggest.location.lat;
  }
};
const onSuggestWorkSelect = (suggest: any) => {
  if (suggest) {
    workAddress = suggest.label;
    workLocation.x = suggest.location.lng;
    workLocation.y = suggest.location.lat;
    alert(workAddress);
  }
};
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
                top: "8%",
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
                  <div className="GeoSuggestField">
                    <Geosuggest
                      placeholder={"Home Address"}
                      onSuggestSelect={onSuggestHomeSelect}
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="GeoSuggestField">
                    <Geosuggest
                      placeholder={"Work Address"}
                      onSuggestSelect={onSuggestWorkSelect}
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      marginTop: "3em",
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
