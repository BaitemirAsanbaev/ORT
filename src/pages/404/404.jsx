import React, { useEffect } from 'react'

export default function NotFound() {
  useEffect(()=>{
    if(localStorage.getItem("token")){
      window.location = "/";
    }
    else{
      window.location = "/login";
    }
  },[])
  return (
    <div>404</div>
  )
}
