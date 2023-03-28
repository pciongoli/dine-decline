import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./GoogleMap";

function App() {
   const [location, setLocation] = useState(null);
   const [worstRestaurants, setWorstRestaurants] = useState([]);

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            setLocation({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            });
         },
         (error) => console.log(error),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
   }, []);

   useEffect(() => {
      if (location) {
         const fetchRestaurants = async () => {
            try {
               const { data } = await axios.get(
                  `http://localhost:5000/api/restaurants?lat=${location.lat}&lng=${location.lng}`
               );

               // Filter out the worst restaurants
               const worstRestaurants = data.results.slice(-5).reverse();
               setWorstRestaurants(worstRestaurants);
            } catch (error) {
               console.error("Failed to fetch restaurants:", error.message);
            }
         };

         fetchRestaurants();
      }
   }, [location]);

   return (
      <div className="App">
         {location && (
            <Map center={location} worstRestaurants={worstRestaurants} />
         )}
      </div>
   );
}

export default App;
