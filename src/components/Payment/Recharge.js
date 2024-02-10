
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Recharge.css';

const Recharge = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [formData, setFormData] = useState(new FormData()); // Declare FormData here

  console.log(paymentMethods);
  let token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch payment methods from the API and update the state
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('https://corp.quirkybuy.com/api/paymentMethods');
        if (response.ok) {
          const data = await response.json();
          // console.log(data.data);
          setPaymentMethods(data.data);
        } else {
          console.error('Failed to fetch payment methods');
        }
      } catch (error) {
        console.error('Error during payment methods fetch:', error);
      }
    };

    fetchPaymentMethods();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('request_amount', withdrawAmount);
    formData.append('request_method', selectedPaymentMethod); // Make sure selectedPaymentMethod is an integer
    formData.append('account_number', accountNumber);
    formData.append('proof_image', selectedImage);
  
    if (!selectedImage) {
      Swal.fire({
        icon: 'error',
        text: 'Please select an image for billing proof.',
      });
      return; // Stop the function execution if the image is not selected
    }
  
    try {
      const response = await fetch('https://corp.quirkybuy.com/api/rechargeWallet', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
        body: formData,
      });
  
      console.log(response);
  
      if (response.ok) {
        Swal.fire('Recharge successful');
      } else {
        console.error('Recharge failed');
        const responseData = await response.json();
        Swal.fire({
          icon: 'error',
          text: responseData.message, // Assuming your API sends an error message in the response
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Error during recharge. Please try again.',
      });
      console.error('Error during recharge:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
    console.log(e.target.files);
    switch (name) {
      case 'withdrawAmount':
        setWithdrawAmount(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
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
 

        <form method="post" action="post" enctype="multipart/form-data" className='flex justify-between form-container' onSubmit={handleSubmit}>
      <div>
          <div className="mb-4 flex flex-col md:flex-row justify-between">
            <label htmlFor="withdrawAmount" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4 lg:ms-3">
              Amount
            </label>
            <input
              type="number"
              id="withdrawAmount"
              name="withdrawAmount"
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className='mb-4 flex flex-col md:flex-row justify-between'>
          <label htmlFor='paymentMethod' className='inline text-black text-xl font-bold mb-2 text-left md:mb-0 md:mr-4 lg:ms-3'>
            Payment Method
          </label>
          <div className='dropdown-container'>
            <select
              id='paymentMethod'
              name='paymentMethod'
              value={selectedPaymentMethod}
              onChange={handleChange}
              className='px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500'
              required
            >
              <option value='' disabled>Select Payment Method</option>
              {paymentMethods.map((pm) => (
                <option key={pm.pm_id} value={pm.pm_id}>
                  {pm.pm_name}
                </option>
              ))}
            </select>
          </div>
        </div>
         

          <div className="mb-4 flex flex-col md:flex-row justify-between">
            <label htmlFor="accountNumber" className="inline text-black text-xl text-left font-bold mb-2 md:mb-0 md:mr-4 lg:ms-3">
              Account No
            </label>
            <input
              type="number"
              id="accountNumber"
              name="accountNumber"
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

       

        <div className="mb-4 flex flex-col md:flex-row justify-between">
      <label htmlFor="imageInput" className="inline text-black text-left text-xl font-bold mb-2 md:mb-0 md:mr-4 lg:ms-3">Billing Proof:</label>
      <input
        type="file"
        id="imageInput"
        accept=".jpg, .jpeg, .png"
        className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500 "

        name="imagefile"
        onChange={handleChange}
      />

    </div>

       </div>

          <div className="mt-6 ms-48">
            <button
              type="submit"
              style={{ backgroundColor: '#018434' }}
              className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>



        </form>
      </div>

      <div className='instructions-container'>
        <h1 className='text-bold text-left'>Instruction</h1>
        <ul className='text-left'>
          <li>Bkash Agent number – 01690214066 (only cash out) Minimum recharge 1000 taka</li>
          <li>Nagad Agent Number- 01610838330 (only cash out) Minimum Recharge 1000 taka</li>
          <li>Bank Account <br />
            –Bank Name- City Bank Ltd. <br />
            -Account Name- Md Mehedi Hasan <br />
            -Account Number – 2303949021001 <br />
            -Branch – Cumilla
</li>
  
        </ul> 
      </div>
    </div>
  );
};

export default Recharge;
