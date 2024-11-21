

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PhotoGallery = () => {

    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();

    const fetchPhotos = async () => {
        const response = await fetch('/api/photos');
        const data = await response.json();
        setPhotos(data);
    };

    const handleBuyNow = async (photo) => {
        try {
            const response = await fetch(`/api/payments/create-checkout-session` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [photo], //send photo data to back
                }),
            });

            const data = await response.json();
            if(data.url) {
                //redirect to checkout
                window.location.href = data.url;
            } else {
                console.error('Failed to initiate payment. Please try again'); // {data.message
            }Error
        } catch (error) {
            console.error('Error creating checkout session', error);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div className='container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"'>
            {photos.map((photo) => (
                <div key={photo.id} className='border rounded-lg shadow-md p-4'>
                    <img src={photo.url} alt={photo.title} className='w-full h-48 object-cover' />
                    <h2 className='text-xl font-bold'>{photo.title}</h2>
                    <p>Price: ${photo.price}</p>
                    <p>Type: {photo.type}</p>
                    <div className='flex gap-2'>
                        <button
                            className='bg-blue-500 text-white px-4 py-2 mt-2'
                            onClick={() => navigate(`/photos/${photo.id}`)}
                        >
                            View Details
                        </button>
                        <button
                            className='bg-green-500 text-white px-4 py-2 mt-2'
                            onClick={() => handleBuyNow(photo)}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    ); 
};
