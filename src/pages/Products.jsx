import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { jwtDecode } from "jwt-decode";



const getUserRoleFromToken = () => {

    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const decoded = jwtDecode(token);
        console.log('decoded:', decoded.roles);
        return decoded?.roles || [];

    }catch (error) {
        console.error('Error getting user role from token:', error);
        return [];
    }
};

const fetchProducts = async (isHiddenUser, tag) => {
    try {
        const token = localStorage.getItem('token');
        const endpoint = isHiddenUser ? '/api/products/hidden' : '/api/products';

        const url = tag ? `${endpoint}?tag=${encodeURIComponent(tag)}` : endpoint;

        const headers = token
            ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            : { 'Content-Type': 'application/json' };

        console.log('Headers:', headers);

        
        console.log('Fetching URL:', url); // Agregar un log para verificar la URL

        const response = await fetch(url, {method: 'GET', headers});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const Products = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState('');
    

    const categories = ['eyes', 'face', 'drugs', 'arms', 'lips', 'nails'];

   const roles = getUserRoleFromToken();
    const isHiddenUser = roles.includes('hidden-user');

    const handleCategoryChange = (e) => {
        const tag = e.target.value;
        setSelectedTag(tag);
        console.log('Selected tag:', tag);
    };

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts(isHiddenUser, selectedTag);
            if (data) setProducts(data);
            setLoading(false);
        };

        loadProducts();
    }, [isHiddenUser, selectedTag]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Makeup Products</h1>
            <div className="mb-6 flex justify-center">
                <select 
                    value={selectedTag}
                    onChange={(e) => {
                        const newTag = e.target.value;
                        console.log('New tag:', newTag);
                        setSelectedTag(newTag);
                    }}
                    className="border rounded p-2"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
