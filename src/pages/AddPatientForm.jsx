/* eslint-disable react/prop-types */
import { useState } from "react";

function AddPatientForm({ onSubmit }) {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    userRelation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(patientData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={patientData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={patientData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={patientData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Relation:</label>
        <input
          type="text"
          name="userRelation"
          value={patientData.userRelation}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default AddPatientForm;
