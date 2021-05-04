import React, { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [resume, setResume] = useState({});
  const refreshResume = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/resume/${id}`, {
        method: 'GET'
      });

      const initialResume = await res.json();
      setResume(initialResume);
    } catch (err) {
      console.error(err);
    }
  };

  const updateResume = async updatedResume => {
    try {
      const res = await fetch(`/api/resume/`, {
        method: 'PUT',
        body: JSON.stringify(updatedResume),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newResume = await res.json();
      setResume(newResume);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        refreshResume,
        // addResume,
        updateResume
        // deleteResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export { ResumeProvider, ResumeContext };
