import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";

type BackbuttonProps = {
    back: () => void; 
  };
const BackButton = ({back} :BackbuttonProps) => {

  return (
    <div className="bg-purple-300 p-3 my-2 rounded-full w-fit inline-block">
    <IoArrowBackOutline
      className="cursor-pointer"
      onClick={back}
    />
  </div>
  
  )
}

export default BackButton
