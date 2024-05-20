import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import AddReservation from "../features/bookings/AddReservation";

function Bookings() {
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
}

export default Bookings;
