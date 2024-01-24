import React, { } from 'react';
import { Link } from 'react-router-dom';
import quirky from '../../images/quirky1.png'
import './Searchbar.css'
// import avatar from '../../images/avatar.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navigation = () => {


  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };


  const ifToken = localStorage.getItem('token');
  console.log('token is',ifToken);
  const userName = localStorage.getItem('userData');

    return (
      <div>

        <div style={{backgroundColor:'rgb(251, 189, 10)'}} className="navbar p-4">
  <div className="navbar-start">


   <Link to='/home'><img className='' style={{width:"140px",height:'90px'}} src={quirky} alt="" /></Link>
    

    <div className="dropdown"> 
    
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        
      
        <li>
          <Link>kkkkkk</Link>
          <ul className="p-2">
            <li><Link>Submenu 1</Link></li>
            <li><Link>Submenu 2</Link></li>
          </ul>
        </li>
        <li><Link>Item 3</Link></li>
        <li><Link to='/about'>About</Link></li>
        
      </ul>
    </div>
    <Link className="btn btn-ghost normal-case text-xl text-slate-950"></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to='/about'>About</Link></li>
        <li><Link className='text-bold text-2xl font-normal' style={{color:'0D83BA'}} to='/contact'>Contact us</Link></li>

       
     {
      !ifToken ?<li tabIndex={0}>
      
      <details>
        <summary className='text-bold text-2xl font-normal' style={{color:'0D83BA'}}>Partners</summary>
        <ul style={{zIndex:"1000"}} className="p-2">
          <li><Link>Become a supplier</Link></li>
          <li><Link>Merchant</Link></li>
        </ul>
      </details>
    </li>  
    :
    <li>
      <details>
        <summary className='text-bold text-2xl font-normal' style={{color:'0D83BA'}}>Payment</summary>
        <ul style={{zIndex:"1000"}} className="p-2">
          <li><Link to='/payment'>Recharge</Link></li>
          <li><Link to='/payment'>Withdraw</Link></li>
        </ul>
      </details>
    </li> 
     } 
      
      
    </ul> 
  </div>
  <div   className="navbar-end ">
    {
      ifToken ?

      <div className="dropdown dropdown-end">
     
      <h1 tabIndex={0}  className='text-4xl'><i class="fa-solid fa-user"></i></h1>
      
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-gray-300 rounded-box w-52 mt-4">
        {/* <li className='text-left text-2xl mb-5'>{userName}</li>  */}

        <li style={{marginBottom:'10px'}} className='text-right'><Link to='/edit'>
        <i class="fa-solid fa-pen-to-square"><span className='' style={{fontFamily:'sans-serif'}}>Edit Profile</span></i>
          </Link></li> 


      <hr style={{borderColor:'black',marginBottom:'10px'}} />

      <li><li><Link className='text-bold text-xl font-normal' style={{color:'0D83BA'}} to="/inventory">Inventory</Link></li></li>
      <li> <li><Link className='text-bold text-xl font-normal' style={{color:'0D83BA'}} to="/payment">Payment</Link></li></li>
      {/* <li> <li><Link className='text-bold text-xl font-normal' style={{color:'0D83BA'}} to="/withdraw">Withdraw</Link></li></li> */}
      <li> <li><Link className='text-bold text-xl font-normal' style={{color:'0D83BA'}} to="/history">History</Link></li></li>
      <li><Link onClick={()=>localStorage.removeItem('token')} style={{backgroundColor:'rgb(251, 189, 10)',fontWeight:900}} to='/login' className="btn"><span style={{marginTop:'5px'}}>LogOut</span></Link></li>
    
      </ul>
    </div>
      
      
      :




      <Link style={{backgroundColor:'rgb(251, 189, 10)',fontWeight:900}} to='/login' className="btn">Login</Link>
    }
    
  </div>
</div>



</div>


    );
};

export default Navigation;