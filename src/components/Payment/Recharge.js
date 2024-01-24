import React, { useState } from 'react'
import Navigation from '../Shared/Navigation'
import Swal from 'sweetalert2'

const Recharge = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bikash');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [selectedImage, setSelectedImage] = useState(null);

     const [paymentMethods, setPaymentMethods] = useState({
    bikash: false,
    Nagad: false,
    Bank: false,
  });


  let token = localStorage.getItem('token');

  const handleSubmit= async  (e)=>{
    e.preventDefault();
    const requestBody = {
      request_amount: withdrawAmount,
      request_method: paymentMethod,
      request_identification: accountNumber,
      request_trxn_id: confirmPassword,
    };
   
    try{

    

      const response =await fetch('https://corp.glbpowerplant.com/api/rechargeWallet',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if(response.ok){
        console.log('Recharge successful');
        Swal.fire("Recharge successful");
      }
      else{
        console.error('Recharge failed');
        Swal.fire({
          icon: "error",
          // title: "Oops...",
          text: "Try again!",
          
        });
      }
    }catch(error){
      console.error('Error during recharge:',error);

    }

  }
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setPaymentMethods((prevMethods) => ({
        ...prevMethods,
        [name]: checked,
      }));
      
    } else {
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
        default:
          break;
      }
    }
  };
  
  return (
    <div className='m-5'>




    <div style={{borderRadius:'20px'}} className='border-2 border-t-0 p-5 mt-10  flex justify-center items-center'>
    {/* payment method  */}

    

  <div className='mb-4 flex flex-col md:flex-row justify-between'>
              <label htmlFor='paymentMethods' className='inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4'>
                Payment Methods
              </label>
              <div>
                {Object.keys(paymentMethods).map((method) => (
                  <div key={method} className='flex items-center'>
                    <input
                      type='checkbox'
                      id={`paymentMethod_${method}`}
                      name={method}
                      checked={paymentMethods[method]}
                      onChange={handleChange}
                      className='mr-2'
                    />
                    <label htmlFor={`paymentMethod_${method}`}>{method}</label>
                  </div>
                ))}
              </div>
            </div>





    <form className='flex justify-between' onSubmit={handleSubmit}>
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

         

          <div className="mb-4 flex flex-col md:flex-row justify-between">
            <label htmlFor="accountNumber" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4 lg:ms-3">
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
            <label htmlFor="confirmPassword" className="inline text-black text-sm text-xl font-bold mb-2 md:mb-0 md:mr-4">
              Transaction ID
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

        <div className="mb-4 flex flex-col md:flex-row justify-between">
      <label htmlFor="imageInput" className="inline text-black text-sm text-xl font-bold mb-2 md:mb-0 md:mr-4">Billing Proof:</label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
       className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:border-blue-500"

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



    <div className="">

<div style={{borderRadius:'20px'}} className='border-2 border-t-0 p-5 mt-5'>
  <h1 className='text-bold text-left'>Instruction</h1>
  <ul className='text-left' style={{ listStyleType: 'disc', marginLeft: '1.5em', marginTop: '0.5em' }}>
    <li>dfmdmfk........</li>
    <li>dfmdmfk........</li>
    <li>dfmdmfk........</li>
    <li>dfmdmfk........</li>
    <li>dfmdmfk........</li>
    
  </ul>
  </div>

</div>




    </div>
  )
}

export default Recharge