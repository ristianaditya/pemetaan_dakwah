import { MapContainer, TileLayer, ZoomControl, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import React from 'react';

function Maps({mapRef, onCreated}) {

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
                <FeatureGroup>
                    <EditControl onCreated={onCreated} position="topright" />
                </FeatureGroup>
                <ZoomControl position="bottomright" />
            </MapContainer>
        </>
    )
  }
  
  export default Maps