import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";

export const OneTimeRoute: React.FC = ({ children }) => (
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
      if (data.current !== null) {
        return <Redirect to="/map" />;
      } else return children;
    }}
  </Query>
);
