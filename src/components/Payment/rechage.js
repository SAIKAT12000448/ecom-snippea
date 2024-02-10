// Recharge.js

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Recharge.css';

const Recharge = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  let token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch payment methods from the API and update the state
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('https://api.example.com/payment-methods');
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data.paymentMethods);
        } else {
          console.error('Failed to fetch payment methods');
        }
      } catch (error) {
        console.error('Error during payment methods fetch:', error);
      }
    };

    fetchPaymentMethods();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      request_amount: withdrawAmount,
      request_method: selectedPaymentMethod,
      account_number:accountNumber,
      proof_image: selectedImage,
    };

    console.log(requestBody);
    try {
      const response = await fetch('https://corp.quirkybuy.com/api/rechargeWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
      if (response.ok) {
        Swal.fire('Recharge successful');
      } else {
        console.error('Recharge failed');
        Swal.fire({
          icon: 'error',
          text: '"You already have a pending recharge request. Wait for the previous request to be completed."',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        
      })
      console.error('Error during recharge:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'withdrawAmount':
        setWithdrawAmount(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'imagefile':
        setSelectedImage(e.target.files[0]);
        break;
      case 'paymentMethod':
        setSelectedPaymentMethod(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className='m-5'>
      <div className='border-2 border-t-0 p-5 mt-10 flex flex-col justify-center items-center'>
        <div className='mb-4 flex-container'>
          <label htmlFor='paymentMethod' className='inline text-black text-xl font-bold mb-6 md:mb-0 md:mr-4'>
            Payment Method
          </label>
          <div className='dropdown-container'>
            <select
              id='paymentMethod'
              name='paymentMethod'
              value={selectedPaymentMethod}
              onChange={handleChange}
              className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              required
            >
              <option value='' disabled>Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ... rest of the form remains unchanged ... */}

        <div className="mt-6 ms-48">
          <button
            type="submit"
            style={{ backgroundColor: '#018434' }}
            className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </div>

      <div className='instructions-container'>
        <h1 className='text-bold text-left'>Instruction</h1>
        <ul className='text-left'>
          {/* ... instructions remain unchanged ... */}
        </ul> 
      </div>
    </div>
  );
};

export default Recharge;
