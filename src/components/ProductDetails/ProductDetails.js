import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import Navigation from '../Shared/Navigation';
import Searchbar from '../Shared/Searchbar';
import banner3 from '../../images/slideshow/banner3.jpg'
import './ProductDetails.css';
import Footer from '../Shared/Footer/Footer';
import { Link } from 'react-router-dom';
import RelatedProducts from './Relatedproducts/RelatedProducts';
import { Reviews } from './Reviews/Reviews';
import Swal from 'sweetalert2'
import quirkyPoint from '../../images/Quirkypoint.svg'
const ProductDetails = () => {
    
    
  const[productDetails,setProductDetails] = useState({});
    // const roundedRating = Math.round(productDetails.ratings);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const details  = productDetails.product && productDetails.product.product_discounted_price;
  const [totalPrice, setTotalPrice] = useState(details);
  console.log('product',productDetails);
  console.log(totalPrice);

  console.log(productDetails);
    const { slug } = useParams();
   

    
  const ifToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();


    const handleProceed = (itemId) => {


      let token = localStorage.getItem('token');
      const data = {
          product_id: itemId,
          product_quantity:quantity,
        
        
      };
      console.log('data',data);
    
      fetch('https://corp.glbpowerplant.com/api/buyProduct', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json', 
          'Authorization': `${token}`,         
        },
        body: JSON.stringify(data), 
        
      })
      
        .then((response) => {
          if (response.ok) {
          
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title: "Successfully Bought Product",
              showConfirmButton: false,
              timer: 1500
            });
            
            document.getElementById(`my_modal_5`).close();
          } else {
            Swal.fire({
              // position: "top-end",
              icon: "error",
              title: "Product already Bought",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch((error) => {
          
          console.error('Network error:', error);
        });
    };
    

    

const handleButtonClick = () => {

console.log('first');
      if(productDetails.product?.product_min_buy_quantity-1>=quantity){
        Swal.fire({
          icon: "error",
          text: "you should select minimum quantity",
          
        });
      }
     
      else if (ifToken) {
        document.getElementById('my_modal_5').showModal();
      } else {
        navigate('/login', { state: { from: location } });
      }
    };








    const incrementQuantity = () => {
      setQuantity(quantity + 1);
      updateTotalPrice(quantity + 1);
    };
  
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        updateTotalPrice(quantity - 1);
      }
    };

    const updateTotalPrice = (newQuantity) => {
        const selectedItem = `${productDetails.product.product_discounted_price}`;
        const pricePerUnit = selectedItem;
        setTotalPrice(pricePerUnit * newQuantity);
      
    };

    useEffect(()=>{
        fetch(`https://corp.quirkybuy.com/api/productDetails/${slug}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data.ratings);
            setCurrentImageIndex(0);
            setProductDetails(data.data);
            console.log(data.data);
            // console.log(data.data.product.product_min_buy_quantity);
        })

    },[slug])

    const handleImageClick = (index) => {
      setCurrentImageIndex(index);
    };

    const handleShareClick=()=>{
       const currentUrl = window.location.href;
       console.log(currentUrl);
       const tempInput = document.createElement('input');
        tempInput.value = currentUrl;
        document.body.appendChild(tempInput);

    
        const range = document.createRange();
        range.selectNode(tempInput);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand('copy');

        document.body.removeChild(tempInput);

      
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
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
        title: "URL copied to clipboard"
      });

       
    }

  return (
    <div >
      <Navigation></Navigation>
      <Searchbar></Searchbar>
    <div style={{marginLeft:'20px',marginRight:'20px'}}>

      <div class="grid grid-cols-3 gap-4 mt-20 product-details">
      <div  className='flex image_container'>         
        <div style={{width:'150px',margin:'0 auto'}} className='flex flex-col justify-center content-center'>
        {productDetails.product_images &&
          productDetails.product_images.map((imageUrl, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
              <img
              style={{ width: '100%', height: '100%',maxHeight:'150px',objectFit: 'contain' ,objectPosition: 'center'}}
                src={imageUrl}
                alt={`Product ${index + 1}`}
                className={currentImageIndex === index ? 'selected' : ''}
              />
            </div>
          ))}
        </div>



<div className=''>
          {productDetails.product_images && (
          <div>
            <img
    style={{ width: '100%', height: '100%',objectFit: 'contain' ,objectPosition: 'center'}}

              src={
                currentImageIndex !== null
                  ? productDetails.product_images[currentImageIndex]
                  : productDetails.product_images[0] 
              }
              alt="Selected Product"
            />
          </div>
        )}
          </div>
          </div>    


      
        <div className='text-left mx-10'>

        <div className=''>
        <h1 className="text-left text-4xl font-bold mb-10 flex justify-between items-center">
            {productDetails.product?.product_name}  
            <p className=' border rounded-full text-center text-xl' 
          style={{backgroundColor:'rgb(251, 189, 10)',color:'white',height:'30px',padding: '0 10px',margin: '0',lineHeight: '30px'}}>
            -{productDetails.product?.product_discount_percentage}%
            </p>         
          </h1>
        
        </div>

          <div className='flex'>
          <button className='border p-2 px-8 mb-3'>Sold By</button>
           <p className='text-bold m-2 text-center'>{productDetails.product?.product_brand}</p>
          </div>

       <p className='text-left'>
    Rating:
    {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(productDetails.ratings)) {
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'gold' }} />;
        } else if (index === Math.floor(productDetails?.ratings)) {
            return (
                <span key={index}>
                    <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'gold' }} />
                </span>
            );
        } else {
            return <FontAwesomeIcon icon={faStar} key={index} style={{ color: 'white' }} />;
        }
    })}
</p>


<p className='text-bold'>
{productDetails.product?.product_brand}
</p>

<p>
  Minimum Buy : {productDetails.product?.product_min_buy_quantity}
</p>


<p className='text-2xl my-5 flex' style={{borderBottom:'1px solid black',borderTop:'1px solid black'}}>
<span className='flex ms-4'>  <img style={{width:'15px',marginRight:'5px'}} src={quirkyPoint} alt=''/> {productDetails.product?.product_discounted_price}</span>

              <span style={{textDecoration:'line-through'}} className='ms-5 flex'> 
              <img style={{width:'15px',marginRight:'5px'}} src={quirkyPoint} alt=''/>{productDetails.product?.product_actual_price}
              </span>
</p>

<p> Quantity</p>

<div className="flex items-center mt-3 justify-around">
            
           <div className='border border-black-200'>
            
           <button className="border p-2" onClick={decrementQuantity}>
              -
            </button>
            <span className="mx-2 text-bold">{quantity}</span>
            <button className="border p-2" onClick={incrementQuantity}>
              +
            </button>
           </div>

           {/* <button onClick={()=>document.getElementById('my_modal_5').showModal()} className="btn btn-warning">Buy now</button> */}
           <button onClick={handleButtonClick} className="btn btn-warning">Buy now</button>

           <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">

        <div className='grid grid-cols-2'>
          <div>
          {productDetails.product_images && productDetails.product_images.length > 0 ? (
                
                <img
                style={{ width: '100%', height: '100%',maxWidth:'',objectFit: 'contain' ,objectPosition: 'center'}}
                
                src={productDetails.product_images[currentImageIndex]}
                alt="Selected Product"
              />
                ) : 
                <p>there is no image</p>
                }
          </div>

                <div className='text-left'>
                  
              <h3 className="font-bold text-lg">
              {productDetails.product?.product_name}

              </h3>

              <p className="py-4">quantity : {quantity}</p>
              <p className="">Price : {totalPrice}</p>
                </div>

        </div>

                
                <div className="modal-action">
                  <form method="dialog">
                    
                    <button onClick={()=>handleProceed(`${productDetails.product?.product_id}`)} className="btn mx-5">Proceed</button>
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
          </dialog>

          <button onClick={handleShareClick} className='text-4xl border p-1 rounded-lg'><i class="fa-solid fa-share"></i></button>


           

          </div>
        </div>







        <div>

<div className="card w-96 bg-gray-200 shadow-xl card-list-container">
  <div className="card-body">
    <ul className='text-left text-xl space-y-4'>
      <li><i class="fa-solid fa-truck-fast"></i> Shipping Worldwide</li>
      <li><i class="fa-solid fa-person-walking-arrow-loop-left"></i> Free 7 day return if eligible</li>
      <li><i class="fa-solid fa-wallet"></i> Available cash on delivery</li>
      <li><i class="fa-solid fa-money-bill-wheat"></i> supplier will provide bills</li>
      <li><i class="fa-solid fa-cart-shopping"></i> Minimum buy</li>
    </ul>
    
   
  </div>
</div>


<div className='mt-10 banner1 lg:w-96'>
<img
                className='rounded-lg'
                // width='80%'
                height=''
                src={banner3}
                alt=''
               
              />
</div>
        </div>
        </div>
        
{/* Grid end */}



<div className="divider"></div> 

<div className='grid lg:grid-cols-4 gap-4 mt-20'>
  <div style={{height:'500px'}}  className='col-span-2 border p-2 review-border'>
   <div className='text-left'>
   <button><Link to={`/details/${slug}/description`} className='text-2xl text-bold border'>Description</Link></button>
    <button><Link to={`/details/${slug}/reviews`} className='text-2xl text-bold border ms-5'>Review</Link></button>
   </div>
  <div style={{height:'800px'}} className="">
             <Outlet></Outlet>
  </div>
  </div>
  <div className=' col-span-2'>
  <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={banner3} alt="Album"/></figure>
 
</div>
  </div>

</div>

{/* Related products */}
<RelatedProducts></RelatedProducts>







<Footer></Footer>


    </div>
    </div>
  )
}

export default ProductDetails