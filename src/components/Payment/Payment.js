import React, { useState } from 'react'
import Navigation from '../Shared/Navigation'
import { Link, Outlet } from 'react-router-dom'

const Payment = () => {
  const [activeButton, setActiveButton] = useState('recharge');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
        <Navigation></Navigation>

        <div className='text-left m-5'>
      <button
        className={`text-xl ${activeButton === 'recharge' ? 'border-b-2 border-blue-500' : ''}`}
      >
        <Link to='/payment/recharge' className='text-xl' onClick={() => handleButtonClick('recharge')}>
          Recharge
        </Link>
      </button>
      <button
        className={`text-xl ms-5 ${activeButton === 'withdraw' ? 'border-b-2 border-blue-500' : ''}`}
      >
        <Link to='/payment/withdraw' className='text-xl' onClick={() => handleButtonClick('withdraw')}>
          Withdraw
        </Link>
      </button>
    </div>

   <div>
          <Outlet/>
        </div>

    </div>
  )
}

export default Payment