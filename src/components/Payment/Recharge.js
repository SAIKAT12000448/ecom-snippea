import React, { useState } from 'react'
import Navigation from '../Shared/Navigation'
import Swal from 'sweetalert2'

const Recharge = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bikash');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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
  
  const handleChange=(e)=>{

    switch (e.target.name) {
      case 'withdrawAmount':
        
        setWithdrawAmount(e.target.value);
        break;
      case 'paymentMethod':
        
        setPaymentMethod(e.target.value);
        break;
      case 'accountNumber':
        setAccountNumber(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  }
  
  return (
    <div className='m-5'>

    <div style={{borderRadius:'20px'}} className='border-2 border-t-0 p-5 mt-10 tex-center  flex justify-center items-center'>
    <form  onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row justify-center">
            <label htmlFor="withdrawAmount" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4 ">
              Withdraw amount
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

          <div  className="mb-4 flex flex-col md:flex-row justify-center">
            <label htmlFor="paymentMethod" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4">
              Payment method
            </label>
            <select
            style={{borderRadius:'10px',padding:'5px',width:'20rem'}}
            name='paymentMethod'
              className='border responsive-select'
              onChange={handleChange}
              
              
            >
              <option value="bikash">Bikash</option>
              <option value="Bank">Bank</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4 flex flex-col md:flex-row justify-center">
            <label htmlFor="accountNumber" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4 lg:ms-3">
              Account number
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

          <div className="mb-4 flex flex-col md:flex-row justify-center">
            <label htmlFor="confirmPassword" className="inline text-black text-sm text-xl font-bold mb-2 md:mb-0 md:mr-4">
              Confirm password
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

          <div className='flex justify-end gap-4'>
          <div className="mt-6">
            <button
              type="submit"
              style={{ backgroundColor: '#3e6fad' }}
              className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Confirm
            </button>
          </div>

          <div className="mt-6">
            <button
            onClick={()=>document.getElementById('my_modal_5').showModal()}
              style={{ backgroundColor: '#3e6fad' }}
              className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Instruction
            </button>
          </div>
          </div>

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Instruction</h3>
    <div style={{borderRadius:'20px'}} className='border-2 border-t-0 p-5'>
      <h1 className='text-bold text-left'>Instruction</h1>
      <ul className='text-left' style={{ listStyleType: 'disc', marginLeft: '1.5em', marginTop: '0.5em' }}>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
        <li style={{ marginBottom: '0.5em' }}>dfmdmfk........</li>
      </ul>
      </div>
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

        </form>
    </div>








    </div>
  )
}

export default Recharge