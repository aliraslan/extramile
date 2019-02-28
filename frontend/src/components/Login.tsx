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
const _confirm = async (data: any) => {};
export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Mutation mutation={LoginMutation} onCompleted={data => _confirm(data)}>
        {(login, { data, loading, error }) => {
          if (data) {
            console.log("Successfully logged in.");
            window.location.reload(); // temporary silly fix
          }
          return (
            <OneTimeRoute>
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
            </OneTimeRoute>
          );
        }}
      </Mutation>
    </div>
  );
};
