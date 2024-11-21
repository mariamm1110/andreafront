

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); //clean previous errors

        try {
            await register({ email, password, fullName });
            navigate('/');
        }catch (error) {
            setError(error.message);
        }
    };

    return (
        


        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-5">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="py-10 px-12 bg-white">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Register</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Full Name */}
                        <div className="relative">
                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        {/* Password */}
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
                            Register
                        </button>
                    </form>
                    <div className="text-center mt-6 text-gray-500">
                        <a href="/forgot-password" className="text-sm hover:underline">Forgot Username / Password?</a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-gray-100 py-4 text-center">
                    <p className="text-gray-600">
                        
                        
                    Already have an account? <Link to="/login" className="text-pink-500 hover:underline ml-2"> Login </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

