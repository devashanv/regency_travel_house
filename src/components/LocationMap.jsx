import React from 'react';

const LocationMap = () => {
  return (
    <>
        <div className="w-full rounded-4xl h-[500px] overflow-hidden max-w-full">
        <iframe
            title="Regency Travel House Map"
            src="https://www.google.com/maps/embed/v1/place?q=Regency+travel+house+Sri+Lanka&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
    </>
  );
};

export default LocationMap;
