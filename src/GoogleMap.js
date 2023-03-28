import React, { useState } from "react";
import {
   GoogleMap,
   LoadScript,
   Marker,
   InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
   width: "100%",
   height: "100vh",
};

function Map({ center, worstRestaurants }) {
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const handleMarkerClick = (restaurant) => {
      setSelectedRestaurant(restaurant);
   };

   return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
         >
            {worstRestaurants &&
               worstRestaurants.map((restaurant) => (
                  <Marker
                     key={restaurant.place_id}
                     position={{
                        lat: restaurant.geometry.location.lat,
                        lng: restaurant.geometry.location.lng,
                     }}
                     onClick={() => handleMarkerClick(restaurant)}
                  />
               ))}
            {selectedRestaurant && (
               <InfoWindow
                  position={{
                     lat: selectedRestaurant.geometry.location.lat,
                     lng: selectedRestaurant.geometry.location.lng,
                  }}
                  onCloseClick={() => setSelectedRestaurant(null)}
               >
                  <div>
                     <h4>{selectedRestaurant.name}</h4>
                     <p>Rating: {selectedRestaurant.rating}</p>
                  </div>
               </InfoWindow>
            )}
         </GoogleMap>
      </LoadScript>
   );
}

export default React.memo(Map);
