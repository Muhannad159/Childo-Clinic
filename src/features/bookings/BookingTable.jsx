import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
// import Spinner from "./../../ui/Spinner";
// import BookingRow from "./BookingRow";
import { useUser } from "../../features/authentication/useUser";
// import Pagination from "../../ui/Pagination";
// import CabinRow from "../cabins/CabinRow";

export function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  let decodedToken = JSON.parse(jsonPayload);

  // Modify the specific claim
  decodedToken.name =
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ];

  decodedToken.id =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];

  decodedToken.role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  delete decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];

  return decodedToken;
}

export async function getReservationByPatientId(patientId) {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Slots/patient/${patientId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    // console.log("user data res", response);
    const user = await response.json();
    // console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getAllReservations() {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/Slots`, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });
    // console.log("user data res", response);
    const user = await response.json();
    // console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getReservationByDoctorId(doctorId) {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Slots/doctor/${doctorId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    console.log("doctor data res", response);
    const user = await response.json();
    console.log("doctor data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getCurrentUserData() {
  // // decode token
  const storedToken = localStorage.getItem("token");

  const decodedData = decodeJWT(storedToken);
  // console.log("decoded", decodedData);

  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/User/${decodedData.id}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
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

export async function getCurrentDoctorData(doctorId) {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Staff/${doctorId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    const user = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}
export async function getCurrentPatientData(patientId) {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Patient/${patientId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    const user = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

/////////////////////////////////////////////////////////////////////
let patients;
let allReservations = [];
//////////////////////////////////////////////////////////
let role = localStorage.getItem("role");
console.log("ana meen", role);
if (role === "USER") {
  patients = await getCurrentUserData();
  patients = patients.patients;
  // Iterate through each patient object
  for (const patient of patients) {
    // Call the API function with the patientId
    const response = await getReservationByPatientId(patient.patientId);
    // Push the response data to the responseData array\
    for (const res of response) {
      // Call the API function with the patientId
      // Push the response data to the responseData array
      allReservations.push(res);
    }
  }

  for (let i = 0; i < allReservations.length; i++) {
    let reservation = allReservations[i];
    let currentDoctorId = reservation.doctorId;
    let currentPatientId = reservation.patientId;
    let currentPatientData = await getCurrentPatientData(currentPatientId);
    let currentPatientName =
      currentPatientData.firstName + " " + currentPatientData.lastName;
    console.log("pat name", currentPatientName);
    let currentDoctorData = await getCurrentDoctorData(currentDoctorId);
    let currentDoctorName =
      currentDoctorData.firstName + " " + currentDoctorData.lastName;
    console.log("doc name", currentDoctorName);
    allReservations[i] = {
      ...reservation,
      DoctorName: currentDoctorName,
      PatientName: currentPatientName,
    };
  }
} else if (role === "ADMIN" || role === "SUPERADMIN") {
  allReservations = await getAllReservations();
  for (let i = 0; i < allReservations.length; i++) {
    let reservation = allReservations[i];
    let currentDoctorId = reservation.doctorId;
    let currentPatientId = reservation.patientId;
    let currentPatientData = await getCurrentPatientData(currentPatientId);
    let currentPatientName =
      currentPatientData.firstName + " " + currentPatientData.lastName;
    console.log("pat name", currentPatientName);
    let currentDoctorData = await getCurrentDoctorData(currentDoctorId);
    let currentDoctorName =
      currentDoctorData.firstName + " " + currentDoctorData.lastName;
    console.log("doc name", currentDoctorName);
    allReservations[i] = {
      ...reservation,
      DoctorName: currentDoctorName,
      PatientName: currentPatientName,
    };
  }
} else if (role === "DOCTOR") {
  let id = localStorage.getItem("usrid");
  console.log("fetched id", id);
  allReservations = await getReservationByDoctorId(id);
  for (let i = 0; i < allReservations.length; i++) {
    let reservation = allReservations[i];
    let currentDoctorId = reservation.doctorId;
    let currentPatientId = reservation.patientId;
    let currentPatientData = await getCurrentPatientData(currentPatientId);
    let currentPatientName =
      currentPatientData.firstName + " " + currentPatientData.lastName;
    console.log("pat name", currentPatientName);
    let currentDoctorData = await getCurrentDoctorData(currentDoctorId);
    let currentDoctorName =
      currentDoctorData.firstName + " " + currentDoctorData.lastName;
    console.log("doc name", currentDoctorName);
    allReservations[i] = {
      ...reservation,
      DoctorName: currentDoctorName,
      PatientName: currentPatientName,
    };
  }
}
function BookingTable() {
  const { user } = useUser();
  console.log("user data", user);
  console.log("user patients", patients);
  console.log("all reservations", allReservations);
  if (!allReservations.length) return <Empty resourceName="reservations" />;
  return (
    <>
      <Menus>
        <Table columns="1.4fr 1.4fr 1fr 0.6fr 0.8fr 0.4fr">
          <Table.Header>
            <div>Patient Name</div>
            <div>Doctor Name</div>
            <div>Date</div>
            <div>Slot</div>
            <div>Progress Notes</div>
          </Table.Header>

          <Table.Body
            data={allReservations}
            render={(booking) => (
              <BookingRow key={allReservations.id} booking={booking} />
            )}
          />
        </Table>
      </Menus>
    </>
  );
}

export default BookingTable;
