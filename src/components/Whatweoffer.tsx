import React from 'react'
import Cards from './Card'

const WhatWeOffer = () => {
  return (
    <>
    <div className="w-full bg-black p-4 sm:p-6 rounded-lg 
        shadow-[0_0_20px_rgba(139,92,246,0.5)] 
        transition-shadow duration-300 
        hover:shadow-[0_0_40px_rgba(139,92,246,1)]
        lg:-ml-8">
        <div className="grid grid-cols-2 min-[700px]:grid-cols-3 gap-2 sm:gap-3 md:gap-4  sm:w-auto
          max-w-[180px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-full mx-auto">
          <Cards name={"Notes"} />
          <Cards name={"Assignments"} />
          <Cards name={"Lab Files"} />
          <Cards name={"PYQs"} />
          <Cards name={"TextBooks"} />
          <Cards name={"Videos"} />
        </div>
      </div>
  </>
  )
}

export default WhatWeOffer
