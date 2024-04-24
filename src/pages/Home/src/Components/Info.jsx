import React from "react";
import InformationCard from "./InformationCard";
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
  faSyringe,
  faBacteria,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          At our child clinic, we prioritize your little one's well-being. Here,
          you can conveniently book appointments and request prescriptions
          tailored to your child's needs. Experienced pediatricians are
          available to assist you in reserving your spot and providing necessary
          prescriptions promptly.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Sick-child visits"
          description="When your child is ill, you want to have them seen by a doctor as soon as possible. Your pediatric clinic should have ample time set aside each day for sick-child appointments."
          icon={faBacteria}
        />

        <InformationCard
          title="Vaccinations"
          description="Children who receive the recommended vaccinations are protected from 16 different diseases by the age of 2. A pediatric clinic should offer the full spectrum of immunizations.
          Flu clinics. When flu season arrives in the fall, it is helpful to have a pediatrician’s office that makes it easy to get children their flu shot."
          icon={faSyringe}
        />

        <InformationCard
          title="Newborn and infant care"
          description=" Pediatricians like to see newborns within 2 to 3 days of them coming home from the hospital. Ongoing visits should take place following the schedule established by the American Academy of Pediatrics (AAP)."
          icon={faBaby}
        />
      </div>
    </div>
  );
}

export default Info;
