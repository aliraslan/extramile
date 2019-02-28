import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Icon, Input, Form } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import { DrawerView } from "./Drawer";
import { MapView } from "./Map";
import { EditProfile } from "./EditProfile";
import { OneTimeRoute } from "./OneTimeRoute";

const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      id
      firstName
    }
  }
`;

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <OneTimeRoute to="/map">
      <Mutation mutation={LoginMutation}>
        {(login, { data, loading, error }) => {
          if (data) {
            // you're now logged in!
            console.log("LoginOutput");
            console.log(data);
            return <Redirect to="/map" />;

            // Pending change
          } else
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
                          login({
                            variables: {
                              email,
                              password
                            }
                          })
                        }
                      >
                        Login
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
                        <Link to="/register">New Here? Sign Up!</Link>
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
