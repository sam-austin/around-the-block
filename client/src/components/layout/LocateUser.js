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
      src="https://www.flaticon.com/svg/vstatic/svg/3481/3481333.svg?token=exp=1613266915~hmac=2ce469e06fe2c31c528638101f3b02f8" 
      alt="locate me" 
      />
    </button>
  )
}

export default LocateUser