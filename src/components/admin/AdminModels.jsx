import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AdminModels = () => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const response = await fetch('/api/models');
    const data = await response.json();
    setModels(data);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Models</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => console.log('Navigate to add model page')}
      >
        Add Model
      </button>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Artistic Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td className="border px-4 py-2">{model.id}</td>
              <td className="border px-4 py-2">{model.artisticName}</td>
              <td className="border px-4 py-2">

                <Link to={`/models/${model.id}`}>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => console.log(`Edit model: ${model.id}`)}
                    >
                      Edit
                    </button>
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
