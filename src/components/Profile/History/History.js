import React, { useEffect, useState } from 'react'
import Navigation from '../../Shared/Navigation';

export const History = () => {
  const[productHistory,setProductHistory] = useState([]);

       let token = localStorage.getItem('token');
  useEffect(()=>{
 
    fetch('https://corp.glbpowerplant.com/api/myTransactions',{
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.data);
      setProductHistory(data.data);
    })


  },[])


  return (
    <>
    <Navigation></Navigation>
    <h1 className='text-bold text-xl text-left m-5'>History</h1>

<div className='m-5'>
<div className="overflow-x-auto">
  <table className="table">
    
    <thead>
      <tr>


        <th><span className='text-bold text-xl text-black	'>Trading Type</span></th>
        <th><span className='text-bold text-xl text-black	'>Date</span></th>
        <th><span className='text-bold text-xl text-black	'>Price</span></th>
        <th><span className='text-bold text-xl text-black	'>Status</span></th>
      </tr>
    </thead>
    <tbody>
   
    {
          productHistory.map((product) => (
            <tr key={product.transaction_id}>
              <td className='text-xl'>{product?.transaction_type}</td>
              <td className='text-xl'>
              {new Date(product?.created_at).toISOString().split('T')[0]}
              </td>
              <td className='text-xl'>
                {
                  (product.transaction_type==="Buy" || product.transaction_type==="Withdraw") ? 
                  <span className='text-red-600	text-bold'>
                   - {product.transaction_debit_amount }</span>: <span className='text-emerald-600 text-bold'>+{product.transaction_credit_amount}</span>
                }
                </td>
              <td className='text-xl'>{product?.transaction_status}</td>
            </tr>
          ))
          
        }
 
      
     
    </tbody>
  </table>
</div>
</div>


</>
  )
}
