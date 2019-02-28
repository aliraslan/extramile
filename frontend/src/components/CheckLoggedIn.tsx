import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";

export const AuthorizedRoute: React.FC = ({ children }) => (
  <Query
    query={gql`
      {
        current {
          id
        }
      }
    `}
  >
    {({ data, loading, error }) => {
      if (loading) return <div>loading...</div>;
      if (error) return <div>ERRORLOG</div>;
      if (data.current === null) {
        console.log("Not logged in.");
        return <Redirect to="/login" />;
      } else {
        return children;
      }
    }}
  </Query>
);
