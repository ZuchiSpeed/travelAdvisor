// Your Map component with modified Google Maps API loading
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');


    const [googleMapLoaded, setGoogleMapLoaded] = useState(true);

    // Ensure the initMap function is defined in the global scope
    window.initMap = () => {
        // Your map initialization logic here
        setGoogleMapLoaded(true);
    };

    // Define the API key and the callback function for Google Maps
    const apiKey = 'API KEY';
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
                        if (e.center.lat && e.center.lng) {
                            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                        }
                    }}
                    onChildClick={(child) => setChildClicked(child)}
                >
                    {places?.map((place, i) => (
                        <div className={classes.markerContainer} lat={Number(place.latitude)} key={i} lng={Number(place.longitude)}>
                            {Number(place.latitude) && Number(place.longitude) ? (
                                <div lat={Number(place.longitude)} lng={Number(place.longitude)}>
                                    {!isDesktop ? (
                                        <LocationOnOutlinedIcon color="primary" fontSize="large" />
                                    ) : (
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography className={classes.typography} varient="subtitle2" gutterBottom>
                                                {place.name}
                                            </Typography>
                                            <img
                                                className={classes.pointer}
                                                src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                                alt={place.name}
                                            />
                                            <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                        </Paper>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </GoogleMapReact>
            )}
        </div>
    );
};

export default Map;
