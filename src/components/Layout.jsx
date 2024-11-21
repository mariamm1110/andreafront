import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';

const fetchProductByTerm = async (term) => {
    try {
        const response = await fetch(`/api/products/${term}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};



export const Layout = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Comprobar si hay un token en locals
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);

    //cerrar sesion
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };
    


  return (
    <div className='min-h-screen bg-white-100'>
        <header className='fixed top-0 left-0 right-0 bg-white shadow-md z-50'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4 space-x-4'>
            <Link to="/" className="text-2xl font-bold whitespace-nowrap">My Shop</Link>
            <div className='flex-grow'>
                <SearchBar/>
            </div>

                {/* botones de autenticacion */}
                <div className='flex items-center space-x-4'>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogOut}
                            className='bg-red-500 text-white px-4 py-2 rounded-lg ml-4'
                        >
                            Log out
                        </button>
                    ):(
                        <Link to='/login' className='bg-green-500 text-white px-4 py-2 rounded-lg'>
                            Log in
                        </Link>
                    )
                }
                </div>
            </div>
        </header>
        <main className='container mx-auto p-6 mt-20'>
            <Outlet/>
        </main>
    </div>
  )
}
