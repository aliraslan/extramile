// USE only as a reference and replace with an actual component
import { Subscription } from "react-apollo";
import React from "react";
import { gql } from "apollo-boost";

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
}`;

// hard coded tripId             v----------------  defining prop type for better auto completion
export const TrackTrip: React.FC<{ tripId: string }> = ({ tripId = "de54b6c3-c3de-40bc-83bc-a95f462f6614" }) => (
  <Subscription
    subscription={TRACK_TRIP_SUBSCRIPTION}
    variables={{ tripId }}
  >
    {({ data, loading }) => {
      if (data) {

        const { x, y } = data.TripLocation.location;
        return <div> current location: LON: {x}, LAT: {y} </div>
      }
      // waiting for next publish notification
      return <div>Connecting..</div>
    }}
  </Subscription>
);
