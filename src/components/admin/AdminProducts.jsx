

import React, { useEffect, useState } from 'react'

export const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectProduct, setSelectProduct] = useState(null); //edit
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        tags: '',
        isLegal: true,
        images: [],
        imageUrl: ''
    });

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            const response = await fetch (`/api/admin/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data =  await response.json();
            console.log('Products:', data);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };
    useEffect(() => {
      fetchProducts();
    }, []);


   

    //field changes
    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    //image
    const handleAddImage = () => {
        if (formData.imageUrl.trim() === '') {
            alert('please enter a valid url');
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, prevData.imageUrl],
            imageUrl: '',
        }));
    }

    //create or update
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const method = selectProduct ? 'PATCH' : 'POST';
        const endpoint = selectProduct
            ? `/api/admin/products/${selectProduct.id}`
            : '/api/admin/products';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map((tag) => tag.trim()),
                }),
            });

            if (response.ok) {
                alert(
                    selectProduct
                        ? 'Product updated successfully'
                        : 'Product created successfully'
                );
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    tags: '',
                    isLegal: true,
                    images: [],
                    imageUrl: '',
                });
                setSelectProduct(null);
                fetchProducts();
            } else {
                const errorData = await response.json();
                alert (errorData.message || 'Error creating product');
            }
        } catch (error) {
            console.error('Error creating product', error);
        }
    };

    //delete

    const handleDelete = async (id) => {
        if(!window.confirm('Are you sure you want to delete this product?'))  return;
           
            try {
                const response = await fetch(`/api/admin/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if(response.ok) {
                    alert('Product deleted successfully');
                    fetchProducts();
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Error deleting product');
                }
            } catch (error) {
                console.error('Error deleting product', error);
            }
    };
    
    const handleEdit = (product) => {
        setSelectProduct(product);
        setFormData({
            name: product.name,
            images: product.images,
            description: product.description,
            price: product.price,
            tags: product.tags.join(','),
            isLegal: product.isLegal,
            imageUrl: '',
        });
    };

    if(loading) return <div>Loading...</div>

    

  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-4'>Admin-Products</h1>

        <div className='mb-6'>
            <h2 className='text-lg font-bold mb-2'>
                {selectProduct ? 'Edit Product' : 'Create Product'}
            </h2>
            <form onSubmit={handleFormSubmit} className='space-y-4'>
                <div>
                    <label className='block'>Name</label>
                    <input 
                        type="text" 
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block'>Name</label>
                    <input 
                        type="text" 
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block'>Description</label>
                    <textarea 
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block'>Price</label>
                    <input
                        type='number' 
                        name='price'
                        value={formData.price}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block'>Tags (comma separated)</label>
                    <input
                        type='text' 
                        name='tags'
                        value={formData.tags}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block'>Add Image URL</label>
                    <input
                        type='text' 
                        name='imageUrl'
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className='border rounded p-2 w-full'
                        
                    />
                    <button
                        type='button'
                        onClick={handleAddImage}
                        className='bg-blue-500 text-white px-4 py-2 rounded mt-2'
                    >
                        Add Image
                    </button>
                </div>
                <div>
                <label className="block">Images</label>
            <ul className="list-disc pl-5">
              {formData.images.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
                </div>
                <div>
                    <label className='block'>
                        <input 
                            type="checkbox"
                            name="isLegal"
                            checked={formData.isLegal}
                            onChange={handleInputChange}
                        />
                        Is Legal?
                    </label>
                </div>
                <button
                    type='submit'
                    className='bg-green-500 text-white px-4 py-2 rounded'
                >
                    {selectProduct ? 'Update' : 'Create'}
                </button>
                {selectProduct && (
                    <button
                        type='button'
                        onClick={() => setSelectProduct(null)}
                        className='bg-gray-500 text-white px-4 py-2 rounded ml-2'
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
                <div
                    key={product.id}
                    className='border rounded-lg shadow-md p-4 bg-white'
                >
                    <h2 className='text-lg font-bold'>{product.name}</h2>
                    <img src={product.images} alt="" />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Tags: {product.tags.join(', ')}</p>
                    <p>Legal: {product.isLegal ? 'Yes' : 'No'}</p>
                    <div className='flex-space-x-2 mt-2'>
                        <button
                            onClick={() => handleEdit(product)}
                            className='bg-blue-500 text-white px-4 py-2 rounded'    
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className='bg-red-500 text-white px-4 py-2 rounded'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
