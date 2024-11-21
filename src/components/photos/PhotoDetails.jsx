

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const PhotoDetails = () => {

    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const fetchPhoto = async () => {
        const response = await fetch(`/api/photos/${id}`);
        const data = await response.json();
        setPhoto(data);
    };

    const handleBuyNow = async () => {
        try{
            const response = await fetch ('/api/payments/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [photo],
                }),
            });

            const data = await response.json();
            if(data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to initiate payment. Please try again');
            }
        } catch (error) {
            console.error('Error creating checkout session', error);
        }
    }

    useEffect(() => {
        fetchPhoto();
    },[id]);

    if (!photo) return <div>Loading...</div>;

      return (
        <div className='container mx-auto p-6'>
            <img src={photo.url} alt={photo.title} className='w-full h-96 object-cover' />
            <h1 className='text-3xl font-bold mt-4'>{photo.title}</h1>
            <p className='mt-2'>Price: ${photo.price}</p>
            <p>Type: {photo.type}</p>
            <button 
                className='bg-green-500 text-white px-4 py-2 mt-4'
                onClick={handleBuyNow}
            >
                Buy Now
            </button>
        </div>
  );
};
