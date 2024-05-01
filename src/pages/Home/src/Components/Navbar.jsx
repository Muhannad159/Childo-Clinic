import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };
  const navigate = useNavigate();
  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      navigate('/login');
    }
  };

  return (
    <div className='navbar-section'>
      <h1 className='navbar-title'>
        <Link to='/'>
          CHILDIO <span className='navbar-sign'></span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className='navbar-items'>
        <li>
          <Link to='/' className='navbar-links'>
            Home
          </Link>
        </li>
        <li>
          <a href='#services' className='navbar-links'>
            Services
          </a>
        </li>
        <li>
          <a href='#about' className='navbar-links'>
            About
          </a>
        </li>
        <li>
          <a href='#reviews' className='navbar-links'>
            Reviews
          </a>
        </li>
      </ul>

      <button
        className='navbar-btn'
        type='button'
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? 'open-nav' : ''}`}>
        <div onClick={openNav} className='mobile-navbar-close'>
          <FontAwesomeIcon icon={faXmark} className='hamb-icon' />
        </div>

        <ul className='mobile-navbar-links'>
          <li>
            <Link onClick={openNav} to='/'>
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href='#services'>
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href='#about'>
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href='#reviews'>
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href='#contact'>
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className='mobile-nav'>
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className='hamb-icon'
        />
      </div>
    </div>
  );
}

export default Navbar;
