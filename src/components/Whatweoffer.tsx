import React from 'react'
import Cards from './Card'

const WhatWeOffer = () => {
  return (
   <>
    <div className="w-full bg-black p-6 rounded-lg 
      shadow-[0_0_20px_rgba(139,92,246,0.5)] 
      transition-shadow duration-300 
      hover:shadow-[0_0_40px_rgba(139,92,246,1)]
      lg:-ml-8">
      <h2 className="text-white text-xl md:text-2xl mb-6 text-center font-work-sans font-semibold">
        WHAT WE OFFER
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
