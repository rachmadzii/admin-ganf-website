import { useContext } from 'react';
import { user } from '../../assets';
import { ProfileContext } from '../../contexts/ProfileContext';

const SideNavbar = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <div className="flex gap-4 items-center justify-end py-6">
      <img src={user} alt="logo" className="w-10 h-10" />
      <p className="font-medium">{profile.role || 'Admin'}</p>
    </div>
  );
};

export default SideNavbar;
