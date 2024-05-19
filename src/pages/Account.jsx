import { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "./../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "./../features/authentication/UpdatePasswordForm";
import { useUser } from "../features/authentication/useUser";
import AddPatientForm from "./AddPatientForm"; // Import the AddPatientForm component

export async function getCurrentUserData(id) {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/User/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    console.log("rayh post data", newPatientData);
    // await axios.post("", newPatientData);
    const response = await fetch("http://localhost:5023/api/v1/Patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatientData),
    });
    const data = await response.json();
    console.log("bayz", data);
    const updatedUserData = await getCurrentUserData(user.staffId);
    setUserData(updatedUserData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Heading as="h1">
        {user.firstName} {user.lastName} - {user.role}
      </Heading>

      <Row>
        <Heading as="h3">Update your data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update your password</Heading>
        <UpdatePasswordForm />
      </Row>

      <button onClick={() => setIsModalOpen(true)}>Add New Patient</button>

      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Relation</th>
          </tr>
        </thead>
        <tbody>
          {userData?.patients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.age}</td>
              <td>{patient.userRelation}</td>
            </tr>
          ))}
        </tbody>
      </Table>

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
