import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use CRA proxy by default to avoid hardcoding ports
  const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, skillsRes, educationRes] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/skills`),
          axios.get(`${API_BASE_URL}/education`)
        ]);

        const nextProjects = projectsRes.status === 'fulfilled' ? projectsRes.value.data : [];
        const nextSkills = skillsRes.status === 'fulfilled' ? skillsRes.value.data : [];
        const nextEducation = educationRes.status === 'fulfilled' ? educationRes.value.data : [];

        setProjects(nextProjects);
        setSkills(nextSkills);
        setEducation(nextEducation);

        if (
          projectsRes.status === 'rejected' ||
          skillsRes.status === 'rejected' ||
          educationRes.status === 'rejected'
        ) {
          setError('Some portfolio data could not be loaded');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const value = {
    projects,
    skills,
    education,
    loading,
    error,
    setProjects,
    setSkills,
    setEducation,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

