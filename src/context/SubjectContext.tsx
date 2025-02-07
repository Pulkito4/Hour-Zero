'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubjectContextType {
  branch: string;
  semester: number;
  subject : string;
  setBranch: (branch: string) => void;
  setSemester: (semester: number) => void;
  setSubject: (subject: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
  const [branch, setBranch] = useState<string>('');
  const [semester, setSemester] = useState<number>(0);
  const [subject, setSubject] = useState<string>('');

  return (
    <SubjectContext.Provider value={{ branch, semester, subject, setBranch, setSemester, setSubject }}>
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