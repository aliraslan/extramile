import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router";
import { Button, Input, Icon } from "antd";
import "./styling/Pronto.css";
import Geosuggest from "react-geosuggest";
import "./Geosuggest.css";

// // FOR BESHOY

// // TODO
// // EDIT this to make it... work.
// // Depending on what data the Edit Profile backend code takes, uncomment/remove things as needed.
// // Variables are featured below in the mutation, as well as <Input> tags below in the render for the element.
// // Variables are also included in export const EditProfile, you'll need the relevant line for any variable you end up using.
// // Sorry for not doing much today.
// // once you write the EditProfileMutation below, run yarn start in your terminal and then head to /editprofile to test, it will not work unless you have the mutation below adjusted and fixed.

// const EditProfileMutation = gql`
//   mutation EditProfileMutation(
//     $email: String!
//     $firstName: String!
//     $lastName: String
//     $password: String!
//   ) {
//     EditProfile(email: $email, password: $password, firstName: $firstName, lastName = $lastName, ) {
//       id
//     }
//   }
// `;

export const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  let [homeLocation, sethomeLocation] = useState(""); // I will use Geosuggest for this.

  // Suggestion Code
  const onSuggestSelect = (suggest: any) => {
    if (suggest) {
      homeLocation = suggest.label; // Take location as label, you can use geocode by invoking suggest.location or just lat or lng with suggest.location.lat or suggest.location.lng
    }
  };
  // Suggestion code

  return (
    <Mutation mutation={EditProfileMutation}>
      {(editprofile, { data, loading, error }) => {
        if (data) {
          // you have edited your profile, sending you back to Map View
          return <Redirect to="/map" />;
        }
        if (error) {
          console.log(error); // DEVELOPMENT ONLY, NOT RELEVANT LATER.
        }
        return (
          <div className="prontoView">
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                position: "absolute",
                top: "40%",
                left: "15%",
                width: "70vw"
              }}
            />
            <Input
              placeholder="Password"
              style={{
                position: "absolute",
                top: "50%",
                left: "15%",
                width: "70vw"
              }}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
              style={{
                position: "absolute",
                top: "60%",
                left: "15%",
                width: "70vw"
              }}
            />

            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => setlastName(e.target.value)}
              style={{
                position: "absolute",
                top: "70%",
                left: "15%",
                width: "70vw"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "15%",
                top: "80%",
                width: "70vw"
              }}
            >
              <Geosuggest
                placeholder={"Home Location"}
                onSuggestSelect={onSuggestSelect}
              />
            </div>
            <Button
              type="primary"
              onClick={() =>
                editprofile({ variables: { email, password, firstName } })
              }
              style={{
                position: "absolute",
                top: "90%",
                left: "15%",
                width: "70vw"
              }}
            >
              EditProfile
            </Button>
          </div>
        );
      }}
    </Mutation>
  );
};
