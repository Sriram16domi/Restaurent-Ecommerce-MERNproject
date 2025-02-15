import { createContext, useState, useEffect } from "react";
import axios from "axios"
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

  const [cartItems, setcartItems] = useState({})
  const url = "http://localhost:4000"
  const [token, setToken] = useState("")
  //food list


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  }

  const removeFromCart = async(itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }

  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((prod) => prod._id === item)
        totalAmount += itemInfo.price * cartItems[item];
      }

    }
    return totalAmount;
  }

  const [food_list, setFoodList] = useState([])

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list")
    setFoodList(response.data.data)
  }

  //when we refresh the webpage the quantity of the food get zero (so the solution login is written below)
  const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setcartItems(response.data.cartData);
  }
  //when we refresh the website it will get loggedout to prevent this
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )

}
export default StoreContextProvider;