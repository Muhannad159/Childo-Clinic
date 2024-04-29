import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      options={[
        { value: 'Patients', label: 'Doctors' },
        { value: 'Doctors', label: 'Doctors' },
        { value: 'Nurses', label: 'Nurses' },
      ]}
    />
  );
}

export default DashboardFilter;
