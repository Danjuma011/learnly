import React from 'react'

const MultipleQuestionHeader = ({goalPoints, currentPoint}: {goalPoints : number, currentPoint : number}) => {
  return (
    <div>
       
      <div className="flex justify-between bg-purple-500 text-[#fefefe] py-5 px-3 rounded-md mb-6">
        <p>Goal: {goalPoints} points</p>
        <p>Current points: {currentPoint}</p>
      </div>
    </div>
  )
}

export default MultipleQuestionHeader;
