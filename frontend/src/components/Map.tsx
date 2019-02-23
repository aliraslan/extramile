import React from "react";
import Geosuggest from "react-geosuggest";
import { Input, Button } from "antd";
import "./Geosuggest.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const onSuggestSelect = (suggest: any) => {
  if (suggest) {
    console.log(
      "You are going to " +
        suggest.label +
        " \nThe coordinates are: " +
        suggest.location.lat.toString() +
        "," +
        suggest.location.lng.toString()
    );
  }
};

export function MapView() {
  const MyMap = withScriptjs(
    withGoogleMap(
      (props: { children?: React.ReactNode; isMarkerShown?: boolean }) => (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: 29.958, lng: 30.958 }}
          defaultOptions={{
            disableDefaultUI: true
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "15%",
              top: "10%",
              width: "60vw",
              height: "25",
              textAlign: "center"
            }}
          >
            <Geosuggest
              placeholder={"Where to?"}
              onSuggestSelect={onSuggestSelect}
            />
          </div>
          {props.isMarkerShown && (
            <Marker position={{ lat: 29.958, lng: 30.958 }} />
          )}
        </GoogleMap>
      )
    )
  );
  return (
    <MyMap
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbzcvcJ23ACYcwyqLGOS1EI9Jwt1Ev6cM&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
