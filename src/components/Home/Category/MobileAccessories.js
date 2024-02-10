
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import quirkyPoint from '../../../images/Quirkypoint.svg'

const MobileAccessories = () => {
    const[electronics,setElectronics] = useState([]);
    const[categories,setCategory] = useState([]);

    useEffect(()=>{
        fetch('https://corp.quirkybuy.com/api/filterProducts?category=3')
        .then(res=>res.json())
        .then(data=>{
            const firstThreeItems = data.data.slice(0, 5);
            setElectronics(firstThreeItems)
        })
    },[]);

    useEffect(()=>{
        fetch('https://corp.quirkybuy.com/api/categories')
        .then(res=>res.json())
        .then(data=>{
          setCategory(data.data);
         
        })
  
      },[])
    return (
       <div className='container mx-auto my-5 mt-8'>
        <div className='flex justify-between mx-10'> 
        <h1 className="text-left text-4xl antialiased font-bold my-4">{categories.length > 0 && categories[2].category_name}</h1>
                <h1><Link to='/categories/3'><p className='text-right text-xl px-5'>view more</p></Link></h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 card-normal mx-10">
                {electronics.map(item => (
                    <div className="card bg-base-100 shadow-xl" key={item.id}>
                        <Link to={`/details/${item.slug}`}>
                            <div style={{ height: '130px', position: 'relative', width: '160px',margin:'auto' }} className="image-container">
                                <img
                                    style={{ width: '100%', height: '100%',maxWidth:'',objectFit: 'contain' ,objectPosition: 'center'}}
                                    src={item.images[0]}
                                    alt=""
                                    className='zoom-out-image'
                                />
                              
                            </div>
                            <span
                                    className='ms-2 border rounded-full p-2'
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: 'rgb(251, 189, 10)',
                                        color: 'white',
                                        fontWeight: '700'
                                    }}
                                >
                                    {item.discountPercentage}%
                                </span>
                        </Link>

                        <div className="card-body">
                            <div style={{height:'90px'}}>
                            <Link to={`/details/${item.slug}`}><h2 className="card-title text-left">{item.title}</h2></Link>

                            </div>
            <p className='text-left flex content-center items-center'>
            Price: <span className='flex ms-4'><img style={{width:'15px',marginRight:'5px'}} src={quirkyPoint} alt=''/>  {item.discounted_price}</span>
            </p>
            <p className='text-left'>
    Rating:
    {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(item.rating)) {
            // Display full gold star for full rating
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold' }} />;
        } else if (index === Math.floor(item.rating)) {
            // Display a half gold star for the first half
            return (
                <span key={index}>
                    <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'gold' }} />
                </span>
            );
        } else {
            // Display no star (white star) for the rest
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'white' }} />;
        }
    })}
</p>


          </div>
          </div>
        ))}
        
      </div>
     





       </div>
    );
};

export default MobileAccessories;