'use client'
import LeftSidebar from '@/components/LeftSidebar'
import SubjectTab from '@/components/Tabs'
import { getDocumentsInSubjectSubCollection, getSubjects } from '@/firebase/firestore'
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    const fetchData = async () => {
      const sub = await getSubjects("CSE", "5");
      const col = await getDocumentsInSubjectSubCollection("CSE", "5", "Operating Systems", "notes")
      // Do something with sub if needed
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='flex flex-row'>
        <LeftSidebar />
        <SubjectTab />
      </div>
    </>
  );
}

export default page