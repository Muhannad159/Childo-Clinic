import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import AddReservation from "../features/bookings/AddReservation";

function Bookings() {
  let role = localStorage.getItem("role");
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Reservations</Heading>
      </Row>
      <BookingTable />

      <Row>{role === "USER" && <AddReservation />}</Row>
    </>
  );
}

export default Bookings;
