

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../AuthService';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError('invalid credentials');
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-5">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="py-10 px-12 bg-white">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* email */}
                        <div className="relative">
                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        {/* password */}
                        <div className="relative">
                            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-orange-500 transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-6 text-gray-500">
                        <a href="/forgot-password" className="text-sm hover:underline">Forgot Username / Password?</a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-gray-100 py-4 text-center">
                    <p className="text-gray-600">
                        Create Your Account <Link to="/register" className="text-pink-500 hover:underline ml-2"> Register </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}
