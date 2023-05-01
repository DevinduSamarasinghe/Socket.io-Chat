import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chats = () => {


  const [chat,setChat] = useState([]);
  
  const fetchChat = async()=>{
    const data = await axios.get(`http://localhost:8070/api/chat/`)
    .then((res)=>{
      console.log(res.data);
    })
  }

  useEffect(()=>{
    fetchChat()
  },[])

  return (
    <div>Chats</div>
  )
}

export default Chats