
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
// import { convertToEmoji } from "../utils"; // Moved to utils.js
 function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoading, setIsLoading] = useState(false);
  const [emoji,setEmoji]= useState("");
  const {createCity}= useCities();
  useEffect(function () {
    if(!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.error("Error fetching city data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (lat && lng) {
      fetchCityData();
    }
  }, [lat, lng]);
  const navigate= useNavigate();
  async function handleSubmit(e)
{
  
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity= {
      cityName,country,emoji,date,notes,position:{lat,lng}
    }; 
    await createCity(newCity);
    navigate("/app/cities");

}
  
    if(!lng && !lat) return <Message message="Nothing here to show currently"/> 
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.row}>
          <label htmlFor="country">Country</label>
          <input id="country" value={convertToEmoji(country)} readOnly />
        </div>
      )}

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        
          <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
      
        
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">ADD</Button>
        <BackButton />
      </div>
    </form>
  ); 
}

export default Form;
