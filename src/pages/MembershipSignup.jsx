

import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export const MembershipSignup = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken?.id;

    const checkMembershipStatus = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/membership/${userId}/content`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.ok) {
                setIsSubscribed(true);
            } else {
                setIsSubscribed(false);
            }
        } catch (err) {
            console.error('Error checking membership status', err);
            setIsSubscribed(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async () => {
        
        if(!password) {
            alert('Password is required');
            return;
        }

        try {
            const response = await fetch(`/api/membership/${userId}/subscribe`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });



            if (response.ok) {

                const data = await response.json();

                if(data.token) {
                    localStorage.setItem('token', data.token);
                    alert('You have successfully subscribed to the membership!');
                    setIsSubscribed(true);
                    
                    window.location.reload();
                }

            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error subscribing to membership');
            }
        } catch (err) {
            console.error('Error subscribing to membership', err);
            alert('Error subscribing to membership');
        }
    }

    const handleUnsubsribe = async () => {
        try {
            const response = await fetch(`/api/membership/${userId}/unsubscribe`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if(response.ok) {

                const data= await response.json();

                if(data.token) {
                    localStorage.setItem('token', data.token);
                    alert('You have successfully unsubscribed from the membership');
                    setIsSubscribed(false);

                    window.location.reload();
                }

            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error unsubscribing from membership');
            }
        } catch (err) {
            console.error('Error unsubscribing from membership', err);
            alert('Error unsubscribing from membership');
        }
    };

    useEffect(() => {
      if(userId) {
        checkMembershipStatus();
      }
    }, [userId]);

    if (!userId) {
        return <div>Please log in to subscribe to the membership</div>;
    }

    if(loading) {
        return <div>Loading...</div>;
    }
    
    
  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-4'>Membership</h1>
        { error && <p className='text-red-500'>{error}</p>}
        {isSubscribed ? (
            <div>
                <p className='text-green-500'>You are currently subscribed.</p>
                <button
                    onClick={handleUnsubsribe}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4'
                >
                    Unsubscribe
                </button>
            </div>
        ) : (
            <div>
                <p className='text-gray-700'>You are not subscribed to the membership</p>
                <div className='mt-4'>
                    <label htmlFor="password" className='block mb-2'>
                        Enter Password to Subscribe:
                    </label>
                    <input 
                        type="password" 
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border rounded px-4 py-2 w-full'
                    />
                </div>
                <button
                    onClick={handleSubscribe}
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4'
                >
                    Subscribe
                </button>
            </div>
        )};
    </div>
  );
};
