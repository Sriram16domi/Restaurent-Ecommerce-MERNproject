import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/Storecontext.jsx'
import axios from "axios"
const LoginPopup = ({setshowLogin}) => {
    const [currState,setcurrState] =useState("Sign in")
     const {url,setToken}=useContext(StoreContext)
     
    //integrating with backend authentication
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin =async(event)=>{
        event.preventDefault()
        let newurl=url;
        if(currState==="Login"){
            newurl += "/api/user/login"
        }
        else{
            newurl += "/api/user/register"
        }
        const response = await axios.post(newurl,data);
        if(response.data.success){
           setToken(response.data.token);
           //save the token in  the local storage
           localStorage.setItem("token",response.data.token);
           setshowLogin(false)

        }else{
            alert(response.data.message)
        }
    }
    //endof integrating with backend authentication


    
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">

                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>{setshowLogin(false)}} src={assets.cross_icon} alt="" />
                </div>
      
                <div className="login-popup-inputs">
                    {currState==="Login"?"":<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Yout Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="text"placeholder='Password' required />
                </div>
                <button type='submit'>{currState==="Sign in"?"Create a account":"Login"}</button>      

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing,I agree to the terms of use & privacy policy.</p>
                </div>
                {currState==="Login"?<p onClick={()=>{setcurrState("Sign in")}}>Create a new account?<span>Click here</span></p>:<p>Already have a account?<span onClick={()=>{setcurrState("Login")}}>Login here</span></p>}
                                    
            </form>
        </div>
    )
}

export default LoginPopup