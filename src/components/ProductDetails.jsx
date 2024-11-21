

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const fecthProduct = async (id) => {
    try {
        
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        console.log(`fetchProduct data:`, data);
        return data;
    }catch (error) {
        console.error(error);
    }
};


export const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadProduct = async () => {
        if(!id) {
            console.log('No product id provided');
            return;
        }
        const data = await fecthProduct(id);
        if (data) setProduct(data);
        setLoading(false);
      };

      loadProduct();
    }, [id]);

    if (loading) {
        return <div className='text-center mt-10'>Loading...</div>
    }

    if (!product) return <div>product not found</div>;
    
  return (
    <div className='max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12'>
        {/* left section image */}
        <div className='lg:w-1/2 flex items-center justify-center'>
            {Array.isArray(product.images) && product.images.length > 0 ? (
                <img
                    src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url}
                    alt={product.title || product.name}
                    className="w-full h-auto object-cover rounded shadow-lg"
                />
            ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded shadow-lg">
                    No Image Available
                </div>
            )}
        </div>

        {/* Right section - details */}
        <div className='lg:w-1/2 w-full flex flex-col justify-between text-left'>
            <div>

                <h1 className='font-yeseva text-5xl font-bold mb-6'>{product.title}</h1>
                <p className='text-3xl text-gray-800 mb-8'>${product.price.toFixed(2)}</p>
                <p className='text-gray-700 mb-8 leading-relaxed text-justify'>{product.description}</p>

                <button className='bg-pink-600 text-white py-4 px-8 rounded hover:bg-purple-700 transition duration-300 mb-8'>
                    Add to cart
                </button>

            </div>
            

            {/* additional info */}
            <div className='border-t border-gray-200 mt-8 pt-6'> 
                <details className='group'>
                    <summary className='font-semibold cursor-pointer text-gray-700 hover:text-gray-900 transition duration-200'>
                        Shipping & Collections
                    </summary>

                    <div className='mt-2 pl-4 pr-2 max-h-40 overflow-y-auto transition-all duration-300 ease-in-out'>
                        <p className='text-gray-600'>
                            Free shipping on orders over $50. Items usually ship within 24 hours.
                        </p>
                    </div>
                </details>

                <details className='group'>
                    <summary className='font-semibold cursor-pointer text-gray-700 hover:text-gray-900 transition duration-200'>
                        Returns & Refunds
                    </summary>
                    <div className='mt-2 pl-4 pr-2 max-h-40 overflow-y-auto transition-all duration-300 ease-in-out'>
                        <p className='text-gray-600'>
                            Returns are accepted within 30 days of purchase. Contact support.
                        </p>
                    </div>
                    
                </details>

            </div>

        </div>
    </div>
  );
};
