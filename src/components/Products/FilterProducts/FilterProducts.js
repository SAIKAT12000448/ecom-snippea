import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterProducts({setMobileItems}) {

  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 

  useEffect(() => {
    // Function to fetch filtered products
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(
          'https://corp.glbpowerplant.com/api/filterProducts',
          {
            params: {
              category_id: 1,
              minPrice: minPrice,
              maxPrice: maxPrice,
            },
          }
        );

        if (response.status === 200) {
          // Set the filtered products in state
          setMobileItems(response.data.data);
        } else {
          console.error('Failed to fetch data from the API.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch filtered products when component mounts or when minPrice or maxPrice changes
    fetchFilteredProducts();
  }, [minPrice, maxPrice]);

  return (
    <div className='p-4'>
      <h1 className='mb-5 text-2xl'>Product Filter</h1>
      <div className="price-inputs flex justify-center">
        <div className="price-input">
          
          <input
            type="number"
            id="minPrice"
            placeholder='min'
            className='border-4 w-32 mx-4 border-yellow-500 text-center'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <p>-</p>
        <div className="price-input">
        
          <input
            type="number"
            id="maxPrice"
            placeholder='max'
            value={maxPrice}
            className='border-4 w-32 mx-4 border-yellow-500 text-center'
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      {/* <div>
        <h2>Filtered Products:</h2>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}


export default FilterProducts;