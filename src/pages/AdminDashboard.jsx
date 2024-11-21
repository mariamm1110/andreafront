

import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AdminDashboard = () => {
  return (
    <div className='admin-dashboard'>
    <nav className='bg-gray-800 text-white px-6 py-6'>
        <ul className='flex justify-center space-x-10'>
            <li>
                <Link to='/admin/models' className='hover:underline'>
                    Models
                </Link>
            </li>
            <li>
                <Link to='/admin/products' className='hover:underline'>
                    Products
                </Link>
            </li>
           
        </ul>
    </nav>
    <div className='p-6'>
        <Outlet/>
    </div>
</div>

  );
};
