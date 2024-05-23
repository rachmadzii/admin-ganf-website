import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from './AuthContext';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!isAuthenticated) return;

        const response = await axiosInstance.get('/auth/profile');
        const data = response.data.data;
        setProfile(data);
      } catch (error) {
        if (error.response.data.status === 401) logout();

        setIsError(true);
        toast.error('Error fetching profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [isAuthenticated, logout]);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, isError }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
