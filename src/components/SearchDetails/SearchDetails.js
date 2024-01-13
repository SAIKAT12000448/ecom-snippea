import React from 'react'
import Navigation from '../Shared/Navigation'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const SearchDetails = () => {
  const { state } = useLocation();
  const searchResults = state && state.searchResults ? state.searchResults : [];
  const ifToken = localStorage.getItem('token');

    console.log('searchresult',searchResults);
  return (
    <div>
        <Navigation></Navigation>

        <div style={{margin:'100px'}}>
                    {searchResults.map(item =>
                        <div className="card lg:card-side bg-yellow-50 shadow-xl mb-10" key={item.id}>
                            <img style={{ width: '200px' }} src={item.images[0]} alt="Product" />
                            <div className="card-body grid grid-cols-2 gap-2">
                                <div className=''>
                                <h2 className="card-title text-xl font-bold">{item.title}</h2>
                                <div className="product-info">
                                    <p className='text-start text-gray-600 flex'>
                                        {/* Price: <img style={{width:'20px'}} src={Logo1} alt="" />{item.price} */}
                                    </p>
                                    <p className='text-start text-green-500'>
                                        Discount: ${item.discountPercentage}
                                    </p>
                                    {/* <p className='text-start text-blue-500'>
                                        Stock: {item.stock} pieces
                                    </p> */}
                                </div>
                                <div className="card-actions mt-2 flex justify-between">
                                    {/* <p className='text-left'>
                                        Rating:
                                        {Array.from({ length: 5 }, (_, index) => {
                                            if (index < Math.floor(item.rating)) {
                                               
                                                return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold' }} />;
                                            } else if (index === Math.floor(item.rating)) {
                                                
                                                return (
                                                    <span key={index}>
                                                        <FontAwesomeIcon  icon={faStarHalfAlt} style={{ color: 'gold' }} />
                                                    </span>
                                                );
                                            } else {
                                                
                                                return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'white' }} />;
                                            }
                                        })}
                                    </p> */}
                                </div>
                                </div>
                            <div>
                            <Link to={ ifToken ? `/details/${item?.slug}` : '/login'}><button className="btn btn-warning">Details</button></Link> 
                            </div>

                            </div>
                        </div>
                    )}

</div>
    </div>
  )
}

export default SearchDetails