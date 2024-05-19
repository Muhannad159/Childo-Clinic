import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="role"
        options={[
          { value: "all", label: "All" },
          { value: "ADMIN", label: "Admins" },
          { value: "DOCTOR", label: "Doctors" },
          { value: "NURSE", label: "Nurses" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
