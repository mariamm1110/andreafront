

import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductCard = ({product}) => {

    const navigate = useNavigate();

  return (
    <div className='border rounded-lg p-4 shadow-md'>
        {/* Updated code for displaying images */}
        {Array.isArray(product.images) && product.images.length > 0 ? (
            <img
                src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url}
                alt={product.title || product.name}
                className="w-full h-48 object-cover mb-4"
            />
        ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                No Image Available
            </div>
        )}

        {/* Display the product details */}
        <h2 className='text-xl font-semibold'>{product.title}</h2>
        <p className='text-gray-600'>${product.price}</p>

        <button
            onClick={() => navigate(`/products/${product.id}`)} 
            className='mt-4 bg-pink-500 hover:bg-blue-700 text-white px-4 py-2 rounded'>
            View details
        </button>

    </div>
  )
}
