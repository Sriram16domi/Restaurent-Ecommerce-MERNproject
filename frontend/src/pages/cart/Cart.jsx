import React,{useContext} from 'react'
import './cart.css'
import { StoreContext } from '../../context/Storecontext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
       <div className="cart-items">
         <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
         </div>
         <br/>
         <hr />
         {food_list.map((item,index)=>{
              if(cartItems[item._id]>0){
                return(
                  <div className="cart-items-title cart-items-item">
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>₹{item.price*cartItems[item._id]}</p>
                       <p className='cross'onClick={()=>removeFromCart(item._id)}>X</p>
                  </div>
                )
              }
         })}
        </div> 

        <div className="cart-bottom">
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

            <button onClick={()=>navigate('/order')}>Proceed to checkout</button>

          </div>

          <div className="cart-promocode">
              <div>
                <p>If you have a promo code,Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder='promo code' />
                  <button>Submit</button>
                </div>
              </div>
          </div>

        </div>
    </div>
  )
}

export default Cart