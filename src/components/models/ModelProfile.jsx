

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ModelPhotoForm } from './ModelPhotoForm';
import { ModelActions } from './ModelActions';

export const ModelProfile = () => {
    const {id} = useParams();
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const fetchModel = async () => {

        const response = await fetch(`/api/models/${id}`);
        const data = await response.json();
        setModel(data);
    };


    useEffect(() => {
      fetchModel();
    }, [id]);

    const handlePhotoUpload = () => {
        fetchModel();
    };

    

    const handleModelDelete = () => {
        Navigate('/models')
    }

    
    
    if(!model) return <div>Model not found</div>;
    
  return (

    <div className='container mx-auto p-6 flex'>

        <div className='w-1/2 pr-6'>
            <h1 className='text-4xl font-bold mb-4'>{model.artisticName}</h1>
            <p className='mb-4'>{model.information}</p>

            {model.photos?.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                    {model.photos.map((photo, index) => (
                        <img 
                            key={index}
                            src={photo.url} 
                            alt={model.artisticName} 
                            className='w-full h-auto rounded shadow'
                        />
                    ))}
                </div>
            ) : (
                <p> No photos available for this model. </p>
            )}

            {/* formulario de fotos */}

                <h2 className='text-2xl font-bold mb-4'>Add photos</h2>
                <ModelPhotoForm modelId={id} onPhotoAdded={handlePhotoUpload}/>     

        </div>

        {/* update and delete actions */}
        <div className='w-1/2 pl-6'>
            <ModelActions model={model} onModelUpdate={fetchModel} onModelDelete={handleModelDelete}/>
        </div>

    </div>
    
        
    
   

  );
};
