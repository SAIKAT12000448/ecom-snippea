import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router';

export const Reviews = () => {
  const[reviews,setReviews] = useState([]);
  const { slug } = useParams();
  console.log(slug);

  useEffect(()=>{
      fetch(`https://corp.glbpowerplant.com/api/productDetails/${slug}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data.data?.reviews);
        setReviews(data.data?.reviews)
        
      })
  },[slug])

  return (

    <div className="reviews-container">
      <h2 className='text-bold text-xl'>Product Reviews</h2>
      <div className="review-list">
        {reviews?.map((review) => (
          <div className="review-item" key={review.review_id}>
            <div className="avatar online">
              <div className="w-24 rounded-full">
                {review.account_image && (
                  <img
                    src={review.account_image}
                    alt={`${review.account_name}'s Avatar`}
                    className="avatar-image"
                  />
                )}
              </div>
            </div>
            <div className="review-details">
              <p className="account-name">{review.account_name}</p>
              <p className="review-text">{review.review_text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}
