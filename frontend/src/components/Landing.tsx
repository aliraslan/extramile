import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Login } from "./Login";
import { AuthorizedRoute } from "./CheckLoggedIn";

export const LandingView = () => {
  return (
    <Query
      query={gql`
        {
          Connection
        }
      `}
    >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;

        if (error) return <div>Error: {JSON.stringify(error)}</div>;

        return (
          <div>{data.Connection} your App is connected to the backend!</div>
        );
      }}
    </Query>
    // <AuthorizedRoute to="/map">
    //   <div>
    //     <Login />
    //   </div>
    // </AuthorizedRoute>
  );
};
