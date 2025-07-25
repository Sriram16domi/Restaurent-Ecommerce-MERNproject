import React, { useContext, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'
const Placeorder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async (event) => {
      event.preventDefault();
      let orderItems=[];
      food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);  
        }
      })
      let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
      }
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }
      else{
        alert("Error");
      }
  }

  return (
    
    <form onSubmit={placeOrder} className="place-order">

      <div className="place-order-left">
          <p className='title'>Delivery Information</p>

          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="" placeholder='First Name'/>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email Address'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="" placeholder='City'/>
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          </div>

          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="" placeholder='Zip code'/>
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>

          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

      </div>

      <div className="place-order-right">
          
      <div className="cart-total">
            <h2>Cart Totals</h2>

            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr></hr>
              <div className="cart-total-details">
                <p>delivery Fee</p>
                <p>₹{2}</p>
              </div>
              <hr></hr>
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount()+2}</p>
              </div>
            </div> 

            <button type='submit'>Proceed to payment</button>

          </div>

      </div>

    </form>
  )
}

export default Placeorder