import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Icon, Input } from "antd";
import "./styling/Pronto.css";
import { Link } from "react-router-dom";
import { DrawerView } from "./Drawer";
import { MapView } from "./Map";
import { EditProfile } from "./EditProfile";
import { AuthorizedRoute } from "./CheckLoggedIn";

const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      id
      firstName
    }
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthorizedRoute to="/map">
      <Mutation mutation={LoginMutation}>
        {(login, { data, loading, error }) => {
          if (data) {
            // you're now logged in!
            return <Redirect to="/map" />; // Pending change
          } else
            return (
              <div className="prontoView">
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
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
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
                  onClick={() => login({ variables: { email, password } })}
                  style={{
                    position: "absolute",
                    top: "60%",
                    left: "15%",
                    width: "70vw"
                  }}
                >
                  Login
                </Button>
                <Button
                  type="ghost"
                  style={{
                    position: "absolute",
                    top: "70%",
                    left: "15%",
                    color: "white",
                    width: "70vw"
                  }}
                >
                  <Link to="/register">New here? Register!</Link>
                </Button>
              </div>
            );
        }}
      </Mutation>
    </AuthorizedRoute>
  );
};
