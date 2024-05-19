/* eslint-disable no-unused-vars */

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, errors, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  console.log('Cabs data', cabins);
  if (isLoading) return <Spinner />;

  if (!cabins.count) return <Empty resourceName='Members' />;

  console.log('cnt', cabins.counts);
  // 1) Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'ADMIN')
    filteredCabins = cabins.filter((cabin) => cabin.role === 'ADMIN');
  if (filterValue === 'DOCTOR')
    filteredCabins = cabins.filter((cabin) => cabin.role > 'DOCTOR');
  if (filterValue === 'NURSE')
    filteredCabins = cabins.filter((cabin) => cabin.role > 'NURSE');

  // 2) SORT
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );
  return (
    <Menus>
      <Table columns='2.2fr 2.2fr 1.6fr 1.4fr '>
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div>Role</div>
        </Table.Header>

        <Table.Body
          data={cabins.data}
          // data={filteredCabins}
          // data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin.data} key={cabin.data.staffId} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
