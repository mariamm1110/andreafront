

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EventDetails = () => {

    const {id} =useParams();
    const [event, setEvent] = useState(null);

    const fetchEvent = async () => {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
    };

    useEffect(() => {
      fetchEvent();
    }, [id]);

    if (!event) return <div>Event not found</div>;
    

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{event.name}</h1>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-500">Date: {new Date(event.eventDate).toLocaleDateString()}</p>

      <h2 className='text-2xl font-semibold mt-8'>Participating Models</h2>
      {event.models?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4'>
            {event.models.map((model) => (
                <div key={model.id} className='border rounded-lg p-4 shadow-md'>
                    <h3 className='text-xl font-semibold'>{model.artisticName}</h3>
                    <p>{model.information}</p>
                </div>
            ))}
        </div>
      ) :(
        <p>No models participating in this event.</p>
      )}
      <div className="space-y-4 mt-6">
        {event.photos?.map((photo) => (
          <img key={photo.id} src={photo.url} alt={photo.title} className="w-full h-48 object-cover rounded" />
        ))}
      </div>
    </div>
  )
}
