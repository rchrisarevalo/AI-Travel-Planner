import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
    const [places, setPlaces] = useState(['1', '2', '3']);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
                params: {
                    name: 'Boston',
                    locale: 'en-us'
                },
                headers: {
                    'x-rapidapi-key': '0126caf942mshfcaa12cfb05f98bp110564jsn789f0886cce7',
                    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                console.log(response.data[0]);
                setPlaces(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlaces();
    }, []);

    useEffect(() => {
        if (places && places['dest_id']) {
            const fetchHotels = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
                    params: {
                        checkout_date: '2024-08-07',
                        order_by: 'popularity',
                        filter_by_currency: 'USD',
                        include_adjacency: 'true',
                        room_number: '1',
                        dest_id: places['dest_id'],
                        dest_type: 'city',
                        adults_number: '2',
                        page_number: '0',
                        checkin_date: '2024-08-02',
                        locale: 'en-us',
                        units: 'metric'
                    },
                    headers: {
                        'x-rapidapi-key': '0126caf942mshfcaa12cfb05f98bp110564jsn789f0886cce7',
                        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
                    }
                };
                try {
                    const response = await axios.request(options);
                    console.log("Hotels")
                    console.log(response.data);
                    setHotels(response.data['result'])
                } catch (error) {
                    console.error(error);
                }
            };
            fetchHotels();
        }
    }, [places]);

    return (
        <>
            {hotels.map((hotel, index) => (
                <div key={index}>
                    <h4><a href={hotel['url']}>{hotel['hotel_name']}</a></h4>
                    <p>{hotel['address']}</p>
                    <p>{hotel['review_score_word']} : Score: {hotel['review_score']}</p>
                    <p>Total Reviews: {hotel['review_nr']}</p>
                    <p>Min Price for 6 Nights: {hotel['min_total_price']}</p>
                    <p>{hotel['accommodation_type_name']}</p>
                    <img
                        src={hotel['main_photo_url']}
                        alt={"img"}
                        style={{ width: "100px", height: "100px" }}
                    />
                    <hr></hr>
                </div>
            ))}
        </>
    );
}
// {placeDetails.map((place, index) => (
//     <div key={index}>
//         <h4>{place.details.name}</h4>
//         <p>{place.details.vicinity}</p>
//         <p>Rating: {place.details.rating}</p>
//         <p>{place.formatted_phone_number}</p>
//         {place.details.photos && (
//             <img
//                 src={place.details.photos[0].getUrl()}
//                 alt={place.details.name}
//                 style={{ width: "100px", height: "100px" }}
//             />
//         )}
//     </div>
// ))}
export default Booking;
