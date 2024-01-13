import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QUIRKY from '../../images/QUIRKY 3.png';
import Swal from 'sweetalert2'
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    account_phone: '',
    account_password: '',
    login_ip_address:"",
    login_latitude:"",
    login_longitude:""
  });
  console.log(formData);
  
  const [countryCodes, setCountryCodes] = useState([]);
  useEffect(()=>{
    fetch('https://corp.glbpowerplant.com/api/countries')
    .then((response) => response.json())
    .then((data) => {
     
      if (data.data.length > 0) {
        setSelectedCountryCode(data.data[0].dial_code);
      }
     setCountryCodes(data.data);
      
    
    })
    .catch((error) => {
      console.error('Error fetching country codes:', error);
    });

  },[])

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };




  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
  
    const completePhoneNumber = `${selectedCountryCode}${formData.account_phone}`;

    try {
      const response = await fetch('https://corp.glbpowerplant.com/api/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          account_phone: completePhoneNumber,
        }),
      });

      if (response.ok) {
        // Successful login
        const responseData = await response.json();
        localStorage.setItem('token',responseData.data.token);
        localStorage.setItem('userData',formData.account_name);
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: responseData.message
        });
        if(location.state?.from){

          navigate(location.state?.from); 
        }
        else{
          navigate('/home');
        }
       console.log(responseData.message)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title:'Invalid credentials. Please try again.'
        });
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Handle any network or request error here
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#FBBD0A' }} className="min-h-screen flex items-center justify-center">
      <div style={{ width: '516px', height: "667px", borderRadius: '20.11px' }} className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', height: '180px' }}>
          <img style={{ width: '200px', height: '200px' }} src={QUIRKY} alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>


        <div className="mb-4">
         
          <div className="flex">
            <select
              name="country_code"
              value={selectedCountryCode}
             
              onChange={handleCountryCodeChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              {countryCodes.map((code) => (
                <option key={code.dial_code} value={code.dial_code}>
                  {code.dial_code}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="account_phone"
              name="account_phone"
              placeholder='Phone Number'
              value={formData.account_phone}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>



          <div className="mb-4">
            <input
              type="password"
              id="account_password"
              name="account_password"
              placeholder='password'
              value={formData.account_password}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required and should be at least 6 characters</p>}
          </div>

          <div className="mt-6">
            <button
             
              type="submit"
              style={{ backgroundColor: '#FBBD0A', marginBottom: '20px' }}
              className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
          <Link to='/signup'> <h1 className='text-gray-800 font-medium'>New User! Please <span className='text-blue-400 text-bold'>sign up</span></h1></Link>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
