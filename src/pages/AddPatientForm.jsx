/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: var(--color-grey-800);
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--color-grey-900);
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

function AddPatientForm({ onSubmit }) {
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    userRelation: '',
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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name:</Label>
        <Input
          type='text'
          name='firstName'
          value={patientData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name:</Label>
        <Input
          type='text'
          name='lastName'
          value={patientData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Age:</Label>
        <Input
          type='number'
          name='age'
          value={patientData.age}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Gender:</Label>
        <Input
          type='text'
          name='gender'
          value={patientData.gender}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Relation:</Label>
        <Input
          type='text'
          name='userRelation'
          value={patientData.userRelation}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type='submit'>Add Patient</Button>
    </Form>
  );
}

export default AddPatientForm;
