import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export const LandingView = () => {
  return (
    <Query query={gql`{ Connection }`}>
      {({ data, loading, error }) => {

        if (loading)
          return <div>Loading...</div>;

        if (error)
          return <div>Error: {JSON.stringify(error)}</div>;

        return <div>{data.Connection} your App is connected to the backend!</div>
      }}
    </Query>
  );
};

