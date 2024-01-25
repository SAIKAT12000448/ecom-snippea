// import logo from './logo.svg';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Banner/Home';

import Login from './components/Shared/Login';
import Signup from './components/Shared/Signup/Signup';
import MobileItem from './components/Products/ElectronicsProducts/MobileItem';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Reviews } from './components/ProductDetails/Reviews/Reviews';
import { Inventory } from './components/Inventory/Inventory';
// import ProtectedRoutes from './components/Hooks/ProtectedRoutes';
import { History } from './components/Profile/History/History';
import { EditProfile } from './components/Profile/EditProfile/EditProfile';
import SearchDetails from './components/SearchDetails/SearchDetails';
import Payment from './components/Payment/Payment';
import Recharge from './components/Payment/Recharge';
import Withdraw from './components/Payment/Withdraw';
import ContactUsPage from './components/Home/Contact/ContactUsPage';
// import ScrollButton from './components/Shared/ScrollButton/ScrollButton';



function App() {
  return (
    <div className="App">
      <header className="">
      <BrowserRouter>
     <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<MobileItem />} />
    <Route path="/inventory" element={<Inventory />} />
    <Route path="/history" element={<History />} />
    <Route path="/edit" element={<EditProfile/>} />
    <Route path="/search" element={<SearchDetails/>} />
    <Route path="/categories/:categoryId" element={<MobileItem/>}/>
    <Route path="/withdraw" element={<Withdraw/>} />
    <Route path="/payment" element={<Payment/>}>
    <Route index element={<Recharge />} />
          <Route path="recharge"element={<Recharge/>}/>
          <Route path="withdraw"element={<Withdraw/>}/>
      </Route>
    
    {/* You can nest routes like this */}
    <Route path="/details/:slug" element={<ProductDetails />}>
      <Route path="reviews" element={<Reviews />} />
    </Route>
    
    {/* <Route path="/details/:slug" element={<ProtectedRoutes Component={ProductDetails} />} /> */}
      
    <Route path="/contact" element={<ContactUsPage/>}/>

  </Routes>
</BrowserRouter>

      {/* <ScrollButton></ScrollButton> */}
      </header>
    </div>
  );
}

export default App;