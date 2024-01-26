import React, { useEffect, useState } from 'react'
import Logo1 from '../../images/Logo1.png'
// import SearchDetails from '../SearchDetails/SearchDetails';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Home from '../Home/Banner/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';



export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const[categories,setCategory] = useState([]);
    const[perCategory,setPerCategory] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [selectItem,setSelectItem] = useState('');
    const[coin,setCoin] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
// console.log(coin);

    // console.log(perCategory);
    useEffect(()=>{
      fetch('https://corp.quirkybuy.com/api/categories')
      .then(res=>res.json())
      .then(data=>{
        setCategory(data.data);
       
      })

    },[])

    // balance inquiry

    useEffect(()=>{
      fetch('https://corp.quirkybuy.com/api/balanceInquiry',{
        method:'GET',
        headers: {  
          'Authorization': `${token}`,         
          'Content-Type': 'application/json', 
        },
      })
      .then(res=>res.json())
      .then(data=>{
        setCoin(data.data)
        // console.log(data?.data?.account_balance)
      })
    },[])

 

    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);    
      };


      // search handle
    
      const handleSearch = async (e) => {
        e.preventDefault();

  try {
    const response = await fetch('https://corp.quirkybuy.com/api/searchProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search_string:searchQuery }),
    });

    if (response.ok) {
      const data = await response.json();
      setSearchResults(data.data);
      navigate(`/search`, { state: { searchResults: data.data } });
    } else {
      console.error('Search failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
      };



  return (
    <div style={{backgroundColor:'white'}} className="navbar1">


<div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={handleDropdownToggle}
            style={{ color: 'black', padding: '10px', border: '2px solid ', borderRadius: '5px' }}
          >
            All Categories <i class="fa-solid fa-caret-down"></i>
          </button>
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                backgroundColor: '#f4f4f4',
                borderRadius:'10px',
                minWidth: '160px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                zIndex: 1,
              }}
            >
              {categories.map((category) => (
                <Link
                  key={category.category_id}
                  to={`/categories/${category.category_id}`}
                  style={{
                    color: 'black',
                    padding: '12px 16px',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {category.category_name} 
                
                </Link>
              ))}
            </div>
          )}
        </div>
     



  
      <div className="search-bar">
    
    <input 
    style={{ color: 'black', border:'1px solid black' ,borderEndEndRadius:'0',borderTopRightRadius:'0'}}
     className="search-input border" 
     type="text"
     placeholder="Search..." 
     value={searchQuery}
    onChange={handleInputChange}
     />
  <span style={{border:'1px solid black',padding:'10px',borderTopRightRadius:'20px',borderBottomRightRadius:'20px',backgroundColor:'rgb(251, 189, 10)'}} onClick={handleSearch}> <i style={{color:'black'}} className="fas fa-search search-icon"></i></span>
</div>


 {
  token &&  
  <div  className='coin_value flex items-center	 justify-center'>
  <img style={{width:'40px',height:'40px'}} src={Logo1} alt="" />
      <span style={{fontWeight:900,backgroundColor:'rgb(251, 189, 10)',color:'black',padding:'20px',borderRadius:'30%'}} id="coin-value">{coin?.account_balance}</span> 
  </div>
 }  

    </div>

  )
}
