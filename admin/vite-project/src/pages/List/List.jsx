import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { resolvePath } from 'react-router-dom';


const List = ({url}) => {
  
  const [list,setList]=useState([]);
  const fetchlist = async ()=>{
     const response = await axios.get(`${url}/api/food/list`);

     
     if (response.data.success) {
        setList(response.data.data)
     } else {
        toast.error("Error")
     }
  }  
  
  const removeFood =async(foodId)=>{
      const response =await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchlist();
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error("Error")
      }
  }

  useEffect(()=>{
     fetchlist();
  },[])

  return (
    <div className="list add flex-col">
      <p>All foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p className='cursor' onClick={()=>{removeFood(item._id)}}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List