import React from 'react'
import './Sidebar.css'
import add_icon from "../../assets/add_icon.png"
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/Add" className="sidebar-option">
                <img src={add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={add_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/order" className="sidebar-option">
                <img src={add_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar