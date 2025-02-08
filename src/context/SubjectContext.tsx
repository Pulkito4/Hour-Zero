'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SubjectContextType {
  branch: string;
  semester: number;
  subject : string;
  setBranch: (branch: string) => void;
  setSemester: (semester: number) => void;
  setSubject: (subject: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

const sanitizePath = (value: string): string => {
  return value.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
};

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
  // const [branch, setBranch] = useState<string>('');
  // const [semester, setSemester] = useState<number>(0);
  // const [subject, setSubject] = useState<string>('');


  const [branch, setBranchState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('branch') || '';
    }
    return '';
  });

  const setBranch = (value: string) => {
    const sanitizedValue = sanitizePath(value);
    setBranchState(sanitizedValue);
  };

  const [semester, setSemesterState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('semester')) || 0;
    }
    return 0;
  });

  const setSemester = (value: number) => {
    setSemesterState(value);
  };

  const [subject, setSubjectState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedSubject = localStorage.getItem('selectedSubject');
      return storedSubject || '';
    }
    return '';
  });

  const setSubject = (value: string) => {
    const sanitizedValue = sanitizePath(value);
    setSubjectState(sanitizedValue);
    // Immediately store in localStorage when subject changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSubject', sanitizedValue);
    }
  };

  useEffect(() => {
    const storedSubject = localStorage.getItem('selectedSubject');
    if (storedSubject) {
      setSubjectState(storedSubject);
    }
  }, []);

  useEffect(() => {
    if (branch && semester && subject) {
      localStorage.setItem('branch', branch);
      localStorage.setItem('semester', semester.toString());
      localStorage.setItem('selectedSubject', subject);
    }
  }, [branch, semester, subject]);




  return (
    <SubjectContext.Provider value={{ branch, semester, subject, setSubject, setBranch, setSemester }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context;
};