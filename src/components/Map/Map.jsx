// Your Map component with modified Google Maps API loading
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    

    const [googleMapLoaded, setGoogleMapLoaded] = useState(true);

    // Ensure the initMap function is defined in the global scope
    window.initMap = () => {
        // Your map initialization logic here
        setGoogleMapLoaded(true);
    };

    // Define the API key and the callback function for Google Maps
    const apiKey = '<API KEY>';
    const createMapOptions = () => ({
        zoomControl: true,
    });


    return (
        <div className={classes.mapContainer}>
            {googleMapLoaded && (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    options={createMapOptions}
                    onChange={(e) => {
                        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                    }}
                    onChildClick={() => {}}
                >
                    <LocationOnOutlinedIcon color="primary" fontSize="large" />
                </GoogleMapReact>
            )}
        </div>
    );
};

export default Map;
