import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Placeorder from './pages/placeorder/Placeorder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Cart from './pages/cart/cart'


const App = () => {
  const [showLogin,setshowLogin] = useState(false)
  return (
    <>
      {showLogin?<LoginPopup setshowLogin={setshowLogin}/>:<></>}
      <div className='app'>
        <Navbar setshowLogin={setshowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App