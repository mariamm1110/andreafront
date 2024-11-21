

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {

    const [searchItem, setSearchItem] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const term = event.target.value;
        setSearchItem(term);

        if (term.length > 1) {

            try {
                const response = await fetch(`/api/products/search?term=${term}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        if (searchItem.trim()) {
            navigate(`/products/${searchItem}`);
            setSuggestions([]); //cleans suggs when doing the search
            setSearchItem(''); //cleans the search bar
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    

  return (
    <div className='relative w-full'>
        <div className='flex items-center border rounded-lg p-4 shadow-sm bg-white w-full'>
            <input 
                type="text" 
                placeholder='Search products...'
                value={searchItem}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className='flex-grow p-2 outline-none w-full'
            />
            <button
                onClick={handleSearch}
                className='bg-pink-500 text-white px-4 py-2 rounded-lg ml-2'
            >
                Search

            </button>
        </div>

        {/* lista de sugerencias */}
        {suggestions.length > 0 && (
            <ul className='absolute bg-white border rounded-lg shadow-md w-full mt-1 max-h-60 overflow-y-auto z-10'>
                {suggestions.map((product) => (
                    <li
                        key={product.id}
                        className='p-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                            navigate(`/products/${product.id}`);
                            setSuggestions([]);
                            setSearchItem('');
                        }}
                    >
                        {product.title}
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};
