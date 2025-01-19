
import LeftSidebar from '@/components/LeftSidebar'
import SubjectTab from '@/components/Tabs'
import React from 'react'

const page = () => {
  return (
   <>
   <div className='flex flex-row'>
   <LeftSidebar/>
   <SubjectTab/>
   </div>
  
   </>
  )
}

export default page