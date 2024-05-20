import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import UpdateUserDataForm from './../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from './../features/authentication/UpdatePasswordForm';
import { useUser } from '../features/authentication/useUser';
import AddPatientForm from './AddPatientForm'; // Import the AddPatientForm component

export async function getCurrentUserData(id) {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/User/${id}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    });
    console.log('user data res', response);
    const user = await response.json();
    console.log('user data', user);
    if (!response.ok) {
      console.error('Failed to fetch user dataa:', user.errors[0].message);
      throw new Error('Failed to fetch user data');
    }
    return user;
  } catch (error) {
    console.error('Error fetching staff data:', error);
  }
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const StyledThead = styled.thead`
  background-color: var(--color-grey-50);
`;

const StyledTh = styled.th`
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledTr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledTd = styled.td`
  padding: 1.2rem 2.4rem;
`;

const StyledTbody = styled.tbody`
  margin: 0.4rem 0;
`;

function Account() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getCurrentUserData(user.staffId);
      setUserData(data);
    };

    fetchUserData();
  });

  const handleAddPatient = async (patientData) => {
    const newPatientData = { ...patientData, userId: user.staffId };
    console.log('rayh post data', newPatientData);
    // await axios.post("", newPatientData);
    const response = await fetch('http://localhost:5023/api/v1/Patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatientData),
    });
    const data = await response.json();
    console.log('bayz', data);
    const updatedUserData = await getCurrentUserData(user.staffId);
    setUserData(updatedUserData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Heading as='h1'>
        {user.firstName} {user.lastName} - {user.role}
      </Heading>

      <Row>
        <Heading as='h3'>Update your data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>Update your password</Heading>
        <UpdatePasswordForm />
      </Row>

      <button onClick={() => setIsModalOpen(true)}>Add New Patient</button>

      <StyledTable>
        <StyledThead>
          <StyledTr>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>Age</StyledTh>
            <StyledTh>Relation</StyledTh>
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {userData?.patients.map((patient) => (
            <StyledTr key={patient.patientId}>
              <StyledTd>{patient.firstName}</StyledTd>
              <StyledTd>{patient.lastName}</StyledTd>
              <StyledTd>{patient.age}</StyledTd>
              <StyledTd>{patient.userRelation}</StyledTd>
            </StyledTr>
          ))}
        </StyledTbody>
      </StyledTable>

      {isModalOpen && (
        <Modal>
          <AddPatientForm onSubmit={handleAddPatient} />
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      )}
    </>
  );
}

export default Account;
