import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types"; // Import prop-types for validation
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [position, setPosition] = useState([40, 0]);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const [searchParams] = useSearchParams();

  const [buttonVisible, setButtonVisible] = useState(true); // Manage button visibility

  const {
    isLoading: geoLoading,
    getPosition,
    position: geoLocationPosition,
  } = useGeolocation();

  // Extract lat and lng from searchParams
  const searchLat = searchParams.get("lat");
  const searchLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) {
      setPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  // Logic to show the button
  const shouldShowButton =
    buttonVisible &&
    (!geoLocationPosition ||
      (searchLat && searchLng && (Number(searchLat) !== geoLocationPosition.lat || Number(searchLng) !== geoLocationPosition.lng)));

  // Hide button after clicking "Use Your Position"
  const handleGetPosition = () => {
    getPosition();
    setButtonVisible(false); // Hide button after click
  };

  return (
    <div className={styles.mapContainer}>
      {shouldShowButton && (
        <Button type="position" onClick={handleGetPosition}>
          {geoLoading ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer center={position} zoom={6} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city, index) => (
          <Marker key={index} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span><span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick setButtonVisible={setButtonVisible} />
      </MapContainer>
    </div>
  );
}
// setting the map view on changing the position

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Add propTypes for the position prop
ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// Fix: Rename `detectClick` to `DetectClick` and use it as a component
function DetectClick({ setButtonVisible }) {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setButtonVisible(true); // Show button again when map is clicked
    },
  });

  return null;
}

// Add propTypes for setButtonVisible
DetectClick.propTypes = {
  setButtonVisible: PropTypes.func.isRequired,
};

export default Map;
