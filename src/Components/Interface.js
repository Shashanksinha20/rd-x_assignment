import React, { useState, useEffect } from "react";
import GoogleMaps from "./GoogleMap";
import Weather from "./Weather";
import "./Interface.css";
import axios from "axios";

function Interface() {
  const [currCord, setcurrCord] = useState(null);
  const [currency, setCurrency] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const cordinate = pos.coords;
        setcurrCord({ lat: cordinate.latitude, lng: cordinate.longitude });
      });
    }
    const currencyAPI = () => {
      axios
        .get(
          "https://v2.api.forex/rates/2021-12-10.json?beautify=true&key=76afc36a-6127-4a13-aafe-6a285bfc87dd&from=INR&to=DEM,ESP"
        )
        .then((res) => {
          setCurrency(res?.data?.rates);
        });
    };
    currencyAPI();
  }, []);
  console.log(currCord);
  // console.log(currency);
  return (
    <>
      <div className="App">
        <div className="container">
          <Weather currCord={currCord} />
          <div className="box2">
            <div className="mapbox">
              <GoogleMaps currCord={currCord} />
            </div>
            <div className="exchange-rate">
              <div className="exchangerate-box1">
                <div>CURRENCY</div>
                <div>Price</div>
              </div>
              <div className="exchangerate-box2">
                <div>INRDEM</div>
                <div>{currency.DEM}</div>
              </div>
              <div className="exchangerate-box3">
                <div>INRESP</div>
                <div>{currency.ESP}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interface;
