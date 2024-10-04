// import { useState } from "react";
import styles from "./City.module.css";

import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // using useParams(parameter) here in the city to link the id to URL
  const {id}= useParams();
  const {getCity,currentCity}=useCities();
  useEffect(function()
{
    getCity(id);
    // here we can see that esllint tells us to add getCity as a dependency 
    // but we cannot directly add it because it will create infinite loop of many renders b
    // because if we cann this func then it will update the state in that component and then getCity will be created again
    // react will take it as a new function and this effect will run again and so on...... so we need an optimization here to avoid this
},[id,getCity]);
  
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
  // return <h1>City{id}</h1>
}

export default City;