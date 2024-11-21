import React, { useState } from 'react';

export const ModelPhotoForm = ({ modelId, onUploadSuccess }) => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoTitle, setPhotoTitle] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photoUrl || !photoTitle) {
            setError('both Photo URL and title are required');
            return;
        }

        const newPhoto = { 
            photoUrl: photoUrl,
            title: photoTitle,
            modelId
        };

        console.log('New Photo Data:', newPhoto);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const response = await fetch(`/api/models/${modelId}/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newPhoto)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error uploading photo');
            }

            alert('Photo uploaded successfully');
            setPhotoUrl('');
            setPhotoTitle('');
            setError(null);
            // onUploadSuccess(); // Refresca las fotos en el perfil del modelo
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div>
                <label>Photo Title:</label>
                <input 
                    type="text" 
                    value={photoTitle} 
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className='border p-2 rounded w-full'
                    required
                />
            </div>
            <div className='mb-4'>
                <label className="block">Photo URL</label>
                <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="border rounded p-2 w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Save Photo
            </button>
        </form>
    );
};
