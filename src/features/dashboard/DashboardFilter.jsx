import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "USER", label: "Patients" },
        { value: "DOCTOR", label: "Doctors" },
        { value: "NURSE", label: "Nurses" },
      ]}
    />
  );
}

export default DashboardFilter;
