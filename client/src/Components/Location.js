import React, { useState, useEffect } from "react";

const OPENCAGE_API_KEY = "126732241cab406e9d77de192b68807a"; 
const Location = () => {
  const [location, setLocation] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation({ latitude, longitude, accuracy });

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();
            if (data && data.results.length > 0) {
              const components = data.results[0].components;
              setPlaceInfo({
                city: components.city || components.town || components.village,
                region: components.state,
                country: components.country,
                accuracy: components.accuracy,
              });
            } else {
              setError("Could not retrieve location details.");
            }
          } catch (err) {
            setError("Failed to fetch reverse geolocation.");
          }
        },
        (err) => {
          setError("Permission denied or location unavailable");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, []);

  return (
    <div>
      <h4 >Your Location</h4>
      {error && <p >{error}</p>}
      {placeInfo ? (
        <>
          <p><strong>City:</strong> {placeInfo.city}</p>
          <p><strong>Region:</strong> {placeInfo.region}</p>
          <p><strong>Country:</strong> {placeInfo.country}</p>
        </>
      ) : (
        !error && <p>Getting location...</p>
      )}
    </div>
  );
};

export default Location;