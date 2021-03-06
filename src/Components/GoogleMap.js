import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "33.33%",
  height: "31%",
};

function MapContainer(props) {
  const currCord = props.currCord;
  if (!currCord) {
    return null;
  }

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={currCord}
    >
      <Marker title={"aaaa"} name={"asdfkdnf"} position={currCord} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "key",    //Enter your google maps api key here mine is giving warning from Gitguardian
})(MapContainer);
