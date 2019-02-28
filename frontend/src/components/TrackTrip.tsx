// USE only as a reference and replace with an actual component
import { Subscription } from "react-apollo";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Input } from "antd";
import { AuthorizedRoute } from "./CheckLoggedIn";

const TRACK_TRIP_SUBSCRIPTION = gql`
  subscription TripLocationSubscription($tripId: String!) {
    TripLocation(tripId: $tripId) {
      location {
        x
        y
      }
      id
      date
    }
  }
`;

export const TrackTrip = () => {
  const [tripId, setTripId] = useState("");
  return (
    <AuthorizedRoute>
      <Input onChange={e => setTripId(e.target.value)} value={tripId} />
      <Subscription
        subscription={TRACK_TRIP_SUBSCRIPTION}
        variables={{ tripId }}
      >
        {({ data, loading }) => {
          if (data) {
            const { x, y } = data.TripLocation.location;
            return (
              <div>
                {" "}
                current location: LON: {x}, LAT: {y}{" "}
              </div>
            );
          }
          // waiting for next publish notification
          return <div>Connecting..</div>;
        }}
      </Subscription>
    </AuthorizedRoute>
  );
};
