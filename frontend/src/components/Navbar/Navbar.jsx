import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
const Navbar = ({ setshowLogin }) => {

    const [menu, setmenu] = useState("home")

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    //when the user is logged out it will go the home page so we use navigation variable
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }




    return (
        <div className='Navbar'>
            <img src={assets.logo} alt="" className="logo" />
            <ul className="navbar-menu">
                <Link to='/'><li onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>Home</li></Link>
                <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='' onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                </div>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                {!token ? <button onClick={() => { setshowLogin(true) }}>Sig-in</button> : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li><img src={assets.bag_icon} alt="" />Orders</li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                    </ul>
                </div>}
                

            </div>

        </div>
    )
}

export default Navbar