/* eslint-disable no-unused-vars */

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, errors, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.count) return <Empty resourceName="Members" />;

  const filterValue = searchParams.get("role") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins.data;
  if (filterValue === "ADMIN")
    filteredCabins = cabins.data.filter((cabin) => cabin.role === "ADMIN");
  if (filterValue === "DOCTOR")
    filteredCabins = cabins.data.filter((cabin) => cabin.role === "DOCTOR");
  if (filterValue === "NURSE")
    filteredCabins = cabins.data.filter((cabin) => cabin.role === "NURSE");
  console.log("cabinsssssssss", cabins.data);

  return (
    <Menus>
      <Table columns="2.2fr 2.2fr 1.6fr 1.4fr ">
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Role</div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.staffId} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
