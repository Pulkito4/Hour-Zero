import Vision from '@/components/aboutus/Vision'
import React from 'react'

const page = () => {
  return (
    <div className='m-10 '>
        <h1 className="text-white text-4xl font-bold text-center">
						ABOUT <span className="text-primary-100">US</span>
		</h1>
        <hr className='mt-5 w-[70%] mx-auto border-gray-600'/>
        <Vision/>
    </div>
  )
}

export default page