import React, { useEffect, useState } from 'react';
// import Navigation from '../Shared/Navigation';
// import quirky from '../../images/Logo1.png';
// import { useForm } from 'react-hook-form';
import Logo1 from '../../images/Logo1.png'
import './Withdraw.css';
const Withdraw = () => {

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bikash');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[coin,setCoin] = useState([]);

   

  let token = localStorage.getItem('token');
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
      // console.log(data?.data?.account_balance)
    })
  },[])


  const handleSubmit =async (e) => {
    e.preventDefault();
    const requestBody = {
      request_amount: withdrawAmount,
      request_method: paymentMethod,
      request_identification: accountNumber,
      request_trxn_id: confirmPassword,
    };
   
    try{

      const response =await fetch('https://corp.glbpowerplant.com/api/withdrawWallet',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if(response.ok){
        // console.log('Withdraw successful');
      }
      else{
        console.error('withdraw failed');
      }
    }catch(error){
      console.error('Error during withdraw:',error);

    }
    
  };
 
  const handleChange = (e) => {
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
  };

  return (
    <div className='border-4 m-5 p-10'>
      <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ marginBottom: "20px", textAlign: 'center' }} className='flex items-center justify-center'>
  <h1 className='text-xl font-bold lg:mb-20 flex items-center justify-center'>
    Remaining Balance
    <img style={{ width: '40px', height: '40px', marginLeft: '10px' }} src={Logo1} alt="" />
    <span className='text-4xl text-green-800 ml-2'>{coin?.account_balance}</span>
  </h1>
</div>


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

          <div className="mb-4 flex flex-col md:flex-row justify-center">
            <label htmlFor="paymentMethod" className="inline text-black text-xl font-bold mb-2 md:mb-0 md:mr-4">
              Payment method
            </label>
            <select
              className='border responsive-select'
              onChange={handleChange}
              style={{borderRadius:'10px',padding:'5px',width:'20rem'}}
              name='paymentMethod'
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

          <div className="mt-6">
            <button
              type="submit"
              style={{ backgroundColor: '#3e6fad' }}
              className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
