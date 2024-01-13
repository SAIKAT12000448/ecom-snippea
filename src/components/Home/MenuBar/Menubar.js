import React from 'react';

const Menubar = () => {
  return (
    <>
      <div className="my-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }} className="p-4 rounded-lg text-black text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
            <div className='text-center'>
              <i style={{color:'rgb(251, 189, 10)'}} className="fas fa-rocket text-4xl pb-2"></i>
              <h3 className='text-bold text-lg'>Free Delivery</h3>
              <p>From all orders over $99</p>
            </div>
            <div className='text-center'>
              <i style={{color:'rgb(251, 189, 10)'}} className="fab fa-font-awesome text-4xl pb-2"></i>
              <h3 className='text-bold text-lg'>90 Days Return</h3>
              <p>If goods have problems</p>
            </div>
            <div className='text-center'>
              <i style={{color:'rgb(251, 189, 10)'}} className="far fa-credit-card text-4xl pb-2"></i>
              <h3 className='text-bold text-lg'>Secure Payment</h3>
              <p>100% secure payment</p>
            </div>
            <div className='text-center'>
              <i style={{color:'rgb(251, 189, 10)'}} className="fas fa-comments text-4xl pb-2"></i>
              <h3 className='text-bold text-lg'>24/7 Support</h3>
              <p>Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Menubar;
