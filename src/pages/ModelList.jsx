

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ModelCard } from '../components/models/ModelCard';

export const ModelList = () => {

    const [models, setModels] =useState([]);

    const fetchModels = async () => {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data);
    };

    useEffect(() => {
      fetchModels();
    }, []);
    

  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Models Directory</h1>
        <div className='mb-6 text-right'>
            <Link to="/models/create" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors'>
                Add New Model
            </Link>
        </div>

        {/* Listado de modelos */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {models.map((model) => (
                <ModelCard key={model.id} model={model} />
            ))}
        </div>
        
    </div>
  );
};
