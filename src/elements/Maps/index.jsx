import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import React from 'react';

function Maps({mapRef}) {

    return (
        <>
            <MapContainer className='leaflet-container' center={[-6.947794701156682, 107.70349499168313]} zoom={17} scrollWheelZoom={true} zoomControl={false} ref={mapRef}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxNativeZoom={18}
                maxZoom={20}
                minZoom={5}
                /> 
                <ZoomControl position="bottomright" />
            </MapContainer>
        </>
    )
  }
  
  export default Maps