import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background from "./../images/travel-background.jpg"
import { FaBed } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function Booking() {
    const [places, setPlaces] = useState([]);
    const [hotels, setHotels] = useState([]);

    //make these variables to pass in
    // checkin_date: '2024-08-02',
    // adults_number: '2',
    // room_number: '1',
    // checkout_date: '2024-08-07',

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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    return (
        <main style={{ backgroundImage: `url(${background})` }} className={`w-screen h-screen overflow-y-auto`}>
            <h1 className='text-white font-extrabold font-mono text-8xl text-center p-8'>Housing Options</h1>
            {hotels.map((hotel, index) => (
                <div key={index} className='text-2xl w-[40%] rounded-2xl shadow-inner bg-white p-8 my-6 mx-auto flex flex-row justify-between items-center'>
                    <div className='flex w-2/3 flex-col gap-y-1 text-left items-start justify-start'>
                        <img src={"https://hospitable.com/wp-content/uploads/2023/11/booking-grid-logo.svg"}
                            alt={"img"}
                            className='h-[75px]' />
                        <h4 className='font-bold text-3xl'><a href={hotel['url']}>{hotel['hotel_name']}</a></h4>
                        <p>{hotel['address']}</p>
                        <p className='flex flex-row items-center gap-x-2'>{hotel['review_score_word'] ? hotel['review_score_word']+" : " : ""}  Score: {hotel['review_score']}<FaStar /></p>
                        <p>Total Reviews: {hotel['review_nr']}</p>
                        <p>Min Price for 6 Nights: {formatter.format(hotel['min_total_price'])}</p>
                        <p className='flex flex-row items-center gap-x-2'>{hotel['accommodation_type_name']}<FaBed /></p>
                    </div>
                    <img
                        src={hotel['max_photo_url']}
                        alt={"img"}
                        className='w-1/3 h-full rounded-2xl'
                    />
                </div>
            ))}
        </main>
    );
}

export default Booking;
