import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";

type BackbuttonProps = {
    back: () => void; 
  };
const MatchCorrectlyBackButton = ({back}: BackbuttonProps) => {

  return (
    <div className="border-2 border-purple-200 p-3 my-2 rounded-lg w-fit inline-block">
    <IoArrowBackOutline
      className="cursor-pointer"
      onClick={back}
      
    />
  </div>
  
  )
}

export default MatchCorrectlyBackButton;
