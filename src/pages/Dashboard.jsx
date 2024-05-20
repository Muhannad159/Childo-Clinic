import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
// import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { useUser } from "../features/authentication/useUser";
import BookingTable from "../features/bookings/BookingTable";
import AddReservation from "../features/bookings/AddReservation";

function Dashboard() {
  const { user } = useUser();
  let userRole = user.role;
  // console.log("role:", userRole);
  // Check if the user is an admin or super admin
  let isUser = userRole === "USER";
  let isDoctor = userRole === "DOCTOR";
  if (isUser || isDoctor) {
    return (
      <>
        <Row type="horizontal">
          <Heading as="h1">All Reservations</Heading>
        </Row>
        <BookingTable />
        <Row>
          <AddReservation />
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row type="horizontal">
          <Heading as="h1">Dashboard</Heading>
          <CabinTableOperations />
        </Row>
        <DashboardLayout />
        <Row type="horizontal">
          <Heading as="h1">All Staff Members</Heading>
        </Row>
        <Row>
          <CabinTable />
          {/* <AddCabin /> */}
        </Row>
      </>
    );
  }
}

export default Dashboard;
