

import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ModelCard = ({model}) => {
    const navigate = useNavigate();


  return (
    <div className='border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow'>
        {/* mostrar la primera foto si existe */}
        {Array.isArray(model.photos) && model.photos.length > 0 ? (
            <img 
                src={typeof model.photos[0] === 'string' ? model.photos[0] : model.photos[0].url} 
                alt={model.artisticName}
                className='w-full h-48 object-cover rounded-lg mb-4'
            />
        

        
        ):(
            <div className='w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-4'>
                No image available  
            </div>
        )}

        <h2 className='text-xl font-semibold mb-2'>{model.artisticName}</h2>
        <p className='text-gray-600 mb-4'>{model.information?.slice(0,100)}...</p>

        {/* boton para ver perfil completo */}
        <button
            onClick={() => navigate(`/models/${model.id}`)}
            className='bg-pink-500 text-white py-2 px-rounded hover: bg-blue-600 transition-colors'
        >
            View Profile
        </button>
    </div>
  );
};
