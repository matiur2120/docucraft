"use client"

import { useEffect } from "react"

const Error = ({error, reset}) => {
    useEffect(()=>{
        //Log the error to the error reporting service
        console.log(error)
    },[error])
  return (
    <div>
        <h2>Something went wrong!</h2>
        <h2>{error?.message}</h2>
        <button onClick={()=>reset()}>
            Try Again
        </button>
    </div>
  )
}

export default Error