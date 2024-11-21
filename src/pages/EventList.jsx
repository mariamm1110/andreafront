


import React, { useEffect, useState } from 'react'

export const EventList = () => {

    const [events, setEvents] = useState([]);
    const [loading, setlLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            

            const sortedEvents = data.sort((a,b) => new Date(a.eventDate) - new Date(b.eventDate));

            setEvents(sortedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setlLoading(false);
        }
    };

    useEffect(() => {
      fetchEvents();
    }, []);

    if(loading) {
        return <div className='text-center mt-10'>Loading...</div>;
    }
    

  return (
        <div className='contianer mx-auto p-6'>
            <h1 className='text-4xl font-bold mb-8 text-center'>Upcoming events</h1>
            {events.length === 0 ? (
                <div className='text-center'>No events found</div>
            ) : (
                <div className='space-y-6'>
                    {events.map((event) => (
                        <div key={event.id} className='border rounded-lg shadow p-6 bg-white hover:shadow-lg transition-shadow'>
                            <h2 className='text-2xl font-bold mb-2'>{event.name}</h2>
                            <p className='text-gray-600 mb-2'>Location: {event.location}</p>
                            <p className='text-gray-500'>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                            {event.photos?.length > 0 &&(
                                <img 
                                    src={event.photos[0]?.url}
                                    alt={event.name}
                                    className='w-full h-48 object-cover mt-4 rounded'
                                />
                            )}
                            <button 
                                onClick={() => window.location.href = `/events/${event.id}`}
                                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
};
