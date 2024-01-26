import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QUIRKY from '../../../images/QUIRKY 3.png'
import Swal from 'sweetalert2'



const Signup = () => {


  
  const [formData, setFormData] = useState({
    account_name: '',
    account_phone: '',
    account_password: '',
    account_ip_address:"",
    account_latitude:"",
    account_longitude:"" 
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationPopupOpen, setVerificationPopupOpen] = useState(false);
  // const[PasswordsMatchError,setPasswordsMatchError] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  // const[response,setResponse] = useState(false);

 

  useEffect(() => {
    fetch('https://corp.quirkybuy.com/api/countries')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        // console.log(data.data);
        if (data.data.length > 0) {
          setSelectedCountryCode(data.data[0].dial_code);
        }
        setCountryCodes(data.data);
      })
      .catch((error) => {
        console.error('Error fetching country codes:', error);
      });
  }, []);
  



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // console.log(formData);

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };




  const handleVerificationSubmit = async (e) => {
    // console.log(verificationCode(verificationCode));
    // console.log('auth',authTok)
    e.preventDefault();

  try {
   const apiUrl = 'https://corp.quirkybuy.com/api/verifyOtp';
 
   const token = localStorage.getItem('token');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, 
      },
      body: JSON.stringify({otp_code:verificationCode}),
    });
    
    if (response.ok) {
      const responseData = await response.json();
      // console.log('token',responseData.data);
      setRegistrationStatus('Phone number verified');
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
      setVerificationPopupOpen(false);
      if(location.state?.from){

          navigate(location.state?.from); 
        }
        else{
          navigate('/home');
        }
      
    } else {
      
      const errorData = await response.json();
      console.error('c:', errorData);
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
        icon: "error",
        title: 'Verification failed'
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };



console.log(formData);

  const handleSubmit = async (e) => {


    e.preventDefault();

    try {
      const completePhoneNumber = `${selectedCountryCode}${formData.account_phone}`;
      // console.log(completePhoneNumber);

      const response = await fetch('https://corp.quirkybuy.com/api/register', {
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
        if (formData.account_password === formData.confirm_password){
          const responseData = await response.json();
          console.log('token',responseData.data.token);
          
        // console.log('Registration successful:', responseData);
        // setResponse(true);
        
        localStorage.setItem('token',responseData.data.token);
        localStorage.setItem('userData',formData.account_name);
        
        }
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle registration failure, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{backgroundColor:'#FBBD0A'}} className=" min-h-screen flex items-center justify-center">
    <div style={{ width: '516px' ,height:"667px",borderRadius:'20.11px'}} className="bg-gray-100 p-8 rounded-lg shadow-md">
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%',alignItems:'center', height: '180px' }}>
  <img style={{ width: '200px', height: '200px' }} src={QUIRKY} alt="" />
</div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label htmlFor="account_name" className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label> */}
          <input
            type="text"
            id="account_name"
            name="account_name"
            placeholder='Name'
            value={formData.account_name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

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

        <div className='mb-4'>
        <input
              type="text"
              id="promo"
              name="account_phone"
              placeholder='Promo code'
              // value={formData.account_phone}
              // onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            
            />
        </div>

     

     


        <div className="mb-4">
          {/* <label htmlFor="account_password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label> */}
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
          <div className="mb-4 mt-6">
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            placeholder='Confirm Password'
            value={formData.confirm_password}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        </div>

        <div className="mb-4">
            {/* Dropdown for Account Type */}
            <select
              name="account_type"
              // value={formData.account_type}
              // onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              // required
            >
             <option value="Merchant">Merchant</option>
            
            </select>

            </div>

        <div className="mt-6">
          <button
            type="submit"
            style={{backgroundColor:'#FBBD0A'}}
            onClick={() => setVerificationPopupOpen(true)}
            className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* ----- */}

        {/* <div className="mt-6">
            <button
              type="button"
              onClick={() => setVerificationModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Verify Phone Number
            </button>
          </div> */}
          <div className='mt-5'>
            <Link className='text-black' to='/login'>Already signed Up! please <span className='text-blue-400 text-bold	'>Login</span></Link>
          </div>
      </form>

{/* --------------------- */}
{isVerificationPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Verify Phone Number</h2>
            <form onSubmit={handleVerificationSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className='mb-4'>
              
              </div>
              <div className="mb-4">
                <p>{registrationStatus}</p>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Verify
                </button>
              </div>
            </form>
            <button
              onClick={() => setVerificationPopupOpen(false)}
              className="mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


{/* =-------------------------- */}

    </div>
  </div>
  );
};

export default Signup;
