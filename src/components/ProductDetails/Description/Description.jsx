import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Description = () => {
    const[description,setDescription] = useState([]);
  const { slug } = useParams();
  // console.log(slug);

  useEffect(()=>{
      fetch(`https://corp.quirkybuy.com/api/productDetails/${slug}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data.data?.product.product_description);
        setDescription(data.data?.product.product_description)
        
      })
  },[slug])
    return (
        <div className='text-left mt-5 text-xl'>
            <p>{description}</p>
        </div>
    );
};

export default Description;