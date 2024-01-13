import React, { useEffect, useState } from 'react';
import Navigation from '../../Shared/Navigation';
import avatar from '../../../images/avatar.png'
import axios from 'axios';
import Swal from 'sweetalert2'

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    account_name: '',
    account_email: '',
    account_password: '',
    account_image: '',
    account_gender: '',
    account_dob:''
  });

  const[userData,setuserData] = useState([]);

  
  let token = localStorage.getItem("token");
  
  useEffect(()=>{
    fetch('https://corp.glbpowerplant.com/api/userProfile', {
      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      mode: 'cors',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.data);
      setuserData(data.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  },[])


      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
      
        const url = "https://corp.glbpowerplant.com/api/updateProfile";
      
        try {
          const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
          });
      
          console.log(response);
      
          if (response.status === 200) {
            console.log('Response data:', response.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
          
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    }); 
  }; 

  return (
    <div className=''>
      <Navigation />
      <div style={{borderRadius:'20px'}} className='border-2  m-5 p-3'>
        <form  onSubmit={handleSubmit}>
        <h1 className="text-left my-5 ml-5 text-bold">Edit Profile</h1>
        <div class="grid lg:grid-cols-2 gap-4 ">
  <div className='' style={{margin:'auto'}}>
        <form>
          <div className="mb-4 flex flex-col md:flex-row justify-center justify-between items-center">
            <label htmlFor="firstName" className="text-gray-700 text-bold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="account_name"
              placeholder={userData.account_name}
              value={formData.account_name}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:border-blue-500"
              required
            />
          </div>


          <div className="mb-4 flex flex-col md:flex-row justify-center justify-between items-center">
            <label htmlFor="email" className="text-gray-700 text-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="account_email"
              placeholder={userData.account_email}
              value={formData.account_email}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

        
          <div className="mb-4 flex flex-col md:flex-row justify-center justify-between items-center">
            <label htmlFor="password" className="text-gray-700 text-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="account_password"
              value={formData.account_password}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row justify-center justify-between items-center ">
            <label htmlFor="password" className="text-gray-700 text-bold lg:me-3">
             Confirm Password
            </label>
            <input
              type="password"
              id="password"
              // name="account_password"
              // value={formData.account_password}
              // onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

        </form>
  </div>


  <div className='mb-10'>
          <div className="avatar">
          <div className="w-24 rounded-full">
            
            <img src={avatar} />
          </div>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

<p style={{color:'blue'}} className="" onClick={()=>document.getElementById('my_modal_5').showModal()}> <i class="fa-solid fa-pen-to-square"><span className='' style={{fontFamily:'sans-serif'}}></span></i>Change avatar</p>


<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
  <img style={{margin:'auto',borderRadius:'50%'}} src={avatar} />
    <div className="modal-action">
      <form method="dialog">


      <input
              type="file"
              id="profileImage"
              name="account_image"
              value={formData.account_image}
              onChange={handleChange}
              accept="image/*" 
            />


<br/>

      <div className='text-center'>
      <button style={{backgroundColor:'rgb(251, 189, 10)'}} className="btn mt-5 mx-5">cancle</button>
      <button style={{backgroundColor:'rgb(251, 189, 10)'}} className="btn mt-5">Done</button>
      </div>
      </form>
    </div>
  </div>
</dialog>
        

  </div>
         </div>

        
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
          >
            Save
          </button>
          </form>
      </div>
    </div>
  );
};
