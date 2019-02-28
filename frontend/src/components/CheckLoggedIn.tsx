import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";

export const AuthorizedRoute: React.FC<{ to: string }> = ({ to, children }) => (
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
      if (loading) return <div> loading </div>;
      if (data.current === null) {
        console.log("AuthorizedRouteOutput");
        console.log(data);
        return <Redirect to={to} />;
      } else {
        console.log("AuthorizedRouteOutput");
        console.log(data);
        return children;
      }
    }}
  </Query>
);
