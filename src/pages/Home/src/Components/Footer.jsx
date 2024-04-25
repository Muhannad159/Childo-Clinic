import React from 'react';
import '../Styles/Footer.css';
import SubscribeNewsletter from './SubscribeNewsletter';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-section'>
      <div className='footer-container'>
        <div className='ft-info'>
          <div className='ft-info-p1'>
            <p className='ft-title'>
              CHILDIO <span className='ft-sign'></span>
            </p>
            <p className='ft-description'>
              At CHILDIO, we believe in a family-centered approach, focusing on
              personalized care that meets the unique needs of each child. From
              routine check-ups and vaccinations to specialized treatments, we
              offer a wide range of services designed to keep your child healthy
              and thriving.
            </p>
          </div>

          <SubscribeNewsletter />
        </div>

        <div className='ft-list'>
          <p className='ft-list-title'>Services</p>
          <ul className='ft-list-items'>
            <li>
              <a href='#services'>Newborn care</a>
            </li>
            <li>
              <a href='#services'>Vaccinations</a>
            </li>
            <li>
              <a href='#services'>Frequent Visits </a>
            </li>
            <li>
              <a href='#services'>Emergency Care</a>
            </li>
          </ul>
        </div>

        <div className='ft-list' id='contact'>
          <p className='ft-list-title'>Talk To Us</p>
          <ul className='ft-list-items'>
            <li>
              <a href='mailto:support@childio.com'>support@childio.com</a>
            </li>
            <li>
              <a href='mailto:appointment@childio.com'>
                appointment@childio.com
              </a>
            </li>
            <li>
              <a href='tel:+022 5454 5252'>+20 106 797 0701</a>
            </li>
            <li>
              <a href='tel:+022 2326 6232'>+20 100 742 4945</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='ft-copyright'>
        <p>© 2014-2024 CHILDIO. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
