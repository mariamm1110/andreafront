

import React, { useState } from 'react'

export const ModelForm = ({model, onSave}) => {

    const [artisticName, setArtisticName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [information, setInformation] = useState('');
    const [achievments, setachievments] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!artisticName || !contactEmail) {
            setError('Artistic Name and Email are required');
            return;
        }

        const achievmentsArray = achievments.split(',').map((item) => item.trim());


        const newModel = {
            artisticName,
            contactEmail,
            information,
            achievments: achievmentsArray
        };

        console.log('New Model Data:', newModel);

        try {

            const token =localStorage.getItem('token');
            if(!token) {
                console.error("Token not found");
                return;
            }

            
            const response = await fetch('/api/models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newModel),
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error('Error creating model');
            }

            const data = await response.json();
            console.log('Model created:', data);
            alert('Model created successfully');

            setArtisticName('');
            setContactEmail('');
            setInformation('');
            setachievments('');
            setError(null);
        }catch (error) {
            console.error('Error creating model:', error);
            setError(error.message);
        }
    };
  return (
    <div className='container mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>Create New Model</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block'>Artistic Name</label>
                <input 
                    type="text"
                    value={artisticName} 
                    onChange={(e) => setArtisticName(e.target.value)}
                    className='border rounded p-2 w-full'
                    required
                />
            </div>

            <div>
                <label className='block'>Contact Email</label>
                <input 
                    type="email"
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)}
                    className='border rounded p-2 w-full'
                    required
                />
            </div>

            <div>
                <label className='block'>Information</label>
                <textarea
                    value={information} 
                    onChange={(e) => setInformation(e.target.value)}
                    className='border rounded p-2 w-full'
                    required
                />
            </div>

            <div>
                <label className='block'>achievments (comma separated)</label>
                <input 
                    type="text"
                    value={achievments} 
                    onChange={(e) => setachievments(e.target.value)}
                    className='border rounded p-2 w-full'
                />
            </div>

            <button
                type='submit'
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
                Save
            </button>
            
        </form>

    </div>
  );
};
