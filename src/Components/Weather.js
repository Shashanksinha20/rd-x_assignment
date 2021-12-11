import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const Weather = ({ currCord }) => {
  const [weatherdata, setweatherData] = useState([]);
  const [currentdayData, setcurrentdayData] = useState({});
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const fetchApi = () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,current,minutely,alerts&appid=97a75dd0b67f33988487b2faa41e6476`
        )
        .then((res) => {

          let weatherArr = (res?.data?.daily || []).map((el) => {
            return {
              dt: el.dt || null,
              tempDay: el?.temp?.day || null,
              tempNight: el?.temp?.night || null,
              weatherIcon: el?.weather[0].icon || "",
              desc: el?.weather[0].description,
            };
          });
          setcurrentdayData({ ...weatherArr[0] });

          setweatherData(weatherArr.slice(1, 4));
          setTimezone(res?.data?.timezone);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const { lat = null, lng = null } = currCord || {};
    if (lat && lng) fetchApi();
  }, [currCord]);

  console.log({timezone});

  let iconURL = "",
    month = "",
    currdate = null,
    time = "",
    temp = null;

  const dayAlphabet = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  // console.log({currentdayData});
  if (currentdayData?.dt) {
    iconURL = currentdayData?.icon
      ? `http://openweathermap.org/img/wn/${currentdayData?.icon}@2x.png`
      : "";
    // console.log(currentdayData.dt);
    const date = new Date(currentdayData?.dt * 1000);
    currdate = date.getDate();
    month = date.toLocaleString("default", { month: "short" });
    time = date.getHours() + ":" + date.getMinutes() + ",";
    temp = Math.round(currentdayData.tempDay - 273);
  }

  const nextthreeDays = weatherdata.map((el, index) => {
    const nexticonURL = el?.icon
      ? `http://openweathermap.org/img/wn/${el.icon}@2x.png`
      : "";
    const date = new Date(el?.dt * 1000);
    const currdate = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const tempDay = Math.round(el.tempDay - 273);
    const tempNight = Math.round(el.tempNight - 273);
    const day = dayAlphabet[date.getDay()];

    return (
      <div key={index} className="nextforecast-box1">
        <div>
          {day}, {month} {currdate}
        </div>
        <div>
          <img className="nexticonImg" src={nexticonURL} alt="" /> {tempDay}/
          {tempNight}
          <sup>o</sup>C {el.desc}
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="box1">
        <div className="time-box">
          {time} {month} {currdate}
        </div>
        <div className="location-box">{timezone}</div>
        <div className="weathericon-box">
          <div>
            {temp}
            <sup>o</sup>C
          </div>
          <img className="iconImg" src={iconURL} alt="" />
        </div>
        <div className="nextforecast-box">Next 3 Days Forecast</div>

        <div className="weathernext-days">{nextthreeDays}</div>
      </div>
    </>
  );
};

export default Weather;
