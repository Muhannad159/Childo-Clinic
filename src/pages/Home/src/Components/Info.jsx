import React from 'react';
import InformationCard from './InformationCard';
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
  faSyringe,
  faBacteria,
  faBaby,
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Info.css';

function Info() {
  return (
    <div className='info-section' id='services'>
      <div className='info-title-content'>
        <h3 className='info-title'>
          <span>What We Do</span>
        </h3>
        <p className='info-description'>
          At CHILDIO, we prioritize your little one's well-being. Here, you can
          conveniently book appointments and request prescriptions tailored to
          your child's needs. Experienced pediatricians are available to assist
          you in reserving your spot and providing necessary prescriptions
          promptly.
        </p>
      </div>

      <div className='info-cards-content'>
        <InformationCard
          title='Sick-child visits'
          description='Get a swift and expert care for your child. Our clinic offers same-day appointments to quickly diagnose and treat common childhood illnesses, ensuring your child gets back to feeling their best.





          '
          icon={faBacteria}
        />

        <InformationCard
          title='Vaccinations'
          description='Protect your child from 16 serious diseases with our comprehensive vaccination program. We also offer convenient flu clinics during the fall to ensure your child stays healthy through flu season.'
          icon={faSyringe}
        />

        <InformationCard
          title='Newborn and infant care'
          description='Ensure your child is healthy by scheduling a frequently check-up. Our pediatricians provide expert care and guidance to support the growth and development of your child during early days and beyond. '
          icon={faBaby}
        />
      </div>
    </div>
  );
}

export default Info;
