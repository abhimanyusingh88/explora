import PropTypes from 'prop-types';
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
    const {isLoading,cities}=useCities();
    if (isLoading === true) return <Spinner />;
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el)=>el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        }
        return arr;
    }, []);

    return (
        <ul className={styles.CountryList}>
            {countries.map((country, index) => <CountryItem country={country} key={index} />)}
        </ul>
    );
}

CountryList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            country: PropTypes.string.isRequired,
            emoji: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
