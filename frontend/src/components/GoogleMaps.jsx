import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

<<<<<<< Updated upstream
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
=======
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
>>>>>>> Stashed changes

// map size
const mapContainerStyle = {
    height: "500px",
    width: "1000px",
};

// default center
const center = {
    lat: 40.712776,
    lng: -74.005974
};

const mapOptions = {
    zoom: 12,
    center: center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
};

function GoogleMaps() {
    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(center);
    const [destinationPosition, setDestinationPosition] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);
    const [lodgingMarkers, setLodgingMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placeDetails, setPlaceDetails] = useState([]);

    const fetchPlaceDetails = (markers) => {
        const service = new window.google.maps.places.PlacesService(map);
        const detailRequests = markers.map(marker =>
            new Promise((resolve, reject) => {
                service.getDetails({ placeId: marker.placeId }, (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        resolve({
                            ...marker,
                            details: place
                        });
                    } else {
                        reject(new Error('Place details request failed: ' + status));
                    }
                });
            })
        );
        Promise.all(detailRequests)
            .then(results => {
                setPlaceDetails(results);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onPlaceChanged = (autocomplete) => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const location = place.geometry.location;
            setDestinationPosition({
                lat: location.lat(),
                lng: location.lng(),
            });
            map.panTo(location);
            searchLodging(location);
        } else {
            console.log('No details available for input: ' + place.name);
        }
    };

    const searchLodging = (location) => {
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
            location: location,
            radius: '2500', // search in meters from center
            type: ['lodging']
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const markers = results.map((place) => ({
                    position: place.geometry.location,
                    name: place.name,
                    placeId: place.place_id
                }));
                setLodgingMarkers(markers);
                fetchPlaceDetails(markers);
            } else {
                console.error('Places search failed: ', status);
            }
        });
    };

    const handleMarkerClick = (placeId) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlace(place);
            } else {
                console.error('Place details request failed: ', status);
            }
        });
    };

    return (
        <>
            <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    options={mapOptions}
                    onLoad={onLoad}
                >
                    <Marker position={markerPosition} />
                    {destinationPosition && <Marker position={destinationPosition} />}
                    {lodgingMarkers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            onClick={() => handleMarkerClick(marker.placeId)}
                        />
                    ))}
                    {selectedPlace && (
                        <InfoWindow
                            position={{
                                lat: selectedPlace.geometry.location.lat(),
                                lng: selectedPlace.geometry.location.lng(),
                            }}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                <h2>{selectedPlace.name}</h2>
                                <p>{selectedPlace.vicinity}</p>
                                <p>Rating: {selectedPlace.rating}</p>
                                {selectedPlace.photos && (
                                    <img
                                        src={selectedPlace.photos[0].getUrl()}
                                        alt={selectedPlace.name}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                            </div>
                        </InfoWindow>
                    )}
                    <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
                        <Autocomplete
                            onLoad={(autocomplete) => setAutocompleteDestination(autocomplete)}
                            onPlaceChanged={() => onPlaceChanged(autocompleteDestination)}
                        >
                            <input
                                id="origin-autocomplete"
                                type="text"
                                placeholder="Search for places"
                                style={{ width: "300px", padding: "10px" }}
                            />
                        </Autocomplete>
                    </div>
                </GoogleMap>
            </LoadScript>
            <div style={{ marginTop: "20px", padding: "10px" }}>
                <h3>Lodging Options</h3>
                {placeDetails.map((place, index) => (
                    <div key={index}>
                        <h4>{place.details.name}</h4>
                        <p>{place.details.vicinity}</p>
                        <p>Rating: {place.details.rating}</p>
                        <p>{place.formatted_phone_number}</p>
                        {place.details.photos && (
                            <img
                                src={place.details.photos[0].getUrl()}
                                alt={place.details.name}
                                style={{ width: "100px", height: "100px" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

<<<<<<< Updated upstream
export default GoogleMaps;
=======
export default GoogleMaps;
>>>>>>> Stashed changes
