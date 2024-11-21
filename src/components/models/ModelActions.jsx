


import { info } from 'autoprefixer';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const ModelActions = ({model, onModelUpdate, onModelDelete}) => {


    const [artisticName, setArtisticName] = useState(model.artisticName);
    const [contactEmail, setContactEmail] = useState(model.contactEmail);
    const [information, setInformation] = useState(model.information);

    const navigate = useNavigate();

    const handleUpdate =  async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            alert('You are not authorized');
            return;
        }

        const updateModel = { artisticName, contactEmail, information };

        try {
            const response = await fetch(`/api/models/${model.id}` , {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateModel),
            });

            if (response.ok) {
                alert('Model updated succesfully');
                onModelUpdate();
            } else {
                alert('Error updating model');
            }
        } catch (error) {
            console.error('Error updating model', error);
        }
    };


    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            alert('You are not authorized');
            return;
        }
    

        if (window.confirm('Are you sure you want to delete this model?')) {

            try {
                const response = await fetch(`/api/models/${model.id}` , {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert('Model deleted succesfully');
                    onModelDelete();
                    navigate('/models');
                } else {
                    alert('Error deleting model');
                }
            } catch (error) {
                console.error('Error deleting model', error);
            }
        }
    };

  return (
    <div className='space-y-4'>
        <h2 className='text-2xl font-bold mb-4'>Update Model</h2>
        <div>
            <label className='block'>Artistic Name</label>
            <input 
                type="text"
                value={artisticName} 
                onChange={(e) => setArtisticName(e.target.value)}
                className='border rounded p-2 w-full'
            />
        </div>

        <div>
            <label className='block'>Contact Email</label>
            <input 
                type="email"
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)}
                className='border rounded p-2 w-full'
            />
        </div>

        <div>
            <label className='block'>Information</label>
            <textarea 
                value={information} 
                onChange={(e) => setInformation(e.target.value)}
                className='border rounded p-2 w-full'
            />
        </div>
        <button onClick={handleUpdate} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>
            Update Model
        </button>
        <button onClick={handleDelete} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-green-600'>
            Delete Model
        </button>
    </div>
  );
};
