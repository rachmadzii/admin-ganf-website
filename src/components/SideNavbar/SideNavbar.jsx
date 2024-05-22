import { Link, useLocation } from 'react-router-dom';
import { logo } from '../../assets';
import {
  logOutIcon,
  homeBlackIcon,
  productBlackIcon,
  promotionBlackIcon,
  settingBlackIcon,
  homeBlueIcon,
  productBlueIcon,
  promotionBlueIcon,
  settingBlueIcon,
} from '../../assets';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const SideNavbar = () => {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  const isActive = (path) => {
    return path === 'dashboard'
      ? pathname === '/'
      : pathname.includes(path)
      ? 'active'
      : '';
  };

  const handleActive = (path) =>
    isActive(path) ? 'text-mid-blue font-bold' : '';

  return (
    <div className="py-8 fixed h-screen max-w-60 flex flex-col gap-6 bg-white border-r">
      <div className="px-14 flex items-center">
        <img src={logo} alt="logo" className="w-44 h-18" />
      </div>

      <nav className="flex flex-col gap-7 px-10 py-4">
        <Link to="/" className={`nav-item ${handleActive('dashboard')}`}>
          <img
            src={isActive('dashboard') ? homeBlueIcon : homeBlackIcon}
            alt="Home Icon"
            className="btn-icon w-5 h-5"
          />
          <p>Dashboard</p>
        </Link>

        <Link to="/product" className={`nav-item ${handleActive('product')}`}>
          <img
            src={isActive('product') ? productBlueIcon : productBlackIcon}
            alt="Product Icon"
            className="btn-icon w-5 h-5"
          />
          <p>Product</p>
        </Link>

        <Link
          to="/promotion"
          className={`nav-item ${handleActive('promotion')}`}
        >
          <img
            src={isActive('promotion') ? promotionBlueIcon : promotionBlackIcon}
            alt="Promotion Icon"
            className="btn-icon w-5 h-5"
          />
          <p>Promotion</p>
        </Link>

        <Link
          to="/settings"
          className={`nav-item ${handleActive('/settings')}`}
        >
          <img
            src={isActive('settings') ? settingBlueIcon : settingBlackIcon}
            alt="Settings Logo"
            className="btn-icon w-5 h-5"
          />
          <p>Settings</p>
        </Link>

        <button className="nav-item" onClick={logout}>
          <img
            src={logOutIcon}
            alt="button power logo"
            className="btn-icon w-5 h-5"
          />
          <p>Logout</p>
        </button>
      </nav>
    </div>
  );
};

export default SideNavbar;
