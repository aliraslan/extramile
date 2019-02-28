import React from "react";
import Geosuggest from "react-geosuggest";
import { Input } from "antd";
import "./Geosuggest.css";
import { gql } from "apollo-boost";
import { AuthorizedRoute } from "./CheckLoggedIn";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { DrawerView } from "./Drawer";
import { Query } from "react-apollo";
import Search from "antd/lib/input/Search";
// Location Tracking

let userPos = {
  y: 25.0,
  x: 30.0
};
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      userPos = {
        y: position.coords.latitude,
        x: position.coords.longitude
      };
    });
  }
}
const showTrips = (trips: any) => {
  for (let trip in trips) {
    return <div>{trip}</div>;
  }
};
// End Location Tracking
let SearchResultX = 0.0;
let SearchResultY = 0.0;
const onSuggestSelect = (suggest: any) => {
  if (suggest) {
    SearchResultY = suggest.location.lat;
    SearchResultX = suggest.location.lng;
    return (
      <div>
        <Query
          query={gql`
            {
              StopsByLocation(location: { x: 25.345, y: 32.567 }) {
                id
                address
                location {
                  x
                  y
                }
                tripId
              }
            }
          `}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (data) {
              console.log(data);
            }
          }}
        </Query>
      </div>
    );
  }
};
export function MapView() {
  const MyMap = withScriptjs(
    withGoogleMap(
      (props: { children?: React.ReactNode; isMarkerShown?: boolean }) => (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: userPos.y, lng: userPos.x }}
          defaultOptions={{
            disableDefaultUI: true
          }}
          center={{ lat: userPos.y, lng: userPos.x }}
        >
          <div>
            <DrawerView />
          </div>
          <div
            style={{
              position: "absolute",
              left: "5%",
              bottom: "25%",
              width: "90vw",
              textAlign: "center"
            }}
          >
            <Geosuggest
              placeholder={"Where to?"}
              onSuggestSelect={onSuggestSelect}
              country={"eg"}
            />
          </div>
          {props.isMarkerShown && (
            <Marker position={{ lat: userPos.y, lng: userPos.x }} />
          )}
        </GoogleMap>
      )
    )
  );
  getUserLocation();
  return (
    <AuthorizedRoute>
      <MyMap
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbzcvcJ23ACYcwyqLGOS1EI9Jwt1Ev6cM&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </AuthorizedRoute>
  );
}
