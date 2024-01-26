
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import quirkyPoint from '../../../images/Quirkypoint.svg'

const TopRated = () => {
    const[electronics,setElectronics] = useState([]);

    const minRating = 4; // Minimum rating for filtering

    useEffect(() => {
        fetch('https://corp.quirkybuy.com/api/homepageProducts')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                const firstThreeItems = data.data.slice(0, 5);
                // Filter items based on rating
                const filteredElectronics = firstThreeItems.filter(
                    (item) => item.rating >= minRating
                );
                setElectronics(filteredElectronics);
            });
    }, []);
        


    return (
       <div className='container mx-auto  my-5 mt-8'>
       <div className='flex justify-between mx-10'> 
        <h1 className="text-left text-4xl antialiased font-bold my-4">Top Rated</h1><br/>
         <h1> <Link to='/products'>  <p className='text-right text-2xl px-5'>view more</p></Link></h1>

          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 card-normal mx-10">
        {electronics.map(item => (
            
            <div style={{width:'280px'}} className="card bg-base-100 shadow-xl">
                
                <Link  onClick={()=>alert('coming soon')}>
                            <div className="">
                                <img style={{ width: '180px',margin:'auto' }} src={item.images[0]} alt="" />
                                <span className='ms-2 border rounded-full p-2' style={{position: 'absolute', top: '0', right: '0',backgroundColor:'rgb(251, 189, 10)',color:'white',fontWeight:'700'}}>{item.discountPercentage}%</span>
                            </div>
                        </Link>
                {/* <Link to={`/details/${item.slug}`}>
                            <div className="">
                                <img style={{ width: '180px',margin:'auto' }} src={item.images[0]} alt="" />
                                <span className='ms-2 border rounded-full p-2' style={{position: 'absolute', top: '0', right: '0',backgroundColor:'rgb(251, 189, 10)',color:'white',fontWeight:'700'}}>{item.discountPercentage}%</span>
                            </div>
                        </Link> */}


          <div className="card-body ">
            <Link to='/'><h2 className="card-title">{item.title}</h2></Link>
            <p className='text-left flex'>
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

export default TopRated;