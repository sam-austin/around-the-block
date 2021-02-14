import React from "react";

const LocateUser = ({ panTo }) => {

  return (
    <button className="locate" onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null
      );
    }}>
      <img 
      src="https://around-the-block.s3.amazonaws.com/magnifying-glass.png" 
      alt="locate me" 
      />
    </button>
  )
}

export default LocateUser