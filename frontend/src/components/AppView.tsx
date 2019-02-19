import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";

const LoginMutation = gql`
mutation LoginMutation($email: String!, $password: String!) {
  Login(email: $email, password: $password) {
    id
    firstName
  }
}
`;

export const AppView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Mutation mutation={LoginMutation}>
      {(login, { data, loading, error }) => {
        if (data) {
          // you're now logged in!
          return <Redirect to="/"/>
        }

        return (
          <>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={() => login({ variables: { email, password } })}>Login</button>
          </>
        )
      }}
    </Mutation>
  );
};

