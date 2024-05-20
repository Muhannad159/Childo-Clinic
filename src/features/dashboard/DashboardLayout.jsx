/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
// import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 8.2rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { isLoading, errors, cabins } = useCabins();

  if (isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats cabins={cabins} />
      {/* <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
