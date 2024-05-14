/* eslint-disable no-unused-vars */

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.count) return <Empty resourceName='Members' />;

  // 1) Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

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
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.staffId} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
