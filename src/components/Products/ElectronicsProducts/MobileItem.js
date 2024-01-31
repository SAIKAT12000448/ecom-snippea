import React, { useEffect, useState } from 'react';
import Navigation from '../../Shared/Navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Shared/Footer/Footer';
// import BannerHome from '../../Home/Banner/BannerHome';
import FilterProducts from '../FilterProducts/FilterProducts';
import Searchbar from '../../Shared/Searchbar';
import { Link, Outlet, useParams } from 'react-router-dom';
import Logo1 from '../../../images/Logo1.png'

const ITEMS_PER_PAGE = 5; // Number of items to display per page

const MobileItem = () => {
    const { categoryId } = useParams();
    
    // const [filteredProducts, setFilteredProducts] = useState([]);
    const [mobileItems, setMobileItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedRating, setSelectedRating] = useState('all'); // Default is 'all' for all ratings
    // const [sortCriteria, setSortCriteria] = useState('rating'); // Default sorting by rating
    const[categories,setCategory] = useState([]);

    const ifToken = localStorage.getItem('token');
 

    useEffect(()=>{
      fetch('https://corp.quirkybuy.com/api/categories')
      .then(res=>res.json())
      .then(data=>{
        // console.log(data);
        setCategory(data.data);
      })

    },[])



    // Filtering
if (selectedRating !== 'all') {
     mobileItems.filter(
      (item) => item.rating >= parseInt(selectedRating)
    );
  }

  


    useEffect(() => {
        fetch(`https://corp.quirkybuy.com/api/filterProducts?category=${categoryId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setMobileItems(data.data);
                
            })
    }, [categoryId]);


  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // const displayedItems = mobileItems.slice(startIndex, endIndex);
    const displayedItems = mobileItems.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <Navigation></Navigation>
            <Searchbar></Searchbar>
           
            <h1 className='text-center my-10 text-bold text-4xl'>{categories.length > 0 && categories[categoryId-1].category_name}</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 flow-col auto-cols-max md:auto-cols-min'>


                <div>

                <div  style={{
                                    backgroundColor: "#f4f4f4",
                                    padding: "10px",
                                    textAlign:'center',
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    borderTop:'none',
                                    
                                  
                                }} >
                    <h1 className='text-bold text-2xl'>All Categories</h1>
                    <ul >                 
                        {
                            categories.map((category) => {
                                return <li
                                className='text-2xl'
                                style={{
                                    backgroundColor: "#f4f4f4",
                                    padding: "10px",
                                    textAlign:'center',
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    borderTop:'none',
                                    borderLeft:'none',
                                    borderRight:'none',
                                    
                                    
                                    
                                  
                                }} 
                                key={category.category_id}>
                                   <Link to={`/categories/${category.category_id}`}>{category.category_name}</Link> 
                                    </li>;
                            })
                        }
</ul>

                </div>






                <FilterProducts setMobileItems={setMobileItems}></FilterProducts>


                </div>




                <div style={{ width: "70%", marginBottom: '10px' }} className='col-start-2 col-span-4'>
                    {/* count */}
                    <div className='border p-5 bg-gray-200 flex justify-between'>
                       <h5 className='text-xl '> {mobileItems.length} items found</h5>
                        <div>
                        {/* <label className="block mt-4">Filter by Rating:</label> */}
  {/* <select
    value={selectedRating}
    onChange={(e) => setSelectedRating(e.target.value)}
    className="border p-2"
  >
    <option value="all">Sort By Ratings</option>
    <option value="5">5 Stars</option>
    <option value="4">4 Stars</option>
    <option value="3">3 Stars</option>
    <option value="2">2 Stars</option>
    <option value="1">1 Stars</option>
    
  </select> */}
                        </div>
                    </div>
                 



                   <div  style={{marginBottom:'20px'}}>
                   </div>


                {
                FilterProducts &&
     
                    <div>
                    {displayedItems.map(item =>
                        <div className="card lg:card-side bg-yellow-50 shadow-xl mb-10" key={item.id}>
                            <img 
                         style={{ width: '200px', height: '200px',objectFit: 'contain' ,objectPosition: 'center'}}

                             src={item.images[0]} 
                             alt="Product" />

                            <div className="card-body grid grid-cols-2 gap-2">
                                <div className=''>
                                <h2 className="card-title text-xl font-bold text-left">{item.title}</h2>
                                <div className="product-info">
                                    <p className='text-start text-gray-600 flex'>
                                        Price: <img style={{width:'20px'}} src={Logo1} alt="" />{item.price}
                                    </p>
                                    <p className='text-start text-green-500 flex'>
                                        Discount: <img style={{width:'20px'}} src={Logo1} alt="" />{item.discountPercentage}
                                    </p>
                                    <p className='text-start text-blue-500'>
                                        Stock: {item.stock} pieces
                                    </p>
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

                                    }






                </div>
                <div></div>
            </div>

            {/* Pagination controls */}
       
            <div className="flex justify-center mt-4 mb-10 flex-wrap">
    {currentPage > 1 && (
        <button className="btn btn-accent mr-2" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
        </button>
    )}

    {Array.from({ length: Math.ceil(mobileItems.length / ITEMS_PER_PAGE) }, (_, index) => (
        <React.Fragment key={index}>
            <button
                className={`btn ${currentPage === index + 1 ? 'btn-warning' : 'btn-white'} mr-2`}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </button>

            {/* Add a line break after the 15th button */}
            {index === 14 && <br />}
        </React.Fragment>
    ))}

    {endIndex < mobileItems.length && (
        <button className="btn btn-accent" onClick={() => handlePageChange(currentPage + 1)}>
            Next
        </button>
    )}
</div>

<Outlet></Outlet>
<Footer></Footer>
        </div>
    );
};

export default MobileItem;
