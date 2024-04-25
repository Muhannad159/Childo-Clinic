import React from 'react';
import Doctor from '../Assets/doctor-group.png';
import SolutionStep from './SolutionStep';
import '../Styles/About.css';

function About() {
  return (
    <div className='about-section' id='about'>
      <div className='about-image-content'>
        <img src={Doctor} alt='Doctor Group' className='about-image1' />
      </div>

      <div className='about-text-content'>
        <h3 className='about-title'>
          <span>About Us</span>
        </h3>
        <p className='about-description'>
          Welcome to CHILDIO, your trusted partner in pediatric care. We
          specialize in providing comprehensive healthcare services for
          children, from newborns to teenagers. Our team of experienced
          pediatricians and healthcare professionals is dedicated to ensuring
          the well-being of every child who walks through our doors.
        </p>

        <h4 className='about-text-title'>Your Solutions</h4>

        <SolutionStep
          title='Find Your Pediatrician'
          description='Discover the perfect pediatrician for your child and book easily with CHILDIO. Our expert pediatricians are committed to providing personalized care to meet your unique needs.'
        />

        <SolutionStep
          title='Make an Appointment'
          description='Select a convenient date and time for your visit, and let our caring team ensure a smooth and stress-free experience.'
        />

        <SolutionStep
          title='Get Expert Care'
          description='Our team of skilled pediatricians is here to offer expert advice and customized treatment plans, helping your child achieve and maintain optimal health. At CHILDIO, we are with you every step of the way.'
        />
      </div>
    </div>
  );
}

export default About;
