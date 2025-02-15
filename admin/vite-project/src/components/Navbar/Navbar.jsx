import React from 'react'
import './Navbar.css'
import logo_img from '../../assets/logo.png'
import profile_img from '../../assets/profile_image.png'
const Navbar = () => {
  return (
    <div className="navbar">
        <img className="logo" src={logo_img} alt="" />
        <img className='profile' src={profile_img} alt="" />
    </div>
  )
}

export default Navbar