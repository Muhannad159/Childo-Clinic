import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import AddCabin from "../features/cabins/AddCabin";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Reservations</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Bookings;
