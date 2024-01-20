import React, { useEffect, useState } from 'react'
import Logo1 from '../../images/Logo1.png'
// import SearchDetails from '../SearchDetails/SearchDetails';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';



export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const[categories,setCategory] = useState([]);
    const[perCategory,setPerCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    // const [selectItem,setSelectItem] = useState('');
    const[coin,setCoin] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
console.log(coin);

    console.log(perCategory);
    useEffect(()=>{
      fetch('https://corp.glbpowerplant.com/api/categories')
      .then(res=>res.json())
      .then(data=>{
        setCategory(data.data);
      })

    },[])

    // balance inquiry

    useEffect(()=>{
      fetch('https://corp.glbpowerplant.com/api/balanceInquiry',{
        method:'GET',
        headers: {  
          'Authorization': `${token}`,         
          'Content-Type': 'application/json', 
        },
      })
      .then(res=>res.json())
      .then(data=>{
        setCoin(data.data)
        console.log(data?.data?.account_balance)
      })
    },[])

 
    const handleCategoryChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedCategory(selectedValue);
      console.log(selectedValue)
      if (selectedValue !== 'all') {
        navigate(`/categories/${selectedValue}`);
      } else {
        
        navigate('/all-categories');
      }
    };



    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);    
      };


      // search handle
    
      const handleSearch = async (e) => {
        e.preventDefault();

  try {
    const response = await fetch('https://corp.glbpowerplant.com/api/searchProduct', {
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
      // Handle error here
      console.error('Search failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }

      };

    const handleCategory=()=>{
         console.log("clocked");
    }
    

  return (
    <div style={{backgroundColor:'white'}} className="navbar1">
      <div className="categories-dropdown">
      <select
        style={{
          padding: '15px',
          backgroundColor: 'inherit',
          border: '1px solid black',
          color: 'black'
        }}
        className='font-bold'
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option className='' value="all">
          All Categories
        </option>
        {categories.map(category => (
          <option key={category.category_id} value={category.category_id}>
           
              <button onClick={handleCategory}>{category.category_name}</button>
         
          </option>
        ))}
      </select>
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
  <span style={{border:'1px solid black',padding:'10px',borderTopRightRadius:'20px',borderBottomRightRadius:'20px',backgroundColor:'rgb(251, 189, 10)',padding:'11px'}} onClick={handleSearch}> <i style={{color:'black'}} className="fas fa-search search-icon"></i></span>
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
